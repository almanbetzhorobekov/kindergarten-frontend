import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Stack } from "@mui/material";
import { useEffect } from "react";
import FormInput from "../../../components/FormInput";
import {
  KindergartenEditFormValues,
  KindergartenEditFormProps,
  mapFormToUpdateKindergarten,
} from "../lib/mapKitaToUpdates";

export default function KindergartenEditForm({
  kindergarten,
  onSave,
  onCancel,
}: KindergartenEditFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<KindergartenEditFormValues>({
    defaultValues: {
      kindergartenName: kindergarten.kindergartenName ?? "",
      plz: kindergarten.address?.plz ?? "",
      street: kindergarten.address?.street ?? "",
      houseNumber: kindergarten.address?.houseNumber ?? "",
      city: kindergarten.address?.city ?? "",
    },
  });

  useEffect(() => {
    reset({
      kindergartenName: kindergarten.kindergartenName ?? "",
      plz: kindergarten.address?.plz ?? "",
      street: kindergarten.address?.street ?? "",
      houseNumber: kindergarten.address?.houseNumber ?? "",
      city: kindergarten.address?.city ?? "",
    });
  }, [kindergarten, reset]);

  const onSubmit: SubmitHandler<KindergartenEditFormValues> = (data) => {
    const updateData = mapFormToUpdateKindergarten(data);
    onSave(kindergarten.uuid, updateData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 1.5 }}>
      <Stack spacing={2}>
        <FormInput
          label="Kindergarten Name"
          register={register("kindergartenName", {
            required: "Name ist erforderlich",
          })}
          errorMessage={errors.kindergartenName?.message}
        />
        <FormInput
          label="PLZ"
          register={register("plz", { required: "PLZ ist erforderlich" })}
          errorMessage={errors.plz?.message}
        />
        <FormInput
          label="Straße"
          register={register("street", { required: "Straße ist erforderlich" })}
          errorMessage={errors.street?.message}
        />
        <FormInput
          label="Hausnummer"
          register={register("houseNumber", {
            required: "Hausnummer ist erforderlich",
          })}
          errorMessage={errors.houseNumber?.message}
        />
        <FormInput
          label="Stadt"
          register={register("city", { required: "Stadt ist erforderlich" })}
          errorMessage={errors.city?.message}
        />

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained">
            Speichern
          </Button>
          <Button variant="outlined" onClick={onCancel}>
            Abbrechen
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
