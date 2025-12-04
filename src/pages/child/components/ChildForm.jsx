import { useForm, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import Button from "../../../components/Button";
import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";

import { kindergartenAPI, groupAPI, childAPI } from "../../../api/childService";

export default function ChildForm({ onAddChild }) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // --- Fetch Kindergartens ---
  const { data: kindergartens = [] } = useQuery({
    queryKey: ["kindergartens"],
    queryFn: kindergartenAPI.getAll,
  });

  // --- Fetch Groups ---
  const { data: groups = [] } = useQuery({
    queryKey: ["groups"],
    queryFn: groupAPI.getAll,
  });

  // --- Convert to {value, label} arrays ---
  const kindergartenOptions = kindergartens.map((k) => ({
    value: k.uuid,
    label: k.name,
  }));

  const groupOptions = groups.map((g) => ({
    value: g.uuid,
    label: g.name,
  }));

  // --- Submit Handler ---
  const onSubmit = async (data) => {
    try {
      await childAPI.create(data); // POST через универсальную функцию
      onAddChild(data); // отправляем данные наверх
      reset(); // очищаем форму
    } catch (err) {
      console.error("Fehler beim Erstellen des Kindes:", err);
    }
  };

  return (
    <section className="childs">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Vorname */}
        <FormInput
          label="Vorname"
          {...register("firstName", { required: "Vorname ist erforderlich" })}
          error={errors.firstName?.message}
        />

        {/* Nachname */}
        <FormInput
          label="Nachname"
          {...register("lastName", { required: "Nachname ist erforderlich" })}
          error={errors.lastName?.message}
        />

        {/* Geburtsdatum */}
        <FormInput
          type="date"
          label="Geburtsdatum"
          {...register("birthday", { required: "Geburtsdatum ist erforderlich" })}
          error={errors.birthday?.message}
        />

        {/* Kindergarten Select */}
        <Controller
          name="kindergartenId"
          control={control}
          rules={{ required: "Kindergarten auswählen" }}
          render={({ field }) => (
            <FormSelect
              label="Kindergarten"
              options={kindergartenOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.kindergartenId?.message}
            />
          )}
        />

        {/* Group Select */}
        <Controller
          name="groupId"
          control={control}
          rules={{ required: "Gruppe auswählen" }}
          render={({ field }) => (
            <FormSelect
              label="Gruppe"
              options={groupOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.groupId?.message}
            />
          )}
        />

        <Button type="submit">Anmelden</Button>
      </form>
    </section>
  );
}

