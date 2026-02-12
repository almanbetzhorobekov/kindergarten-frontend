import { useForm, Controller, SubmitHandler } from "react-hook-form";
import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";

import {
  Box,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { useChildApi } from "../api/ChildApi";
import { ChildDTO, CreateChildDTO } from "api/child.type";

type ChildFormProps = {
  onAddChild: (child: ChildDTO) => void;
};

type CreateChildFormValues = CreateChildDTO & {
  kindergartenId: string;
};

export default function ChildForm(props: ChildFormProps) {
  const { onAddChild } = props;

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateChildFormValues>({
    defaultValues: {
      groupId: "",
      birthday: "",
      firstName: "",
      lastName: "",
      parentsId: [],
      kindergartenId: "",
    },
  });

  const { kindergartens, groups, createChild } = useChildApi({ reset });

  const selectedKindergartenId = watch("kindergartenId");

  const kindergartenOptions = kindergartens.map((k) => ({
    value: k.uuid,
    label: k.kindergartenName,
  }));

  const filteredGroupOptions = groups
    .filter((g) => g.kindergartenId === selectedKindergartenId)
    .map((g) => ({ value: g.uuid, label: g.groupName }));

  const onSubmit: SubmitHandler<CreateChildDTO> = (data) => {
    createChild.mutate(data, {
      onSuccess: (newChild) => {
        if (onAddChild) onAddChild(newChild);
      },
    });
  };

  return (
    <Box component="section">
      <Typography variant="h6" gutterBottom>
        Neuen Kinder anmelden
      </Typography>

      <Card sx={{ mb: 4 }} elevation={5}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <FormInput
                label="Vorname"
                {...register("firstName", {
                  required: "Vorname ist erforderlich",
                })}
                errorMessage={errors.firstName?.message}
              />

              <FormInput
                label="Nachname"
                {...register("lastName", {
                  required: "Nachname ist erforderlich",
                })}
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

              <Button
                type="submit"
                variant="contained"
                disabled={createChild?.isPending}
                sx={{ alignSelf: "flex-start" }}
              >
                {createChild?.isPending ? "Speichern..." : "Anmelden"}
              </Button>

              {createChild?.isError && (
                <Typography sx={{ color: "red" }}>
                  Fehler beim Speichern
                </Typography>
              )}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
