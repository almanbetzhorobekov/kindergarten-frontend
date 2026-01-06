import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";
import { educatorAPI } from "../../../api/educatorService";
import { groupAPI } from "../../../api/groupService";

import {
  Box,
  Button,
  CardContent,
  Typography,
  Card,
  Stack,
} from "@mui/material";

export default function EducatorForm(onAddEducator) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const { data: kindergartens = [] } = useQuery({
    queryKey: ["kindergartens"],
    queryFn: kindergartenAPI.getAll,
  });

  const { data: groups = [] } = useQuery({
    queryKey: ["groups"],
    queryFn: groupAPI.getAll,
  });

  const selectedKindergartenId = watch("kindergartenId");

  const kindergartenOptions = kindergartens.map((k) => ({
    value: k.uuid,
    label: k.kindergartenName,
  }));

  const filteredGroupOptions = groups
    .filter((g) => g.kindergartenId === selectedKindergartenId)
    .map((g) => ({
      value: g.uuid,
      label: g.groupName,
    }));

  const mutation = useMutation({
    mutationFn: educatorAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["educators"]);
      reset();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
    if (onAddEducator) {
      onAddEducator(data);
    }
  };

  return (
    <Box component={"section"}>
      <Card sx={{ mb: 4 }} elevation={5}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <FormInput
                label="Vorname"
                {...register("firstName", {
                  required: "Vorname ist erforderlich",
                })}
                error={errors.firstName?.message}
              />

              <FormInput
                label="Nachname"
                {...register("lastName", {
                  required: "Nachname ist erforderlich",
                })}
                error={errors.lastName?.message}
              />

              <FormInput
                type="date"
                {...register("birthday", {
                  required: "Geburtsdatum ist erforderlich",
                })}
                error={errors.birthday?.message}
              />

              <Box>
                <Typography variant="subtitle1">Adresse</Typography>

                <Stack spacing={2} direction="row">
                  <FormInput
                    label="Straße"
                    {...register("street", {
                      required: "Straße ist erforderlich",
                    })}
                    error={errors.street?.message}
                  />

                  <FormInput
                    label="Nr."
                    {...register("houseNumber", {
                      required: "Hausnummer ist erforderlich",
                    })}
                    error={errors.houseNumber?.message}
                  />
                </Stack>

                <FormInput
                  label="PLZ"
                  {...register("plz", { required: "PLZ ist erforderlich" })}
                  error={errors.plz?.message}
                />
              </Box>

              <FormInput
                label="Telefonnummer"
                {...register("phone", {
                  required: "Telefonnummer ist erforderlich",
                })}
                error={errors.phone?.message}
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
                rules={{
                  required: "Gruppe auswählen",
                }}
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
                disabled={mutation.isLoading}
                sx={{ alignSelf: "flex-start" }}
              >
                {mutation.isLoading ? "Speichern..." : "Anmelden"}
              </Button>

              {mutation.isError && (
                <Typography style={{ color: "red " }}>
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
