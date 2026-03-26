import { useForm, Controller, SubmitHandler } from "react-hook-form";
import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";
import { handleCreateChildSubmit } from "../lib/childForm.handlers";

import {
  Box,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { useChildApi } from "../api/ChildApi";
import { CreateChildFormValues, ChildFormProps } from "api/child.type";
import {
  filterGroupsByKindergarten,
  mapKindergartensToOptions,
} from "../lib/childForm.utils";

export default function ChildForm(props: ChildFormProps) {
  const { onAddChild } = props;

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateChildFormValues>({
    defaultValues: {
      groupId: "",
      birthday: "",
      firstName: "",
      lastName: "",
      parentsId: [],
      kindergartenId: "",
    },
  });

  const { kindergartens, groups, createChild } = useChildApi({ reset });

  const selectedKindergartenId = watch("kindergartenId");

  const kindergartenOptions = mapKindergartensToOptions(kindergartens);

  const filteredGroupOptions = filterGroupsByKindergarten(
    groups,
    selectedKindergartenId,
  );

  const onSubmit = handleCreateChildSubmit(createChild, onAddChild);

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
                errorMessage={errors.firstName?.message}
              />

              <FormInput
                label="Nachname"
                {...register("lastName", {
                  required: "Nachname ist erforderlich",
                })}
                errorMessage={errors.lastName?.message}
              />

              <FormInput
                label="Geburtsdatum"
                type="date"
                {...register("birthday", {
                  required: "Geburtsdatum ist erforderlich",
                })}
                errorMessage={errors.birthday?.message}
                InputLabelProps={{ shrink: true }}
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
                disabled={createChild?.isPending}
                sx={{ alignSelf: "flex-start" }}
              >
                {createChild?.isPending ? "Speichern..." : "Anmelden"}
              </Button>

              {createChild?.isError && (
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
