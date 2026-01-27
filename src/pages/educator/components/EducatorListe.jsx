import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  Pagination,
  Divider,
} from "@mui/material";

import { useEducatorApi } from "../api/EducatorApi";
import { useQuery } from "@tanstack/react-query";
import { groupAPI } from "../../../api/groupService";

export default function EducatorList() {
  const [page, setPage] = useState(1);
  const { educators, isLoading, error, deleteMutation } = useEducatorApi({
    page,
  });

  const { data: groups = [] } = useQuery({
    queryKey: ["groups"],
    queryFn: groupAPI.getAll,
  });

  if (isLoading) return <Typography sx={{ p: 3 }}>Lädt...</Typography>;
  if (error) return <Typography color="error">Fehler beim Laden</Typography>;

  const educatorItems =
    educators?.content ?? (Array.isArray(educators) ? educators : []);
  const pageCount = educators?.totalPages ?? 0;

  const getGroupName = (id) =>
    groups.find((g) => g.uuid === id)?.groupName || "Unbekannt";

  return (
    <Box component="section">
      <Typography variant="h6" gutterBottom>
        Erzieherliste
      </Typography>

      <Stack spacing={2}>
        {educatorItems.map((educator) => (
          <Card key={educator.uuid}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography>
                  {educator.firstName} {educator.lastName}
                </Typography>

                <Typography color="text.secondary">
                  {educator.groupIds && educator.groupIds.length > 0
                    ? `Gruppen: ${educator.groupIds.map(getGroupName).join(", ")}`
                    : "Keine Gruppen zugewiesen"}
                </Typography>

                <Divider sx={{ my: 1, width: "100%" }} />

                <Typography>
                  <strong>E-Mail:</strong> {educator.email || "---"}
                </Typography>
                <Typography>
                  <strong>Tel:</strong> {educator.phoneNumber || "---"}
                </Typography>

                {educator.addressDTO && (
                  <Typography>
                    <strong>Adresse:</strong> {educator.addressDTO.street}{" "}
                    {educator.addressDTO.houseNumber},{" "}
                    {educator.addressDTO.city}
                  </Typography>
                )}
              </Box>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleEdit(educator)}
                >
                  Bearbeiten
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => handleDelete(educator)}
                >
                  Löschen
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {pageCount > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, v) => setPage(v)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}
