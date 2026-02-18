import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Stack, Button, Divider, Typography } from "@mui/material";
import { ParentsDTO, UpdateParentsDTO } from "api/parents.type";
import FormInput from "../../../components/FormInput";

interface ParentsEditFormProps {
  parent: ParentsDTO;
  onSave: (uuid: string, data: UpdateParentsDTO) => Promise<void>;
  onCancel: () => void;
}

export default function ParentsEditForm({
  parent,
  onSave,
  onCancel,
}: ParentsEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateParentsDTO>({
    defaultValues: {
      firstName: parent.firstName,
      lastName: parent.lastName,
      birthday: parent.birthday,
      phoneNumber: parent.phoneNumber,
      addressDTO: {
        street: parent.addressDTO?.street || "",
        houseNumber: parent.addressDTO?.houseNumber || "",
        plz: parent.addressDTO?.plz || "",
        city: parent.addressDTO?.city || "",
      },
    },
  });

  const onSubmit: SubmitHandler<UpdateParentsDTO> = async (data) => {
    await onSave(parent.uuid, data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 1 }}>
      <Stack spacing={2.5}>
        <Stack direction="row" spacing={2}>
          <FormInput
            label="Vorname"
            register={register("firstName", { required: "Pflichtfeld" })}
            errorMessage={errors.firstName?.message}
          />
          <FormInput
            label="Nachname"
            register={register("lastName", { required: "Pflichtfeld" })}
            errorMessage={errors.lastName?.message}
          />
        </Stack>

        <FormInput
          label="Geburtsdatum"
          type="date"
          InputLabelProps={{ shrink: true }}
          register={register("birthday")}
          errorMessage={errors.birthday?.message}
        />

        <Divider>
          <Typography variant="caption" color="text.secondary">
            ADRESSE
          </Typography>
        </Divider>

        <FormInput
          label="Straße"
          register={register("addressDTO.street")}
          errorMessage={errors.addressDTO?.street?.message}
        />

        <Stack direction="row" spacing={2}>
          <FormInput
            label="Hausnr."
            register={register("addressDTO.houseNumber")}
            errorMessage={errors.addressDTO?.houseNumber?.message}
          />
          <FormInput
            label="PLZ"
            register={register("addressDTO.plz")}
            errorMessage={errors.addressDTO?.plz?.message}
          />
          <FormInput
            label="Stadt"
            register={register("addressDTO.city")}
            errorMessage={errors.addressDTO?.city?.message}
          />
        </Stack>

        <FormInput
          label="Telefonnummer"
          register={register("phoneNumber")}
          errorMessage={errors.phoneNumber?.message}
        />

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 2, justifyContent: "flex-end" }}
        >
          <Button
            onClick={onCancel}
            variant="outlined"
            color="inherit"
            disabled={isSubmitting}
          >
            Abbrechen
          </Button>
          <Button type="submit" variant="contained" loading={isSubmitting}>
            {isSubmitting ? "Speichern..." : "Aktualisieren"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
