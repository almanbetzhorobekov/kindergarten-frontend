import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";

import { parentsAPI, childAPI } from "../../../api/parentsService";
import { Box, TextField, Button, Typography } from "@mui/material";

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

  const { data } = useQuery({
    queryKey: ["children"],
    queryFn: childAPI.getAll,
  });

  const children = data?.content ?? [];

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
    <Box component={"section"}>
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Vorname"
          {...register("firstName", { required: "Vorname ist erforderlich" })}
          error={errors.firstName?.message}
        />

        <FormInput
          label="Nachname"
          {...register("lastName", { required: "Nachname ist erforderlich" })}
          error={errors.lastName?.message}
        />

        <FormInput
          label="Geburtsdatum"
          type="date"
          {...register("birthday", {
            required: "Geburtsdatum ist erforderlich",
          })}
          error={errors.birthday?.message}
        />

        <TextField>
          <FormInput
            label="Straße"
            {...register("street", {
              required: "Straße ist erforderlich",
            })}
            error={errors.street?.message}
          />

          <FormInput
            label="Hausnummer"
            {...register("houseNumber", {
              required: "Hausnummer ist erforderlich",
            })}
            error={errors.houseNumber?.message}
          />

          <FormInput
            label="PLZ"
            {...register("plz", {
              required: "PLZ ist erforderlich",
            })}
            error={errors.plz?.message}
          />
        </TextField>

        <FormInput
          label="Telefonnummer"
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
              label="Kind auswählen"
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
          <Typography style={{ color: "red" }}>
            Fehler beim Speichern
          </Typography>
        )}
      </Box>
    </Box>
  );
}
