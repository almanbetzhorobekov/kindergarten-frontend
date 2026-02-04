import { useForm, Controller } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";

import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";

import { Box, Button, Stack } from "@mui/material";
import { useEffect, useRef } from "react";
import { ChildDTO, UpdateChildDTO } from "api/child.type";
import { GroupDTO } from "api/group.type";
import { KindergartenDTO } from "api/kindergarten.type";

type ChildEditFormValues = {
  firstName: string;
  lastName: string;
  birthday: string;
  kindergartenID: string;
  groupID: string;
};

type ChildEditFormProps = {
  child: ChildDTO;
  groups: GroupDTO[];
  kindergartens: KindergartenDTO[];
  onSave: (id: string, data: UpdateChildDTO) => void;
  onCancel: () => void;
};

export default function ChildEditForm({
  child,
  groups,
  kindergartens,
  onSave,
  onCancel,
}: ChildEditFormProps) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ChildEditFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthday: "",
      kindergartenID: "",
      groupID: "",
    },
    shouldUnregister: false,
  });

  const selectedKindergartenId = watch("kindergartenID");
  const isInitializing = useRef<boolean>(true);

  useEffect(() => {
    if (!child) return;

    reset({
      firstName: child.firstName ?? "",
      lastName: child.lastName ?? "",
      birthday: child.birthday
        ? child.birthday.toISOString().split("T")[0]
        : "",
      groupID: child.groupId ?? "",
    });

    isInitializing.current = true;
  }, [child, reset]);

  useEffect(() => {
    if (isInitializing.current) {
      isInitializing.current = false;
      return;
    }

    setValue("groupID", "");
  }, [selectedKindergartenId, setValue]);

  const filteredGroupOptions = isInitializing.current
    ? groups.map((g) => ({
        value: g.uuid,
        label: g.groupName,
      }))
    : groups
        .filter((g) => g.kindergartenId === selectedKindergartenId)
        .map((g) => ({
          value: g.uuid,
          label: g.groupName,
        }));

  const kindergartenOptions = kindergartens.map((k) => ({
    value: k.uuid,
    label: k.kindergartenName,
  }));

  const onSubmit: SubmitHandler<ChildEditFormValues> = (data) => {
    if (!child?.uuid) return;

    const payload: UpdateChildDTO = {
      ...data,
      birthday: new Date(data.birthday),
    };

    onSave(child.uuid, payload);
  };
  console.log("groupId from child:", child.groupId);
  console.log(
    "group options:",
    groups.map((g) => g.uuid),
  );

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
          name="kindergartenID"
          control={control}
          rules={{ required: "Kindergarten auswählen" }}
          render={({ field }) => (
            <FormSelect
              label="Kindergarten"
              options={kindergartenOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.kindergartenID?.message}
            />
          )}
        />

        <Controller
          name="groupID"
          control={control}
          rules={{ required: "Gruppe auswählen" }}
          render={({ field }) => (
            <FormSelect
              label="Gruppe"
              options={filteredGroupOptions}
              value={field.value}
              onChange={field.onChange}
              disabled={!selectedKindergartenId}
              error={errors.groupID?.message}
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
