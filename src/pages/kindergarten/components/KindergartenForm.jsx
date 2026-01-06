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

export default function KindergartenForm() {
  const queryClient = useQueryClient();

  // GET
  const {
    data: kindergartens = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["kindergartens"],
    queryFn: kindergartenAPI.getAll,
  });

  // POST
  const mutation = useMutation({
    mutationFn: kindergartenAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["kindergartens"]);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const newKindergarten = {
      kindergartenName: formData.get("kindergartenName"),
      address: {
        street: formData.get("street"),
        houseNumber: formData.get("houseNumber"),
        plz: formData.get("plz"),
      },
    };

    mutation.mutate(newKindergarten);
    event.target.reset();
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

      {/* LISTE */}
      <Stack spacing={1} mt={4}>
        {kindergartens.map((kita) => (
          <Typography key={kita.id} variant="body2">
            <Box component="span" sx={{ fontWeight: 600 }}>
              {kita.kindergartenName}
            </Box>{" "}
            — {kita.address?.street} {kita.address?.houseNumber},{" "}
            {kita.address?.plz}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}
