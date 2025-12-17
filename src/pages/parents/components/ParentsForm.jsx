import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Button from "../../../components/Button";
import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";

import { parentsAPI, childAPI } from "../../../api/parentsService";

export default function ParentsForm({ onAddParent }) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

 
  const { data: children = [] } = useQuery({
    queryKey: ["children"],
    queryFn: childAPI.getAll,
  });

 
  const childOptions = children.map((c) => ({
    value: c.uuid ?? c.id,
    label: `${c.firstName} ${c.lastName}`,
  }));

  const mutation = useMutation({
    mutationFn: parentsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["parents"]);
      reset();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
    if (onAddParent) {
      onAddParent(data);
    }
  };

  return (
    <section className="parents-form">
      <form className="parents-form-inner" onSubmit={handleSubmit(onSubmit)}>

        <FormInput
          placeholder="Vorname"
          {...register("firstName", { required: "Vorname ist erforderlich" })}
          error={errors.firstName?.message}
        />

        <FormInput
          placeholder="Nachname"
          {...register("lastName", { required: "Nachname ist erforderlich" })}
          error={errors.lastName?.message}
        />

        <FormInput
          placeholder="Geburtsdatum"
          type="date"
          {...register("birthday", {
            required: "Geburtsdatum ist erforderlich",
          })}
          error={errors.birthday?.message}
        />

        <fieldset>
          <FormInput
            placeholder="Straße"
            {...register("street", {
              required: "Straße ist erforderlich",
            })}
            error={errors.street?.message}
          />

          <FormInput
            placeholder="Hausnummer"
            {...register("houseNumber", {
              required: "Hausnummer ist erforderlich",
            })}
            error={errors.houseNumber?.message}
          />

          <FormInput
            placeholder="PLZ"
            {...register("plz", {
              required: "PLZ ist erforderlich",
            })}
            error={errors.plz?.message}
          />
        </fieldset>

        <FormInput
          placeholder="Telefonnummer"
          {...register("phoneNumber", {
            required: "Telefonnummer ist erforderlich",
          })}
          error={errors.phoneNumber?.message}
        />

        
        <Controller
          name="childId"
          control={control}
          rules={{ required: "Kind auswählen" }}
          render={({ field }) => (
            <FormSelect
              placeholder="Kind auswählen"
              options={childOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.childId?.message}
            />
          )}
        />

        <Button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Speichern..." : "Eltern speichern"}
        </Button>

        {mutation.isError && (
          <p style={{ color: "red" }}>Fehler beim Speichern</p>
        )}
      </form>
    </section>
  );
}

