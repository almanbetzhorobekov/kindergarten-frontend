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

import { CreateGroupDTO, GroupDTO } from "api/group.type";
import { KindergartenDTO } from "api/kindergarten.type";

type GroupFormProps = {
  onAddGroup: (group: GroupDTO) => void;
};

export default function GroupForm(props: GroupFormProps) {
  const queryClient = useQueryClient();

  const { onAddGroup } = props;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateGroupDTO>();

  const {
    data: kindergartens = [],
    isLoading,
    error,
  } = useQuery<KindergartenDTO[]>({
    queryKey: ["kindergartens"],
    queryFn: kindergartenAPI.getAll,
  });

  const mutation = useMutation<GroupDTO, Error, CreateGroupDTO>({
    mutationFn: groupAPI.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });

      onAddGroup?.(data);
      reset();
    },
  });

  const onSubmit = (data: CreateGroupDTO) => {
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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={mutation.isPending}
          >
            {mutation.isError ? "Speichern..." : "Erstellen"}
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
