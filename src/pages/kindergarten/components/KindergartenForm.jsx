import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { kindergartenAPI } from "../../../api/kindergartenService";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
  Autocomplete,
  TextField,
  CircularProgress,
} from "@mui/material";
import FormInput from "../../../components/FormInput";

export default function KindergartenForm() {
  const queryClient = useQueryClient();
  const [cityQuery, setCityQuery] = useState("");
  const [plz, setPlz] = useState("");

  const mutation = useMutation({
    mutationFn: kindergartenAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kindergartens"] });
    },
  });

  const { data: cities = [], isFetching } = useQuery({
    queryKey: ["cities", cityQuery, plz],
    queryFn: async () => {
      if (!cityQuery && !plz) return [];
      const param = cityQuery ? `query=${cityQuery}` : `postal_code=${plz}`;
      const res = await fetch(
        `http://localhost:8080/api/address/cities?${param}`
      );
      const data = await res.json();
      return data?.cities || [];
    },
    enabled: !!cityQuery || !!plz,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    mutation.mutate({
      kindergartenName: form.get("kindergartenName"),
      address: {
        street: form.get("street"),
        houseNumber: form.get("houseNumber"),
        plz: form.get("plz"),
        city: form.get("city"),
      },
    });

    e.target.reset();
    setCityQuery("");
    setPlz("");
  };

  return (
    <Card elevation={5}>
      <CardContent>
        <Typography variant="h5" mb={2}>
          Neuen Kindergarten erstellen
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormInput
              name="kindergartenName"
              label="Kindergartenname"
              required
            />

            <Divider />

            <FormInput name="street" label="Straße" required />
            <FormInput name="houseNumber" label="Hausnummer" required />

            <FormInput
              name="plz"
              label="PLZ"
              value={plz}
              onChange={(e) => setPlz(e.target.value)}
              required
            />

            <Autocomplete
              options={cities.map((c) => c.cityName)}
              loading={isFetching}
              onInputChange={(e, value) => setCityQuery(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ort"
                  name="city"
                  required
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isFetching && <CircularProgress size={20} />}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />

            <Button type="submit" variant="contained">
              Erstellen
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
