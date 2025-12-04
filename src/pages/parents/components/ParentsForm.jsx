import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addParent } from "../../../api/parentsService";

export default function ParentsForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: addParent,
    onSuccess: () => {
      queryClient.invalidateQueries(["parents"]); // обновляем список
      reset();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <section className="parents">
      <form id="parents-form" onSubmit={handleSubmit(onSubmit)}>

        <input
          {...register("firstName", { required: true })}
          placeholder="Vorname"
        />
        {errors.firstName && <p>Vorname ist erforderlich</p>}

        <input
          {...register("lastName", { required: true })}
          placeholder="Nachname"
        />

        <input
          {...register("phoneNumber", { required: true })}
          placeholder="Telefonnummer"
        />

        <input
          type="date"
          {...register("birthday", { required: true })}
        />

        <fieldset>
          <input
            {...register("street", { required: true })}
            placeholder="Straße"
          />

          <input
            {...register("houseNumber", { required: true })}
            placeholder="Hausnummer"
          />

          <input
            {...register("plz", { required: true })}
            placeholder="PLZ"
          />
        </fieldset>

        <select {...register("childSelect")}>
          <option value="">-- Wähle ein Kind --</option>
          <option value="Kind 1">Kind 1</option>
          <option value="Kind 2">Kind 2</option>
        </select>

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Speichern..." : "Anmelden"}
        </button>
      </form>
    </section>
  );
}
