import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Stack, Button, Divider, Typography } from "@mui/material";
import { ParentsDTO, UpdateParentsDTO } from "api/parents.type";
import FormInput from "../../../components/FormInput";

interface Props {
  parent: ParentsDTO;
  onSave: (uuid: string, data: UpdateParentsDTO) => Promise<void>;
  onCancel: () => void;
}

export default function ParentEditForm({ parent, onSave, onCancel }: Props) {
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
        street: parent.addressDTO?.street,
        houseNumber: parent.addressDTO?.houseNumber,
        plz: parent.addressDTO?.plz,
        city: parent.addressDTO?.city,
      },
      childrenId: parent.childrenId?.map((c) => c.uuid) || [],
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
        <FormInput label="Telefon" register={register("phoneNumber")} />

        <Divider>
          <Typography variant="caption">ADRESSE</Typography>
        </Divider>
        <FormInput label="Straße" register={register("addressDTO.street")} />
        <Stack direction="row" spacing={2}>
          <FormInput label="PLZ" register={register("addressDTO.plz")} />
          <FormInput label="Stadt" register={register("addressDTO.city")} />
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
          <Button onClick={onCancel} variant="outlined">
            Abbrechen
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Speichern..." : "Aktualisieren"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
