import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import FormInput from "../../../components/FormInput";
import FormSelect from "../../../components/FormSelect";

export default function ParentEditForm({ parent, children, onSave, onCancel }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: parent?.firstName || "",
      lastName: parent?.lastName || "",
      birthday: parent?.birthday || "",

      street: parent?.addressDTO?.street || "",
      houseNumber: parent?.addressDTO?.houseNumber || "",
      plz: parent?.addressDTO?.plz || "",
      city: parent?.addressDTO?.city || "",
      phoneNumber: parent?.phoneNumber || "",

      childrenId:
        parent?.childrenId || parent?.children?.map((c) => c.uuid) || [],
    },
  });

  useEffect(() => {
    if (parent) {
      reset({
        firstName: parent.firstName,
        lastName: parent.lastName,
        birthday: parent.birthday,
        street: parent.addressDTO?.street || "",
        houseNumber: parent.addressDTO?.houseNumber || "",
        plz: parent.addressDTO?.plz || "",
        city: parent.addressDTO?.city || "",
        phoneNumber: parent.phoneNumber,
        childrenId:
          parent.childrenId || parent.children?.map((c) => c.uuid) || [],
      });
    }
  }, [parent, reset]);

  const onSubmit = (data) => {
    if (!parent?.uuid) return;

    const formattedData = {
      firstName: data.firstName,
      lastName: data.lastName,
      birthday: data.birthday,
      phoneNumber: data.phoneNumber,

      addressDTO: {
        street: data.street,
        houseNumber: data.houseNumber,
        plz: data.plz,
        city: data.city,
      },

      childrenId: Array.isArray(data.childrenId)
        ? data.childrenId
        : [data.childrenId],
    };

    onSave(parent.uuid, formattedData);
  };

  const childOptions =
    children?.map((c) => ({
      value: c.uuid || c.id,
      label: `${c.firstName} ${c.lastName}`,
    })) || [];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 1 }}>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormInput
              label="Vorname"
              {...register("firstName", {
                required: "Vorname ist erforderlich",
              })}
              error={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInput
              label="Nachname"
              {...register("lastName", {
                required: "Nachname ist erforderlich",
              })}
              error={errors.lastName?.message}
            />
          </Grid>
        </Grid>

        <FormInput
          label="Geburtsdatum"
          type="date"
          {...register("birthday", {
            required: "Geburtsdatum ist erforderlich",
          })}
          error={errors.birthday?.message}
          InputLabelProps={{ shrink: true }}
        />

        <Typography variant="subtitle2" color="primary" sx={{ mb: -1, mt: 1 }}>
          Adresse
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={8}>
            <FormInput
              label="Straße"
              {...register("street", { required: "Pflichtfeld" })}
              error={errors.street?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <FormInput
              label="Haus-Nr."
              {...register("houseNumber", { required: "Pflicht" })}
              error={errors.houseNumber?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <FormInput
              label="PLZ"
              {...register("plz", { required: "Pflicht" })}
              error={errors.plz?.message}
            />
          </Grid>
          <Grid item xs={8}>
            <FormInput
              label="Stadt"
              {...register("city", { required: "Pflicht" })}
              error={errors.city?.message}
            />
          </Grid>
        </Grid>

        <FormInput
          label="Telefonnummer"
          {...register("phoneNumber")}
          error={errors.phoneNumber?.message}
        />

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 3 }}
        >
          <Button variant="outlined" color="inherit" onClick={onCancel}>
            Abbrechen
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Aktualisieren
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
