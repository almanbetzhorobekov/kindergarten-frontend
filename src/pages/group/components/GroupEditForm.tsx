import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Stack, MenuItem } from "@mui/material";
import FormInput from "../../../components/FormInput";
import FormSelect from "../../../components/FormSelect";
import {
  GroupEditFormProps,
  GroupEditFormValues,
  mapFormToUpdateGroup,
} from "pages/group/components/mapGroupToUpdates";

export default function GroupEditForm({
  group,
  kindergartens,
  educators,
  onSave,
  onCancel,
}: GroupEditFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupEditFormValues>({
    defaultValues: {
      groupName: group.groupName,
      kindergartenId: group.kindergartenId,
      educatorId: group.educatorId,
    },
  });

  const onSubmit: SubmitHandler<GroupEditFormValues> = (data) => {
    const updated = mapFormToUpdateGroup(data);
    onSave(group.uuid, updated);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormInput
          label="Gruppenname"
          {...register("groupName", {
            required: "Gruppenname ist erforderlich",
          })}
          errorMessage={errors.groupName?.message}
        />

        <FormSelect
          label="Kindergarten"
          {...register("kindergartenId", {
            required: "Kindergarten auswählen",
          })}
          options={kindergartens.map((k) => ({ value: k.uuid, label: k.name }))}
        />

        <FormSelect
          label="Erzieher"
          {...register("educatorId", { required: "Erzieher auswählen" })}
          options={educators.map((e) => ({ value: e.uuid, label: e.name }))}
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
