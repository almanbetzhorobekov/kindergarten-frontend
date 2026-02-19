import { useForm, Controller, SubmitHandler } from "react-hook-form";
import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";
import {
  Box,
  Button,
  CardContent,
  Typography,
  Card,
  Stack,
} from "@mui/material";
import { CreateEducatorDTO } from "api/educator.type";
import { useEducatorApi } from "../api/EducatorApi";

import {
  filterGroupsByKindergarten,
  mapKindergartensToOptions,
} from "pages/child/lib/childForm.utils";
import { handleCreateEducatorSubmit } from "../lib/educatorForm.handlers";

type EducatorFormProps = {
  onAddEducator?: (educator: any) => void;
};

type CreateEducatorFormValues = CreateEducatorDTO & {
  groupID: string;
};

export default function EducatorForm({ onAddEducator }: EducatorFormProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateEducatorFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      birthday: "",
      kindergartenId: "",
      groupID: "",
      addressDTO: {
        plz: "",
        street: "",
        houseNumber: "",
        city: "",
      },
    },
  });

  const { kindergartens, groups, createEducator } = useEducatorApi({ reset });

  const selectedKindergartenId = watch("kindergartenId");

  const kindergartenOptions = mapKindergartensToOptions(kindergartens);

  const filteredGroupOptions = filterGroupsByKindergarten(
    groups,
    selectedKindergartenId,
  );

  const onSubmit = handleCreateEducatorSubmit(createEducator, onAddEducator);

  return (
    <Box component="section">
      <Card sx={{ mb: 4 }} elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Erzieher anmelden
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={2}>
                <FormInput
                  label="Vorname"
                  register={register("firstName", { required: "Pflichtfeld" })}
                  errorMessage={errors.firstName?.message}
                />
                <FormInput
                  label="Nachname"
                  register={register("lastName", { required: "Pflichtfeld" })}
                  errorMessage={errors.lastName?.message}
                />
              </Stack>

              <FormInput
                label="Geburtsdatum"
                type="date"
                InputLabelProps={{ shrink: true }}
                register={register("birthday", { required: "Pflichtfeld" })}
                errorMessage={errors.birthday?.message}
              />

              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Adresse
                </Typography>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2}>
                    <FormInput
                      label="Straße"
                      register={register("addressDTO.street", {
                        required: "Pflichtfeld",
                      })}
                      errorMessage={errors.addressDTO?.street?.message}
                    />
                    <FormInput
                      label="Nr."
                      register={register("addressDTO.houseNumber", {
                        required: "Pflichtfeld",
                      })}
                      errorMessage={errors.addressDTO?.houseNumber?.message}
                    />
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <FormInput
                      label="PLZ"
                      register={register("addressDTO.plz", {
                        required: "Pflichtfeld",
                      })}
                      errorMessage={errors.addressDTO?.plz?.message}
                    />
                    <FormInput
                      label="Stadt"
                      register={register("addressDTO.city", {
                        required: "Pflichtfeld",
                      })}
                      errorMessage={errors.addressDTO?.city?.message}
                    />
                  </Stack>
                </Stack>
              </Box>

              <FormInput
                label="Email"
                type="email"
                register={register("email", { required: "Pflichtfeld" })}
                errorMessage={errors.email?.message}
              />

              <FormInput
                label="Telefonnummer"
                register={register("phoneNumber", { required: "Pflichtfeld" })}
                errorMessage={errors.phoneNumber?.message}
              />

              <Controller
                name="kindergartenId"
                control={control}
                rules={{ required: "Auswählen" }}
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
                rules={{ required: "Auswählen" }}
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
                color="primary"
                disabled={createEducator.isPending}
                sx={{ py: 1.5 }}
              >
                {createEducator.isPending
                  ? "Speichern..."
                  : "Erzieher Anmelden"}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
