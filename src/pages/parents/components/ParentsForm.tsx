import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Card,
  Button,
  Typography,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";
import { childAPI } from "../../../api/childService";
import { useParentsApi } from "../api/ParentsApi";
import { CreateParentsDTO, ParentsFormProps } from "../../../api/parents.type";
import { PageDTO } from "api/page.type";
import { ChildDTO } from "../../../api/child.type";
import FormInput from "../../../components/FormInput";
import FormSelect from "../../../components/FormSelect";

export default function ParentsForm({ onAddParent }: ParentsFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateParentsDTO>({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthday: "",
      phoneNumber: "",
      addressDTO: {
        street: "",
        houseNumber: "",
        plz: "",
        city: "",
      },
      childrenId: [],
    },
  });

  const { createMutation } = useParentsApi();

  const { data: childrenData } = useQuery<PageDTO<ChildDTO>>({
    queryKey: ["children"],
    queryFn: () => childAPI.getAll(0, 100),
  });

  const childOptions = (childrenData?.content || []).map((c) => ({
    value: c.uuid,
    label: `${c.firstName} ${c.lastName}`,
  }));

  const onSubmit: SubmitHandler<CreateParentsDTO> = (data) => {
    createMutation.mutate(data, {
      onSuccess: (savedParent) => {
        reset();
        if (onAddParent) onAddParent(savedParent);
      },
    });
  };

  return (
    <Box component="section" sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        Eltern anmelden
      </Typography>

      <Card elevation={3}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={3}>
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
                register={register("birthday", { required: "Pflichtfeld" })}
                errorMessage={errors.birthday?.message}
              />

              <Divider>
                <Typography variant="caption" color="text.secondary">
                  ADRESSE
                </Typography>
              </Divider>

              <FormInput
                label="Straße"
                register={register("addressDTO.street", {
                  required: "Pflichtfeld",
                })}
                errorMessage={errors.addressDTO?.street?.message}
              />

              <Stack direction="row" spacing={2}>
                <FormInput
                  label="Hausnummer"
                  register={register("addressDTO.houseNumber", {
                    required: "Pflichtfeld",
                  })}
                  errorMessage={errors.addressDTO?.houseNumber?.message}
                />
                <FormInput
                  label="PLZ"
                  register={register("addressDTO.plz", {
                    required: "Pflichtfeld",
                  })}
                  errorMessage={errors.addressDTO?.plz?.message}
                />
                <FormInput
                  label="Stadt"
                  register={register("addressDTO.city", {
                    required: "Pflichtfeld",
                  })}
                  errorMessage={errors.addressDTO?.city?.message}
                />
              </Stack>

              <FormInput
                label="Telefonnummer"
                register={register("phoneNumber", { required: "Pflichtfeld" })}
                errorMessage={errors.phoneNumber?.message}
              />

              <Controller
                name="childrenId"
                control={control}
                rules={{ required: "Mindestens ein Kind auswählen" }}
                render={({ field }) => (
                  <FormSelect
                    label="Kind auswählen"
                    options={childOptions}
                    multiple
                    value={field.value || []}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={errors.childrenId?.message}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={createMutation.isPending}
                sx={{ mt: 2, height: 45, fontWeight: "bold" }}
              >
                {createMutation.isPending ? "Speichern..." : "Eltern speichern"}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
