import { useForm } from "react-hook-form";
import { Box, Button, Stack } from "@mui/material";
import FormInput from "../../../components/FormInput";

export default function KindergartenEditForm({
  kindergarten,
  onSave,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      kindergartenName: kindergarten.kindergartenName || "",
      street: kindergarten.address?.street || "",
      houseNumber: kindergarten.address?.houseNumber || "",
      plz: kindergarten.address?.plz || "",
      city: kindergarten.address?.city || "",
    },
  });

  const onSubmit = (data) => {
    if (!kindergarten?.uuid) return;

    const payload = {
      kindergartenName: data.kindergartenName,
      address: {
        street: data.street,
        houseNumber: data.houseNumber,
        plz: data.plz,
        city: data.city,
      },
    };

    onSave(kindergarten.uuid, payload);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 1 }}>
      <Stack spacing={2}>
        <FormInput
          label="Kindergarten Name"
          {...register("kindergartenName", {
            required: "Name ist erforderlich",
          })}
          error={errors.kindergartenName?.message}
        />

        <FormInput
          label="Straße"
          {...register("street", { required: "Straße ist erforderlich" })}
          error={errors.street?.message}
        />

        <FormInput
          label="Hausnummer"
          {...register("houseNumber", {
            required: "Hausnummer ist erforderlich",
          })}
          error={errors.houseNumber?.message}
        />

        <FormInput
          label="PLZ"
          {...register("plz", { required: "PLZ ist erforderlich" })}
          error={errors.plz?.message}
        />

        <FormInput
          label="Stadt"
          {...register("city", { required: "Stadt ist erforderlich" })}
          error={errors.city?.message}
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
