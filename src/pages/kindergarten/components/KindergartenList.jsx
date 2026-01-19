import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { kindergartenAPI } from "../../../api/kindergartenService";
import {
  Box,
  Typography,
  Pagination,
  Divider,
  Stack,
  Button,
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
    <Box component="section">
      <Typography variant="h6" gutterBottom>
        Kindergärten Übersicht
      </Typography>

      <Stack spacing={2}>
        {visible.map((kindergarten) => (
          <Card key={kindergarten.uuid} sx={{ p: 2 }}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h6">
                  Kindergarten: {kindergarten.kindergartenName}
                </Typography>

                <Divider sx={{ my: 1 }} />
                <Typography variant="body2">
                  Address:
                  {kindergarten.address?.street}{" "}
                  {kindergarten.address?.houseNumber},{" "}
                  {kindergarten.address?.plz} {kindergarten.address?.city}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleEdit(child)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => handleDelete(child)}
                >
                  Delete
                </Button>
              </Stack>
            </CardContent>
          </Card>
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
