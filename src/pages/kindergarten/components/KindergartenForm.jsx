import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kindergartenAPI } from "../../../api/kindergartenService";
import FormInput from "../../../components/FormInput";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";

export default function KindergartenForm({ onAddKindergarten }) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      kindergartenName: "",
      street: "",
      houseNumber: "",
      plz: "",
      city: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => kindergartenAPI.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["kindergartens"] });
      reset();
      if (onAddKindergarten) onAddKindergarten(data);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      kindergartenName: data.kindergartenName,
      address: {
        street: data.street,
        houseNumber: data.houseNumber,
        plz: data.plz,
        city: data.city,
      },
    });
  };

  return (
    <Box component="section">
      <Typography variant="h6" gutterBottom>
        Neuen Kindergarten anmelden
      </Typography>

      <Card elevation={5}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <FormInput
                label="Kindergartenname"
                {...register("kindergartenName", {
                  required: "Name ist erforderlich",
                })}
                error={errors.kindergartenName?.message}
              />

              <Divider />

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
                label="Ort"
                {...register("city", { required: "Ort ist erforderlich" })}
                error={errors.city?.message}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Speichern..." : "Erstellen"}
              </Button>

              {mutation.isError && (
                <Typography sx={{ color: "red" }}>
                  Fehler beim Speichern
                </Typography>
              )}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
