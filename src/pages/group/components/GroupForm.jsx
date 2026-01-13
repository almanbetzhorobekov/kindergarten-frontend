import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { groupAPI } from "../../../api/groupService";
import { kindergartenAPI } from "../../../api/kindergartenService";
import {
  Card,
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

export default function GroupForm() {
  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: kindergartens = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["kindergartens"],
    queryFn: kindergartenAPI.getAll,
  });

  const mutation = useMutation({
    mutationFn: groupAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["groups"]);
      reset();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return <Typography>Lädt Kindergärten...</Typography>;
  if (error) return <Typography color="error">Fehler beim Laden!</Typography>;

  return (
    <Box component="section" sx={{ maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Gruppe erstellen
      </Typography>

      <Card elevation={5} sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Gruppenname */}
          <TextField
            fullWidth
            label="Gruppenname"
            margin="normal"
            {...register("groupName", {
              required: "Name ist erforderlich",
            })}
            error={!!errors.groupName}
            helperText={errors.groupName?.message}
          />

          {/* Kindergarten Select */}
          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.kindergartenId}
          >
            <InputLabel>Kindergarten</InputLabel>

            <Controller
              name="kindergartenId"
              control={control}
              rules={{ required: "Bitte Kindergarten auswählen" }}
              render={({ field }) => (
                <Select {...field} label="Kindergarten">
                  {kindergartens.map((kita) => (
                    <MenuItem key={kita.uuid} value={kita.uuid}>
                      {kita.kindergartenName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />

            <FormHelperText>{errors.kindergartenId?.message}</FormHelperText>
          </FormControl>

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Speichern..." : "Erstellen"}
          </Button>

          {mutation.isError && (
            <Typography color="error" mt={2}>
              Fehler beim Speichern
            </Typography>
          )}
        </Box>
      </Card>
    </Box>
  );
}
