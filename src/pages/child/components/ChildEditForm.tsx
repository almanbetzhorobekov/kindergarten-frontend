import { useForm, Controller, SubmitHandler } from "react-hook-form";
import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";
import { Box, Button, Stack } from "@mui/material";
import { useEffect } from "react";
import { toBackendDate, toInputDate } from "api/utils/date";
import {
  mapFormToUpdateChild,
  ChildEditFormValues,
  ChildEditFormProps,
} from "../lib/mapChildToUpdates";
import {
  filterGroupsByKindergarten,
  mapKindergartensToOptions,
} from "../lib/childForm.utils";

export default function ChildEditForm({
  child,
  groups,
  kindergartens,
  onSave,
  onCancel,
}: ChildEditFormProps) {
  const kindergartenId =
    groups.find((g) => g.uuid === child.groupId)?.kindergartenId ?? "";

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChildEditFormValues>({
    defaultValues: {
      firstName: child.firstName ?? "",
      lastName: child.lastName ?? "",
      birthday: toInputDate(child.birthday),
      kindergartenId,
      groupId: child.groupId ?? "",
    },
    shouldUnregister: false,
  });

  useEffect(() => {
    reset({
      firstName: child.firstName ?? "",
      lastName: child.lastName ?? "",
      birthday: toBackendDate(child.birthday),
      kindergartenId: kindergartenId,
      groupId: child.groupId ?? "",
    });
  }, [child, kindergartenId, reset]);

  const onSubmit: SubmitHandler<ChildEditFormValues> = (data) => {
    if (!child?.uuid) return;
    const payload = mapFormToUpdateChild(data);
    onSave(child.uuid, payload);
  };

  const watchedKindergartenId = watch("kindergartenId");

  const kindergartenOptions = mapKindergartensToOptions(kindergartens);

  const groupOptions = filterGroupsByKindergarten(
    groups,
    watchedKindergartenId,
  );

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 0.6 }}>
      <Stack spacing={2}>
        <FormInput
          label="Vorname"
          {...register("firstName", { required: "Vorname ist erforderlich" })}
          errorMessage={errors.firstName?.message}
        />

        <FormInput
          label="Nachname"
          {...register("lastName", { required: "Nachname ist erforderlich" })}
          errorMessage={errors.lastName?.message}
        />

        <FormInput
          label="Geburtsdatum"
          type="date"
          {...register("birthday", {
            required: "Geburtsdatum ist erforderlich",
          })}
          errorMessage={errors.birthday?.message}
          InputLabelProps={{ shrink: true }}
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
              disabled={!watchedKindergartenId ? true : false}
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
