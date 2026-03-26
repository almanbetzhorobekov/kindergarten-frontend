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
import { CreateKindergartenDTO } from "api/kindergarten.type";
import { CreateAddressDTO } from "api/address.type";
import { useKindergartenApi } from "../api/KindergartenApi";

export default function KindergartenForm() {
  const { createMutation } = useKindergartenApi();

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
      address,
    };

    createMutation.mutate(newKindergarten);
    event.currentTarget.reset();
  };

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
                name="kindergartenName"
                label="Kindergartenname"
                required
              />
              <Divider />
              <Stack spacing={2}>
                <FormInput name="street" label="Straße" required />
                <FormInput name="houseNumber" label="Hausnummer" required />
                <FormInput name="plz" label="PLZ" required />
                <FormInput name="city" label="Stadt" required />
              </Stack>
              <Button
                type="submit"
                variant="contained"
                disabled={createMutation.isPending}
              >
                Erstellen
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
