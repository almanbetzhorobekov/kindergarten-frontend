import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEducator } from "../../../api/educatorService";

export default function EducatorForm() {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();

  const mutation = useMutation({
    mutationFn: addEducator,
    onSuccess: () => {
      queryClient.invalidateQueries(["educators"]);
      reset();
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <section className="educators">
      <h2>Neuen Erzieher erstellen</h2>

      <form className="educator-form" onSubmit={handleSubmit(onSubmit)}>

        <input {...register("firstName", { required: true })} placeholder="Vorname" />
        <input {...register("lastName", { required: true })} placeholder="Nachname" />
        <input type="date" {...register("birthday", { required: true })} />

        <fieldset>
          <input {...register("street")} placeholder="Straße" />
          <input {...register("houseNumber")} placeholder="Hausnummer" />
          <input {...register("plz")} placeholder="PLZ" />
        </fieldset>

        <input {...register("phoneNumber")} placeholder="Telefonnummer" />

        <label>Gruppe wählen</label>
        <select {...register("groupSelect")}>
          <option value="">--Wähle Gruppe--</option>
          <option value="Sonnenschein">Sonnenschein</option>
          <option value="Regenbogen">Regenbogen</option>
          <option value="Sterntaler">Sterntaler</option>
        </select>

        <label>Kindergarten wählen</label>
        <select {...register("kindergartenSelect")}>
          <option value="">--Wähle Kindergarten--</option>
          <option value="Wunderkind Alsdorf">Wunderkind Alsdorf</option>
          <option value="Wunderkind Herzogenrath">Wunderkind Herzogenrath</option>
          <option value="Wunderkind Aachen">Wunderkind Aachen</option>
        </select>

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Speichern..." : "Erstellen"}
        </button>
      </form>
    </section>
  );
}

