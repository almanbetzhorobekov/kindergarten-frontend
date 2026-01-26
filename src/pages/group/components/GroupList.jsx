import { useState } from "react";
import { useGroupApi } from "../api/GroupApi";
import GroupEditForm from "./GroupEditForm";
import {
  Box,
  Typography,
  Pagination,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Button,
} from "@mui/material";

const pageSize = 6;

export default function GroupList() {
  const [editGroup, setEditGroup] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [page, setPage] = useState(1);

  const {
    groups = [],
    isLoading,
    error,
    updateMutation,
    deleteMutation,
  } = useGroupApi();

  if (isLoading) return <Typography sx={{ p: 3 }}>Lädt Gruppen...</Typography>;
  if (error)
    return (
      <Typography color="error" sx={{ p: 3 }}>
        Fehler beim Laden!
      </Typography>
    );

  const sortedGroups = [...groups].sort((a, b) => {
    const kitaA = a.kindergartenName || "";
    const kitaB = b.kindergartenName || "";

    const kitaComparison = kitaA.localeCompare(kitaB);

    if (kitaComparison !== 0) {
      return kitaComparison;
    }

    const groupA = a.groupName || "";
    const groupB = b.groupName || "";

    return groupA.localeCompare(groupB);
  });

  const totalPages = Math.ceil(sortedGroups.length / pageSize);
  const paginatedGroups = sortedGroups.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const handleEdit = (group) => {
    setEditGroup(group);
    setOpenEdit(true);
  };

  const handleDelete = async (group) => {
    if (window.confirm(`Gruppe "${group.groupName}" wirklich löschen?`)) {
      try {
        await deleteMutation.mutateAsync(group.uuid);
      } catch (e) {
        console.error("Löschen fehlgeschlagen", e);
      }
    }
  };

  const handleSaveEdit = (uuid, data) => {
    updateMutation.mutate({ uuid, data });

    setOpenEdit(false);
    setEditGroup(null);
  };

  return (
    <Box component="section" sx={{ p: 2 }}>
      <Typography variant="h4" mb={3}>
        Gruppenübersicht
      </Typography>

      {paginatedGroups.length > 0 ? (
        paginatedGroups.map((group) => (
          <Paper
            key={group.uuid}
            elevation={2}
            sx={{
              p: 2,
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {group.groupName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {group.kindergartenName || "Kein Kindergarten zugewiesen"}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleEdit(group)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={() => handleDelete(group)}
              >
                Delete
              </Button>
            </Stack>
          </Paper>
        ))
      ) : (
        <Typography color="text.secondary">Keine Gruppen vorhanden.</Typography>
      )}

      {totalPages > 1 && (
        <Pagination
          sx={{ mt: 3, display: "flex", justifyContent: "center" }}
          page={page}
          count={totalPages}
          color="primary"
          onChange={(e, value) => setPage(value)}
        />
      )}

      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Gruppe bearbeiten</DialogTitle>
        <DialogContent dividers>
          {editGroup && (
            <GroupEditForm
              group={editGroup}
              onSave={handleSaveEdit}
              onCancel={() => setOpenEdit(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
