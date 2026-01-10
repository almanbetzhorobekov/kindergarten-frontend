import { useForm, Controller } from "react-hook-form";
import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";

import {
  Box,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { useChildApi } from "../api/childApi";

export default function ChildForm({ onAddChild }) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { kindergartens, groups, mutation } = useChildApi({ reset });

  const selectedKindergartenId = watch("kindergartenId");

  const kindergartenOptions = kindergartens.map((k) => ({
    value: k.uuid,
    label: k.kindergartenName,
  }));

  const filteredGroupOptions = groups
    .filter((g) => g.kindergartenId === selectedKindergartenId)
    .map((g) => ({ value: g.uuid, label: g.groupName }));

  const onSubmit = (data) => {
    mutation.mutate(data); // создание ребенка
    if (onAddChild) onAddChild(data);
  };

  return (
    <Box component="section">
      <Typography variant="h6" gutterBottom>
        Neuen Kinder anmelden
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

              <FormInput
                type="date"
                {...register("birthday", {
                  required: "Geburtsdatum ist erforderlich",
                })}
                error={errors.birthday?.message}
              />

              <Controller
                name="kindergartenId"
                control={control}
                rules={{ required: "Kindergarten auswählen" }}
                render={({ field }) => (
                  <FormSelect
                    label="Kindergarten"
                    options={kindergartenOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.kindergartenId?.message}
                  />
                )}
              />

              <Controller
                name="groupId"
                control={control}
                rules={{ required: "Gruppe auswählen" }}
                render={({ field }) => (
                  <FormSelect
                    label="Gruppe"
                    options={filteredGroupOptions}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={!selectedKindergartenId}
                    error={errors.groupId?.message}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={mutation?.isLoading}
                sx={{ alignSelf: "flex-start" }}
              >
                {mutation?.isLoading ? "Speichern..." : "Anmelden"}
              </Button>

              {mutation?.isError && (
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
