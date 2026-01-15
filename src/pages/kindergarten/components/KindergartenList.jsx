import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { kindergartenAPI } from "../../../api/kindergartenService";
import {
  Box,
  Typography,
  Pagination,
  Divider,
  Paper,
  Stack,
} from "@mui/material";

const pageSize = 6;

export default function KindergartenList() {
  const [page, setPage] = useState(1);

  const {
    data: kindergartens = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["kindergartens"],
    queryFn: kindergartenAPI.getAll,
  });

  if (isLoading) return <Typography>Lädt Kindergärten...</Typography>;
  if (error) return <Typography color="error">Fehler beim Laden</Typography>;

  const totalPages = Math.ceil(kindergartens.length / pageSize);
  const visible = kindergartens.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Box mt={4}>
      <Typography variant="h4" mb={3}>
        Kindergärten Übersicht
      </Typography>

      <Stack spacing={2}>
        {visible.map((kita) => (
          <Paper key={kita.id ?? kita.uuid} sx={{ p: 2 }}>
            <Typography variant="h6">
              Kindergarten: {kita.kindergartenName}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography variant="body2">
              Address:
              {kita.address?.street} {kita.address?.houseNumber},{" "}
              {kita.address?.plz} {kita.address?.city}
            </Typography>
          </Paper>
        ))}
      </Stack>

      {totalPages > 1 && (
        <Pagination
          sx={{ mt: 3 }}
          page={page}
          count={totalPages}
          color="primary"
          onChange={(e, value) => setPage(value)}
        />
      )}
    </Box>
  );
}
