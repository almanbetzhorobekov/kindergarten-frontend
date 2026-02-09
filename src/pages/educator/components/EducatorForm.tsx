import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";
import { educatorAPI } from "../../../api/educatorService";

import {
  Box,
  Button,
  CardContent,
  Typography,
  Card,
  Stack,
} from "@mui/material";
import { CreateEducatorDTO, EducatorDTO } from "api/educator.type";
import { useEducatorApi } from "../api/EducatorApi";

type EducatorFormProps = {
  onAddEducator: (educator: CreateEducatorFormValues) => void;
};

type CreateEducatorFormValues = CreateEducatorDTO & {
  groupID: string;
};

export default function EducatorForm(props: EducatorFormProps) {
  const { onAddEducator } = props;

  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateEducatorFormValues>({
    defaultValues: {
      email: "",
      phoneNumber: "",
      firstName: "",
      birthday: new Date(),
      lastName: "",
      kindergartenId: "",
      groupID: "",
      addressDTO: {
        uuid: "",
        plz: "",
        street: "",
        houseNumber: "",
        city: "",
      },
    },
  });

  const { kindergartens, groups, createEducator } = useEducatorApi({ reset });

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
      queryClient.invalidateQueries({ queryKey: ["educators"] });
      reset();
    },
  });

  const onSubmit: SubmitHandler<CreateEducatorFormValues> = (data) => {
    mutation.mutate(data);
    if (mutation.isSuccess && onAddEducator) {
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
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />

              <FormInput
                label="Nachname"
                {...register("lastName", {
                  required: "Nachname ist erforderlich",
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />

              <FormInput
                type="date"
                {...register("birthday", {
                  required: "Geburtsdatum ist erforderlich",
                })}
                error={!!errors.birthday}
                helperText={errors.birthday?.message}
              />

              <Box>
                <Typography variant="subtitle1">Adresse</Typography>

                <Stack spacing={2} direction="row">
                  <FormInput
                    label="Straße"
                    {...register("addressDTO.street", {
                      required: "Straße ist erforderlich",
                    })}
                    error={!!errors.addressDTO?.street}
                    helperText={errors.addressDTO?.street?.message}
                  />

                  <FormInput
                    label="Nr."
                    {...register("addressDTO.houseNumber", {
                      required: "Hausnummer ist erforderlich",
                    })}
                    error={!!errors.addressDTO?.houseNumber}
                    helperText={errors.addressDTO?.houseNumber?.message}
                  />
                </Stack>

                <FormInput
                  label="PLZ"
                  {...register("addressDTO.plz", {
                    required: "PLZ ist erforderlich",
                  })}
                  error={!!errors.addressDTO?.plz}
                  helperText={errors.addressDTO?.plz?.message}
                />
              </Box>

              <FormInput
                label="Telefonnummer"
                {...register("phoneNumber", {
                  required: "Telefonnummer ist erforderlich",
                })}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
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
                name="groupID"
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
                    error={errors.groupID?.message}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={mutation.isPending}
                sx={{ alignSelf: "flex-start" }}
              >
                {mutation.isPending ? "Speichern..." : "Anmelden"}
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
