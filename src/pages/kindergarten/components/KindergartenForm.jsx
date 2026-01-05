import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "../../../api/groupService";
import { fetchKindergartens } from "../../../api/kindergartenService"; // список садиков
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

  // React Hook Form
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // GET
  const {
    data: kindergartens = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["kindergartens"],
    queryFn: fetchKindergartens,
  });

  // POST
  const mutation = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries(["groups"]); // reset
      reset();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return <Typography>Lädt Kindergärten...</Typography>;
  if (error) return <Typography color="error">Fehler beim Laden!</Typography>;

  return (
    <Box
      component={"section"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400 }}
    >
      <Typography variant="h6" gutterBottom>
        Gruppe erstellen
      </Typography>
      <Card elevation={5}>
        <Box component="form" onSubmit={handleSubmit}></Box>
      </Card>
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
      {/*errors.name && <Typography>{errors.name.message}</Typography>*/}

      <FormControl fullWidth margin="normal" error={!!errors.kindergartenId}>
        <InputLabel>Kindergarten</InputLabel>

        <Controller
          name="kindergartenId"
          control={control}
          rules={{ required: "Bitte Kindergarten auswählen" }}
          render={({ field }) => (
            <Select {...field} label="Kindergarten">
              {kindergartens.map((kita) => (
                <MenuItem key={kita.uuid} value={kita.uuid}>
                  {kita.name} ({kita.street} {kita.houseNumber})
                </MenuItem>
              ))}
            </Select>
          )}
        />

        <FormHelperText>{errors.kindergartenId?.message}</FormHelperText>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
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
  );
}
