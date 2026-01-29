import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../../components/FormInput";
import { Box, Grid, Stack, Typography, Button } from "@mui/material";

export default function EducatorEditForm({ educator, onSave, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: educator?.firstName || "",
      lastName: educator?.lastName || "",
      birthday: educator?.birthday || "",
      phoneNumber: educator?.phoneNumber || "",
      email: educator?.email || "",
      street: educator?.addressDTO?.street || "",
      houseNumber: educator?.addressDTO?.houseNumber || "",
      plz: educator?.addressDTO?.plz || "",
      city: educator?.addressDTO?.city || "",
    },
  });

  useEffect(() => {
    if (educator) {
      reset({
        firstName: educator.firstName || "",
        lastName: educator.lastName || "",
        birthday: educator.birthday || "",
        phoneNumber: educator.phoneNumber || "",
        email: educator.email || "",
        street: educator.addressDTO?.street || "",
        houseNumber: educator.addressDTO?.houseNumber || "",
        plz: educator.addressDTO?.plz || "",
        city: educator.addressDTO?.city || "",
      });
    }
  }, [educator, reset]);

  const onSubmit = (data) => {
    const formattedData = {
      firstName: data.firstName,
      lastName: data.lastName,
      birthday: data.birthday,
      phoneNumber: data.phoneNumber,
      email: data.email,
      addressDTO: {
        street: data.street,
        houseNumber: data.houseNumber,
        plz: data.plz,
        city: data.city,
      },
    };
    onSave(educator.uuid, formattedData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 1 }}>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormInput
              label="Vorname"
              {...register("firstName", { required: "Pflichtfeld" })}
              error={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInput
              label="Nachname"
              {...register("lastName", { required: "Pflichtfeld" })}
              error={errors.lastName?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <FormInput
              label="Geburtsdatum"
              type="date"
              {...register("birthday")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="primary" sx={{ mt: 1 }}>
              Adresse
            </Typography>
          </Grid>

          <Grid item xs={8}>
            <FormInput label="Straße" {...register("street")} />
          </Grid>
          <Grid item xs={4}>
            <FormInput label="Haus-Nr." {...register("houseNumber")} />
          </Grid>
          <Grid item xs={4}>
            <FormInput label="PLZ" {...register("plz")} />
          </Grid>
          <Grid item xs={8}>
            <FormInput label="Stadt" {...register("city")} />
          </Grid>

          <Grid item xs={8}>
            <FormInput label="Telefonnummer" {...register("phoneNumber")} />
          </Grid>

          <Grid item xs={8}>
            <FormInput label="Email" {...register("email")} />
          </Grid>
        </Grid>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 3 }}
        >
          <Button ariant="outlined" color="inherit" onClick={onCancel}>
            Abbrechen
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Speichern
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
