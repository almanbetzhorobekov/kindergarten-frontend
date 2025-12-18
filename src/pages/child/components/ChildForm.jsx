import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";

import { kindergartenAPI, groupAPI, childAPI } from "../../../api/childService";
import { Box, Button, Typography } from "@mui/material";

export default function ChildForm({ onAddChild }) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

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

  // --- Selected kindergarten ---
  const selectedKindergartenId = watch("kindergartenId");

  // --- Options ---
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

  //  TanStack Mutation for creating child
  const mutation = useMutation({
    mutationFn: childAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["children"]); // обновляем список детей
      reset();
    },
  });

  // --- Submit handler ---
  const onSubmit = (data) => {
    mutation.mutate(data);
    if (onAddChild) onAddChild(data);
  };

  return (
    <Box component={"section"}>
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Vorname"
          {...register("firstName", {
            required: "Vorname ist erforderlich",
          })}
          error={errors.firstName?.message}
        />

        <FormInput
          label="Nachname"
          {...register("lastName", {
            required: "Nachname ist erforderlich",
          })}
          error={errors.lastName?.message}
        />

        <FormInput
          type="date"
          label="Geburtsdatum"
          {...register("birthday", {
            required: "Geburtsdatum ist erforderlich",
          })}
          error={errors.birthday?.message}
        />

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

        <Controller
          name="groupId"
          control={control}
          rules={{ required: "Gruppe auswählen" }}
          render={({ field }) => (
            <FormSelect
              label="Gruppe"
              options={filteredGroupOptions}
              value={field.value}
              onChange={field.onChange}
              disabled={!selectedKindergartenId}
              error={errors.groupId?.message}
            />
          )}
        />

        <Button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Speichern..." : "Anmelden"}
        </Button>

        {mutation.isError && (
          <Typography sx={{ color: "red" }}>Fehler beim Speichern</Typography>
        )}
      </Box>
    </Box>
  );
}
