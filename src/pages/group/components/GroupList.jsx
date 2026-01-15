import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { groupAPI } from "../../../api/groupService";
import { Box, Typography, Pagination, Divider, Paper } from "@mui/material";

const pageSize = 6;

export default function GroupList() {
  const [page, setPage] = useState(1);

  const {
    data: groups = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: groupAPI.getAll,
  });

  if (isLoading) return <Typography>Lädt Gruppen...</Typography>;
  if (error) return <Typography color="error">Fehler beim Laden!</Typography>;

  const totalPages = Math.ceil(groups.length / pageSize);
  const paginatedGroups = groups.slice((page - 1) * pageSize, page * pageSize);

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
          color="primary"
          onChange={(e, value) => setPage(value)}
        />
      )}
    </Box>
  );
}
