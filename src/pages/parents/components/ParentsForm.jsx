import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";

import { parentsAPI } from "../../../api/parentsService";
import { childAPI } from "../../../api/childService";
import {
  Box,
  Card,
  Button,
  Typography,
  CardContent,
  Stack,
} from "@mui/material";

export default function ParentsForm({ onAddParent }) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["children"],
    queryFn: childAPI.getAll,
  });

  const children = data?.content ?? [];

  const childOptions = children.map((c) => ({
    value: c.uuid ?? c.id,
    label: `${c.firstName} ${c.lastName}`,
  }));

  const mutation = useMutation({
    mutationFn: parentsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["parents"]);
      reset();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
    if (onAddParent) {
      onAddParent(data);
    }
  };

  return (
    <Box component="section">
      <Typography variant="h6" gutterBottom>
        Eltern anmelden
      </Typography>

      <Card sx={{ mb: 4 }} elevation={5}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <FormInput
                label="Vorname"
                {...register("firstName", {
                  required: "Vorname ist erforderlich",
                })}
                error={errors.firstName?.message}
              />

              <FormInput
                label="Nachname"
                {...register("lastName", {
                  required: "Nachname ist erforderlich",
                })}
                error={errors.lastName?.message}
              />

              <Typography variant="h7">Geburtsdatum</Typography>
              <FormInput
                type="date"
                {...register("birthday", {
                  required: "Geburtsdatum ist erforderlich",
                })}
                error={errors.birthday?.message}
              />

              <Box spacing={3}>
                <Typography variant="subtitle1" gutterBottom>
                  Adresse
                </Typography>

                <Stack spacing={2} direction="row">
                  <FormInput
                    label="Straße"
                    {...register("street", {
                      required: "Straße ist erforderlich",
                    })}
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
                    {...register("plz", {
                      required: "PLZ ist erforderlich",
                    })}
                    error={errors.plz?.message}
                  />
                </Stack>
              </Box>

              <FormInput
                label="Telefonnummer"
                {...register("phoneNumber", {
                  required: "Telefonnummer ist erforderlich",
                })}
                error={errors.phoneNumber?.message}
              />

              {/* Kind auswählen */}
              <Controller
                name="childId"
                control={control}
                rules={{ required: "Kind auswählen" }}
                render={({ field }) => (
                  <FormSelect
                    label="Kind auswählen"
                    options={childOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.childId?.message}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={mutation.isLoading}
                sx={{ alignSelf: "flex-start" }}
              >
                {mutation.isLoading ? "Speichern..." : "Eltern speichern"}
              </Button>

              {/* Error */}
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
