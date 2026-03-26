import { useForm } from "react-hook-form";
import { Stack, Button, Divider } from "@mui/material";
import { EducatorDTO, UpdateEducatorDTO } from "api/educator.type";
import FormInput from "components/FormInput";
import { toBackendDate, toInputDate } from "api/utils/date";
import { useEffect } from "react";

export default function EducatorEditForm({ educator, onSave, onCancel }: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateEducatorDTO>({
    defaultValues: {
      firstName: educator.firstName ?? "",
      lastName: educator.lastName ?? "",
      birthday: toInputDate(educator.birthday),
      email: educator.email ?? "",
      phoneNumber: educator.phoneNumber ?? "",
      addressDTO: educator.addressDTO,
    },
  });

  useEffect(() => {
    reset({
      firstName: educator.firstName ?? "",
      lastName: educator.lastName ?? "",
      birthday: toBackendDate(educator.birthday),
      groupIds: educator.groupIds ?? [],
    });
  }, [educator, educator.groupIds, reset]);

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit((data) => onSave(educator.uuid, data))}
      spacing={2}
      sx={{ pt: 1 }}
    >
      <Stack direction="row" spacing={2}>
        <FormInput
          label="Vorname"
          register={register("firstName")}
          errorMessage={errors.firstName?.message}
        />
        <FormInput
          label="Nachname"
          register={register("lastName")}
          errorMessage={errors.lastName?.message}
        />
        <FormInput
          label="birthday"
          register={register("birthday")}
          errorMessage={errors.birthday?.message}
        />
      </Stack>
      <FormInput label="Email" register={register("email")} />

      <FormInput label="Telefon" register={register("phoneNumber")} />

      <Divider>Adresse</Divider>

      <FormInput label="Straße" register={register("addressDTO.street")} />

      <Stack direction="row" spacing={2}>
        <FormInput label="PLZ" register={register("addressDTO.plz")} />
        <FormInput label="Stadt" register={register("addressDTO.city")} />
      </Stack>

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button onClick={onCancel}>Abbrechen</Button>
        <Button type="submit" variant="contained">
          Aktualisieren
        </Button>
      </Stack>
    </Stack>
  );
}
