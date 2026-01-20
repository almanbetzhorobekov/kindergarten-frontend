import { useForm, Controller } from "react-hook-form";
import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";
import { Box, Button, Stack } from "@mui/material";

export default function ChildEditForm({
  child,
  groups,
  kindergartens,
  onSave,
  onCancel,
}) {
  const kindergartenId = groups.find(
    (group) => group.uuid === child.groupId,
  )?.kindergartenId;

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: child.firstName ?? "",
      lastName: child.lastName ?? "",
      birthday: child.birthday ?? "",
      kindergartenId: kindergartenId ?? "",
      groupId: child.groupId ?? "",
    },
    shouldUnregister: false,
  });

  const watchedKindergartenId = watch("kindergartenId");

  const onSubmit = (data) => {
    if (!child?.uuid) return;
    onSave(child.uuid, data);
  };

  const kindergartenOptions = kindergartens.map((kg) => ({
    label: kg.kindergartenName,
    value: kg.uuid,
  }));

  const groupOptions = groups
    .filter((g) => g.kindergartenId === watchedKindergartenId)
    .map((g) => ({
      label: g.groupName,
      value: g.uuid,
    }));

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        pt: 0.6,
      }}
    >
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
              options={groupOptions}
              value={field.value}
              onChange={field.onChange}
              disabled={!watchedKindergartenId}
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
