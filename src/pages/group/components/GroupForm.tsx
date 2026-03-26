import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import FormInput from "../../../components/FormInput";
import { CreateGroupDTO } from "api/group.type";
import { useGroupApi } from "../api/GroupApi";
import { useKindergartenApi } from "../../kindergarten/api/KindergartenApi";

export default function GroupForm() {
  const { createMutation } = useGroupApi();
  const { kindergartens, isLoading: isLoadingKitas } = useKindergartenApi();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateGroupDTO>({
    defaultValues: {
      groupName: "",
      kindergartenId: "",
    },
  });

  const onSubmit = (data: CreateGroupDTO) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  if (isLoadingKitas) return <Typography>Lädt Kindergärten...</Typography>;

  return (
    <Box component="section">
      <Typography variant="h4" mb={2}>
        Neue Gruppe erstellen
      </Typography>

      <Card elevation={5}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={3}>
              <FormInput
                label="Gruppenname"
                register={register("groupName", {
                  required: "Gruppenname ist erforderlich",
                })}
                errorMessage={errors.groupName?.message}
              />

              <FormControl fullWidth error={!!errors.kindergartenId}>
                <InputLabel id="kindergarten-label">Kindergarten</InputLabel>
                <Controller
                  name="kindergartenId"
                  control={control}
                  rules={{ required: "Bitte Kindergarten auswählen" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="kindergarten-label"
                      label="Kindergarten"
                    >
                      {kindergartens.map((kita) => (
                        <MenuItem key={kita.uuid} value={kita.uuid}>
                          {kita.kindergartenName}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>
                  {errors.kindergartenId?.message}
                </FormHelperText>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? "Speichern..." : "Erstellen"}
              </Button>

              {createMutation.isError && (
                <Typography color="error" textAlign="center">
                  Fehler: {createMutation.error.message}
                </Typography>
              )}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
