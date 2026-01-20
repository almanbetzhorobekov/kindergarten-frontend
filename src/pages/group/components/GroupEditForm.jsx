import { useForm } from "react-hook-form";
import { Box, Button, Stack } from "@mui/material";
import FormInput from "../../../components/FormInput";

export default function GroupEditForm({ group, onSave, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      groupName: group.groupName || "",
    },
  });

  const onSubmit = (data) => {
    if (!group?.uuid) return;

    const payload = {
      groupName: data.groupName,
    };

    onSave(group.uuid, payload);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 1 }}>
      <Stack spacing={2}>
        <FormInput
          label="Group Name"
          {...register("groupName", {
            required: "Name ist erforderlich",
          })}
          error={errors.groupName?.message}
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
