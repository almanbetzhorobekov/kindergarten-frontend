import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Button from "../../../components/Button";
import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";

import { educatorAPI, groupAPI, kindergartenAPI } from "../../../api/educatorService";

export default function EducatorForm( onAddEducator ) {

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const { data: kindergartens = [] } = useQuery({
    queryKey: ["kindergartens"],
    queryFn: kindergartenAPI.getAll,
  });

  const { data: groups = [] } = useQuery({
    queryKey: ["groups"],
    queryFn: groupAPI.getAll,
  });

  const selectedKindergartenId = watch("kindergartenId");

  const kindergartenOptions = kindergartens.map((k) => ({
    value: k.uuid,
    label: k.kindergartenName,
  }));

  const filteredGroupOptions = groups
    .filter((g) => g.kindergartenId === selectedKindergartenId)
    .map((g) => ({
      value: g.uuid,
      label: g.groupName,
    }));

    const mutation = useMutation({
    mutationFn: educatorAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["educators"]);
      reset();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
    if (onAddEducator) {
      onAddEducator(data);
    }
  };

  return (
    <section className="educators">

      <form className="educator-form" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          placeholder="Vorname"
          {...register("firstName", { required: "Vorname ist erforderlich" })}
          error={errors.fistname?.message}
        />

        <FormInput
          placeholder="Nachname"
          {...register("lastName", { required: "Nachname ist erforderlich" })}
          error={errors.lastname?.message}
        />

        <FormInput
          placeholder="Geburtsdatum"
          type="date"
          {...register("birthday", {
            required: "Geburtsdatum ist erforderlich",
          })}
          error={errors.dateOfBirth?.message}
        />
        
        <fieldset>
          <FormInput
            placeholder="Straße"
            {...register("street", {
               required: "Straße ist erforderlich"
              })}
            error={errors.street?.message}
          />

          <FormInput
            placeholder="Hausnummer"
            {...register("houseNumber", {
               required: "Hausnummer ist erforderlich"
              })}
            error={errors.houseNumber?.message}
          />

          <FormInput
            placeholder="PLZ"
            {...register("plz", {
                required: "PLZ ist erforderlich"
            })}
            error={errors.plz?.message}
          />
        </fieldset>

        <FormInput
          placeholder="Telefonnummer"
          {...register("phone", {
              required: "Telefonnummer ist erforderlich"
          })}
          error={errors.phone?.message}
        />

        <Controller
          name="kindergartenId"
          control={control}
          rules={{ required: "Kindergarten auswählen" }} 
          render={({ field }) => (
            <FormSelect
              placeholder="Kindergarten"
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
          rules={{
             required: "Gruppe auswählen"
            }}
          render={({ field }) => (
            <FormSelect
              placeholder="Gruppe"
              options={filteredGroupOptions}
              value={field.value}
              onChange={field.onChange}
              disabled={!selectedKindergartenId}
              error={errors.groupId?.message}
            />
          )}
        />

        <Button type="submit" 
          disabled={mutation.isLoading}>
          {mutation.isLoading ? "Speichern..." : "Anmelden"}
        </Button>
        
        {mutation.isError && (
          <p style={{color: "red "}}>
            Fehler beim Speichern
          </p>
        )}
      </form>
    </section>
  );
}

