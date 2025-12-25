import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "../../../api/groupService";
import { fetchKindergartens } from "../../../api/kindergartenService"; // список садиков
import { Typography, Button, Box } from "@mui/material";
import FormInput from "../../../components/FormInput";

export default function GroupForm() {
  const queryClient = useQueryClient();

  // React Hook Form
  const {
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
  if (error) return <Typography>Fehler beim Laden!</Typography>;

  return (
    <FormInput onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        label="Gruppenname"
        {...register("groupName", { required: "Name ist erforderlich" })}
      />
      {errors.name && <Typography>{errors.name.message}</Typography>}

      <label>Kindergarten wählen:</label>
      <select {...register("kindergartenId", { required: true })}>
        <option value="">--Wähle Kindergarten--</option>
        {kindergartens.map((kita) => (
          <option key={kita.uuid} value={kita.uuid}>
            {kita.name || " "} ({kita.street || " "} {kita.houseNumber || " "})
          </option>
        ))}
      </select>
      {errors.kindergartenId && (
        <Typography>Bitte Kindergarten auswählen</Typography>
      )}

      <Button type="submit">Erstellen</Button>
    </FormInput>
  );
}
