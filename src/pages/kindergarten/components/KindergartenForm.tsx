import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { kindergartenAPI } from "../../../api/kindergartenService";

import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";

import FormInput from "../../../components/FormInput";
import { CreateKindergartenDTO, KindergartenDTO } from "api/kindergarten.type";
import { CreateAddressDTO } from "api/address.type";

type KindergartenFormProps = {
  onAddKindergarten: (kindergarten: KindergartenDTO) => void;
};

export default function KindergartenForm(props: KindergartenFormProps) {
  const queryClient = useQueryClient();

  const { onAddKindergarten } = props;

  const {
    data: kindergartens = [],
    isLoading,
    error,
  } = useQuery<KindergartenDTO[]>({
    queryKey: ["kindergartens"],
    queryFn: kindergartenAPI.getAll,
  });

  const mutation = useMutation<void, Error, CreateKindergartenDTO>({
    mutationFn: kindergartenAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kindergartens"],
      });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const address: CreateAddressDTO = {
      street: formData.get("street") as string,
      houseNumber: formData.get("houseNumber") as string,
      plz: formData.get("plz") as string,
      city: formData.get("city") as string,
    };

    const newKindergarten: CreateKindergartenDTO = {
      kindergartenName: formData.get("kindergartenName") as string,
      address: address,
    };
    mutation.mutate(newKindergarten);

    event.currentTarget.reset();
  };

  if (isLoading) return <Typography>Lädt...</Typography>;
  if (error) return <Typography>Fehler beim Laden der Kindergärten</Typography>;

  return (
    <Box component="section">
      <Typography variant="h4" mb={2}>
        Neuen Kindergarten erstellen
      </Typography>

      <Card elevation={5}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <FormInput
                type="text"
                name="kindergartenName"
                label="Kindergartenname"
                required
              />

              <Divider />

              <Stack spacing={2}>
                <FormInput type="text" name="street" label="Straße" required />

                <FormInput
                  type="text"
                  name="houseNumber"
                  label="Hausnummer"
                  required
                />

                <FormInput type="text" name="plz" label="PLZ" required />

                <FormInput type="text" name="city" label="Stadt" required />
              </Stack>

              <Button
                type="submit"
                variant="contained"
                sx={{ alignSelf: "flex-start" }}
              >
                Erstellen
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      <Stack spacing={1} mt={4}>
        {kindergartens.map((kita) => (
          <Typography key={kita.uuid} variant="body2">
            <Box component="span" sx={{ fontWeight: 600 }}>
              {kita.kindergartenName}
            </Box>{" "}
            — {kita.address?.street} {kita.address?.houseNumber},{" "}
            {kita.address?.plz} {kita.address?.city}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}
