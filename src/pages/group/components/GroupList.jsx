import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "../../../api/groupService";
import {
  Box,
  Button,
  Typography,
  Pagination,
  Divider,
  Paper,
} from "@mui/material";

export default function GroupList() {
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const {
    data: groups = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
  });

  if (isLoading) return <Typography>Lädt Gruppen...</Typography>;
  if (error) return <Typography color="error">Fehler beim Laden!</Typography>;

  // 🔹 Pagination (frontend)
  const totalPages = Math.ceil(groups.length / pageSize);
  const paginatedGroups = groups.slice((page - 1) * pageSize, page * pageSize);

  // 🔹 Gruppировка
  const groupedByKindergarten = paginatedGroups.reduce((acc, group) => {
    const kitaName = group.kindergartenName || "Unbekannt";

    if (!acc[kitaName]) acc[kitaName] = [];
    acc[kitaName].push(group);

    return acc;
  }, {});

  return (
    <Box component="section">
      <Typography variant="h4" mb={3}>
        Gruppenübersicht
      </Typography>

      {Object.entries(groupedByKindergarten).map(
        ([kindergarten, groupList]) => (
          <Paper key={kindergarten} elevation={1} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" mb={1}>
              {kindergarten}
            </Typography>

            <Divider sx={{ mb: 1 }} />

            {groupList.map((group) => (
              <Typography key={group.uuid} sx={{ ml: 1 }}>
                {group.groupName}
              </Typography>
            ))}
          </Paper>
        )
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          sx={{ mt: 3 }}
          page={page}
          count={totalPages}
          onChange={(e, value) => setPage(value)}
        />
      )}

      {/* Reload */}
      <Box mt={2}>
        <Button variant="outlined" onClick={() => refetch()}>
          Gruppen neu laden
        </Button>
      </Box>
    </Box>
  );
}
