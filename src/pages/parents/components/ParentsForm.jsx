import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";
import { parentsAPI } from "../../../api/parentsService";
import { childAPI } from "../../../api/childService";
import {
  Box,
  Card,
  Button,
  Typography,
  CardContent,
  Stack,
} from "@mui/material";

export default function ParentsForm({ onAddParent }) {
  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthday: "",
      phoneNumber: "",

      addressDTO: {
        street: "",
        houseNumber: "",
        plz: "",
        city: "",
      },
      childrenId: [],
    },
  });

  const { data, isLoading: isLoadingChildren } = useQuery({
    queryKey: ["children", "for-select"],
    queryFn: () => childAPI.getAll(0, 100),
  });

  const childOptions = (data?.content ?? []).map((c) => ({
    value: c.uuid,
    label: `${c.firstName} ${c.lastName}`,
  }));

  const mutation = useMutation({
    mutationFn: parentsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["parents"]);
      reset();
    },
  });

  const onSubmit = (formData) => {
    const payload = {
      ...formData,
      childrenId: Array.isArray(formData.childrenId)
        ? formData.childrenId
        : [formData.childrenId].filter(Boolean),
    };

    mutation.mutate(payload);
    if (onAddParent) onAddParent(payload);
  };

  return (
    <Box component="section">
      <Typography variant="h5" gutterBottom>
        Eltern anmelden
      </Typography>
      <Card sx={{ mb: 4 }} elevation={5}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
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

              <FormInput
                label="Telefonnummer"
                {...register("phoneNumber", { required: "Pflichtfeld" })}
                error={errors.phoneNumber?.message}
              />

              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Adresse
                </Typography>
                <Stack spacing={2}>
                  <Stack spacing={2} direction="row">
                    <FormInput
                      label="Straße"
                      {...register("addressDTO.street", {
                        required: "Pflichtfeld",
                      })}
                      error={errors.addressDTO?.street?.message}
                    />
                    <FormInput
                      label="Hausnummer"
                      {...register("addressDTO.houseNumber", {
                        required: "Pflichtfeld",
                      })}
                      error={errors.addressDTO?.houseNumber?.message}
                    />
                  </Stack>
                  <Stack spacing={2} direction="row">
                    <FormInput
                      label="PLZ"
                      {...register("addressDTO.plz", {
                        required: "Pflichtfeld",
                      })}
                      error={errors.addressDTO?.plz?.message}
                    />
                    <FormInput
                      label="Stadt"
                      {...register("addressDTO.city", {
                        required: "Pflichtfeld",
                      })}
                      error={errors.addressDTO?.city?.message}
                    />
                  </Stack>
                </Stack>
              </Box>

              <Controller
                name="childrenId"
                control={control}
                rules={{ required: "Kind auswählen" }}
                render={({ field }) => (
                  <FormSelect
                    label="Kind auswählen"
                    options={childOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.childrenId?.message}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Speichern..." : "Eltern speichern"}
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
