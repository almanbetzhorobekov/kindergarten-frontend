import { useForm, Controller, SubmitHandler } from "react-hook-form";
import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";
import { handleCreateChildSubmit } from "../lib/childForm.handlers";

import {
  Box,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import {
  QUERY_KEY_CHILDREN,
  useChildApi,
  usePostCreateChild,
} from "../api/ChildApi";
import {
  CreateChildFormValues,
  ChildFormProps,
  CreateChildDTO,
} from "api/child.type";
import {
  filterGroupsByKindergarten,
  mapKindergartensToOptions,
} from "../lib/childForm.utils";
import { queryClient } from "App";

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

  const { kindergartens, groups } = useChildApi({ reset });
  const { mutate, isPending, isError } = usePostCreateChild();

  const selectedKindergartenId = watch("kindergartenId");

  const kindergartenOptions = mapKindergartensToOptions(kindergartens);

  const filteredGroupOptions = filterGroupsByKindergarten(
    groups,
    selectedKindergartenId,
  );

  //const onSubmit = handleCreateChildSubmit(createChild, onAddChild);
  const onSubmit: SubmitHandler<CreateChildDTO> = (data) => {
    console.log(onSubmit.name);

    mutate(data, {
      onSuccess: (newChild) => {
        if (onAddChild) onAddChild(newChild);
        console.log("onSuccess", data);
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_CHILDREN],
        });
        reset();
      },
      onError: (error) => {
        console.error("Fehler beim neu Kind Erstellen: ", error);
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
                disabled={isPending}
                sx={{ alignSelf: "flex-start" }}
              >
                {isPending ? "Speichern..." : "Anmelden"}
              </Button>

              {isError && (
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
