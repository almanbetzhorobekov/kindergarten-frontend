import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchKindergartens,
  createKindergarten,
} from "../../../api/kindergartenService";
import { Box, Button, Typography } from "@mui/material";
import FormInput from "../../../components/FormInput";

export default function KindergartenForm() {
  const queryClient = useQueryClient();
  //GET
  const {
    data: kindergartens = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["kindergartens"],
    queryFn: fetchKindergartens,
  });
  //POST
  const mutation = useMutation({
    mutationFn: createKindergarten,
    onSuccess: () => {
      // обновляем кеш, чтобы новые данные появились сразу
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
    <Box component={"section"}>
      <Typography variant="h2">Neuen Kindergarten erstellen</Typography>

      <Box component={"form"} onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="kindergartenName"
          label="Kindergartenname"
          required
        />
        <fieldset>
          <FormInput type="text" name="street" label="Straße" required />
          <FormInput
            type="text"
            name="houseNumber"
            label="Hausnummer"
            required
          />
          <FormInput type="text" name="plz" placeholder="PLZ" required />
        </fieldset>

        <Button type="submit">Erstellen</Button>
      </Box>

      <Box>
        {kindergartens.map((kita, i) => (
          <Box key={i}>
            <Typography>
              <strong>{kita.name}</strong> — {kita.street} {kita.strNumber},{" "}
              {kita.plz}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
