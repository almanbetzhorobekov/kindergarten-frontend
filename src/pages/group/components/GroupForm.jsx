import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../../components/Button";
import { createGroup } from "../../../api/groupService";
import { fetchKindergartens } from "../../../api/kindergartenService"; // список садиков
import "../styles/GroupPage.css";

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

  if (isLoading) return <p>Lädt Kindergärten...</p>;
  if (error) return <p>Fehler beim Laden!</p>;

  return (
    <form className="group-form" onSubmit={handleSubmit(onSubmit)}>

      <input
        type="text"
        placeholder="Gruppenname"
        {...register("groupName", { required: "Name ist erforderlich" })}
      />
      {errors.name && <p className="error-text">{errors.name.message}</p>}

      
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
        <p className="error-text">Bitte Kindergarten auswählen</p>
      )}

      <Button type="submit">Erstellen</Button>
    </form>
  );
}
