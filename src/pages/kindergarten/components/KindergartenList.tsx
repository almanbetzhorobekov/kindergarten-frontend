import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { kindergartenAPI } from "../../../api/kindergartenService";
import { Box, Typography, Paper, Divider, Button, Stack } from "@mui/material";
import { KindergartenDTO } from "api/kindergarten.type";

export default function KindergartenList() {
  const queryClient = useQueryClient();

  const {
    data: kindergartens = [],
    isLoading,
    error,
    refetch,
  } = useQuery<KindergartenDTO[]>({
    queryKey: ["kindergartens"],
    queryFn: kindergartenAPI.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => kindergartenAPI.delete(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kindergartens"],
      });
    },
  });

  const handleDelete = (uuid: string) => {
    deleteMutation.mutate(uuid);
  };

  if (isLoading) return <Typography>Lädt Kindergärten...</Typography>;
  if (error) return <Typography color="error">Fehler beim Laden!</Typography>;

  return (
    <Box component="section">
      <Typography variant="h4" mb={3}>
        Kindergarten Übersicht
      </Typography>

      <Stack spacing={3}>
        {kindergartens.map((kita) => (
          <Paper key={kita.uuid} elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6">{kita.kindergartenName}</Typography>

            <Divider sx={{ my: 1 }} />

            <Typography variant="body2">
              {kita.address?.street} {kita.address?.houseNumber}
            </Typography>

            <Typography variant="body2">
              {kita.address?.plz} {kita.address?.city}
            </Typography>

            <Typography variant="body2" sx={{ mt: 1 }}>
              Gruppen: {kita.groups?.length ?? 0}
            </Typography>

            <Typography variant="body2">
              Erzieher: {kita.educators?.length ?? 0}
            </Typography>

            <Box mt={2}>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleDelete(kita.uuid)}
              >
                Delete
              </Button>
            </Box>
          </Paper>
        ))}
      </Stack>

      <Box mt={3}>
        <Button variant="outlined" onClick={() => refetch()}>
          Neu laden
        </Button>
      </Box>
    </Box>
  );
}
