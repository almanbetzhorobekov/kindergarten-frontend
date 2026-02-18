import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Stack } from "@mui/material";
import FormInput from "../../../components/FormInput";
import {
  GroupEditFormProps,
  GroupEditFormValues,
  mapFormToUpdateGroup,
} from "./mapGroupToUpdates";

export default function GroupEditForm({
  group,
  onSave,
  onCancel,
}: Omit<GroupEditFormProps, "kindergartens" | "educators">) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupEditFormValues>({
    defaultValues: {
      groupName: group.groupName,
    },
  });

  useEffect(() => {
    reset({
      groupName: group.groupName ?? "",
    });
  }, [group, reset]);

  const onSubmit: SubmitHandler<GroupEditFormValues> = (data) => {
    onSave(group.uuid, mapFormToUpdateGroup(data));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ pt: 1.5 }}
    >
      <Stack spacing={3}>
        <FormInput
          label="Gruppenname"
          //
          {...register("groupName", { required: "Name erforderlich" })}
          errorMessage={errors.groupName?.message}
          fullWidth
        />

        <Stack direction="row" spacing={2} pt={1}>
          <Button
            type="submit"
            variant="contained"
            sx={{ fontWeight: "bold", textTransform: "none", px: 4 }}
          >
            Speichern
          </Button>
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{ textTransform: "none", px: 4 }}
          >
            Abbrechen
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
