import { useForm, Controller, SubmitHandler } from "react-hook-form";
import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";
import { Box, Button, Stack } from "@mui/material";
import { useEffect } from "react";
import { ChildDTO, UpdateChildDTO } from "api/child.type";
import { GroupDTO } from "api/group.type";
import { KindergartenDTO } from "api/kindergarten.type";

type ChildEditFormValues = {
  firstName: string;
  lastName: string;
  birthday: string;
  kindergartenId: string;
  groupId: string;
};

type ChildEditFormProps = {
  child: ChildDTO;
  groups: GroupDTO[];
  kindergartens: KindergartenDTO[];
  onSave: (uuid: string, data: UpdateChildDTO) => void;
  onCancel: () => void;
};

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
      // 2024-02-24
      birthday: child.birthday
        ? new Date(child.birthday).toISOString().split("T")[0]
        : "",
      kindergartenId,
      groupId: child.groupId ?? "",
    },
    shouldUnregister: false,
  });

  const watchedKindergartenId = watch("kindergartenId");

  useEffect(() => {
    reset({
      firstName: child.firstName ?? "",
      lastName: child.lastName ?? "",
      birthday: formatDateForBackend(child.birthday),
      kindergartenId: kindergartenId,
      groupId: child.groupId ?? "",
    });
  }, [child, kindergartenId, reset]);

  const onSubmit: SubmitHandler<ChildEditFormValues> = (data) => {
    if (!child?.uuid) return;

    const payload: UpdateChildDTO = {
      firstName: data.firstName,
      lastName: data.lastName,
      birthday: data.birthday,
      groupId: data.groupId,
    };

    onSave(child.uuid, payload);
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
          type="date"
          {...register("birthday", {
            required: "Geburtsdatum ist erforderlich",
          })}
          errorMessage={errors.birthday?.message}
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
              disabled
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

type BackendLocalDate = `${number}-${number}-${number}`;

function formatDateForBackend(
  inputDate: string | null,
): BackendLocalDate | null {
  if (!inputDate) return null;

  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  return `${year}-${month}-${day}`;
}
