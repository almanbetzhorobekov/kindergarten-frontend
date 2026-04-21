import { useForm, Controller } from "react-hook-form";
import FormSelect from "../components/FormSelect";
import FormInput from "../components/FormInput";
import {
  Box,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { CreateChildFormValues } from "api/child.type";

interface ChildFormViewProps {
  kindergartenOptions: { value: string; label: string }[];
  groupOptions: { value: string; label: string }[];
  onSubmit: (data: CreateChildFormValues) => void;
  isPending?: boolean;
  isError?: boolean;
  selectedKindergartenId?: string;
}

export default function ChildFormView({
  kindergartenOptions,
  groupOptions,
  onSubmit,
  isPending,
  isError,
}: ChildFormViewProps) {
  const {
    control,
    register,
    handleSubmit,
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

  const selectedKindergartenId = watch("kindergartenId");

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
                    options={groupOptions}
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
                disabled={isPending}
                sx={{ alignSelf: "flex-start" }}
              >
                {isPending ? "Speichern..." : "Anmelden"}
              </Button>

              {isError && (
                <Typography sx={{ color: "error.main" }}>
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
