import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";
import { educatorAPI } from "../../../api/educatorService";
import { groupAPI } from "../../../api/groupService";
import { kindergartenAPI } from "../../../api/kindergartenService";

import {
  Box,
  Button,
  CardContent,
  Typography,
  Card,
  Stack,
} from "@mui/material";

export default function EducatorForm({ onAddEducator }) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      addressDTO: {},
    },
  });

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
    onSuccess: (newEducator) => {
      queryClient.invalidateQueries(["educators"]);
      reset();
      if (onAddEducator) onAddEducator(newEducator);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      groupIds: data.groupId ? [data.groupId] : [],
    };
    mutation.mutate(payload);
  };

  return (
    <Box component="section">
      <Typography variant="h6" gutterBottom>
        Erzieher anmelden
      </Typography>

      <Card sx={{ mb: 4 }} elevation={5}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              {/* Данные пользователя */}
              <FormInput
                label="Vorname"
                {...register("firstName", { required: "Pflichtfeld" })}
                error={errors.firstName?.message}
              />
              <FormInput
                label="Nachname"
                {...register("lastName", { required: "Pflichtfeld" })}
                error={errors.lastName?.message}
              />
              <FormInput
                type="date"
                {...register("birthday", { required: "Pflichtfeld" })}
                error={errors.birthday?.message}
              />

              {/* Адресный блок */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Adresse
                </Typography>
                <Stack spacing={2} direction="row">
                  <FormInput
                    label="Straße"
                    {...register("addressDTO.street", {
                      required: "Pflichtfeld",
                    })}
                    error={errors.addressDTO?.street?.message}
                  />
                  <FormInput
                    label="Nr."
                    {...register("addressDTO.houseNumber", {
                      required: "Pflichtfeld",
                    })}
                    error={errors.addressDTO?.houseNumber?.message}
                  />
                </Stack>
              </Box>

              {/* Контакты */}
              <FormInput
                label="Email"
                {...register("email", {
                  required: "Pflichtfeld",
                  pattern: { value: /^\S+@\S+$/i, message: "Ungültige E-Mail" },
                })}
                error={errors.email?.message}
              />
              <FormInput
                label="Telefonnummer"
                {...register("phoneNumber", { required: "Pflichtfeld" })}
                error={errors.phoneNumber?.message}
              />

              {/* Выбор организации */}
              <Controller
                name="kindergartenId"
                control={control}
                rules={{ required: "Kindergarten auswählen" }}
                render={({ field }) => (
                  <FormSelect
                    label="Kindergarten"
                    options={kindergartenOptions}
                    {...field}
                    error={errors.kindergartenId?.message}
                  />
                )}
              />

              <Controller
                name="groupId"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    label="Gruppe"
                    options={filteredGroupOptions}
                    {...field}
                    disabled={!selectedKindergartenId}
                    error={errors.groupId?.message}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Speichern..." : "Erzieher speichern"}
              </Button>

              {mutation.isError && (
                <Typography
                  variant="body2"
                  sx={{ color: "error.main", textAlign: "center" }}
                >
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
