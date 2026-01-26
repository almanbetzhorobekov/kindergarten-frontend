import { useEffect } from "react";
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
      groupName: group?.groupName || "",
    },
  });

  const onSubmit = (data) => {
    if (!group?.uuid) return;
    onSave(group.uuid, data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 1 }}>
      <Stack spacing={2}>
        <FormInput
          label="Gruppenname"
          {...register("groupName", {
            required: "Name ist erforderlich",
          })}
          error={errors.groupName?.message}
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={onCancel}>
            Abbrechen
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Speichern
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
