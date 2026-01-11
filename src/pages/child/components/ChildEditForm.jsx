import { useForm, Controller } from "react-hook-form";
import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useChildApi } from "../api/childApi";

export default function ChildEditForm({
  child,
  groups,
  kindergartens,
  onSave,
  onCancel,
}) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "", //child.firstName ?? "",
      lastName: "", //child.lastName ?? "",
      birthday: "", //child.birthday ?? "",
      kindergartenId: "", //child.kindergartenId ?? "",
      groupId: "", //child.groupId ?? "",
    },
  });

  const selectedKindergartenId = watch("kindergartenId");

  useEffect(() => {
    reset((prev) => ({
      ...prev,
      groupId: "",
    }));
  }, [selectedKindergartenId, reset]);

  useEffect(() => {
    if (child) {
      reset({
        firstName: child.firstName ?? "",
        lastName: child.lastName ?? "",
        birthday: child.birthday ?? "",
        kindergartenId: child.kindergartenId ?? "",
        groupId: child.groupId ?? "",
      });
    }
  }, [child, reset]);

  const filteredGroupOptions = groups
    .filter((g) => g.kindergartenId === selectedKindergartenId)
    .map((g) => ({ value: g.uuid, label: g.groupName }));

  const kindergartenOptions = kindergartens.map((k) => ({
    value: k.uuid,
    label: k.kindergartenName,
  }));

  const onSubmit = (data) => {
    if (!child?.uuid) return;
    onSave(child.uuid, data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
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
          type="date"
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

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained">
            Speichern
          </Button>
          <Button variant="outlined" onClick={onCancel}>
            Abbrechen
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
