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
} from "@mui/material";

const pageSize = 6;

export default function GroupList() {
  const [setEditGroup, editGroup] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [page, setPage] = useState(1);

  const {
    data: groups = [],
    isLoading,
    error,
    updateMutation,
    deleteMutation,
  } = useGroupApi({});

  if (isLoading) return <Typography>Lädt Gruppen...</Typography>;
  if (error) return <Typography color="error">Fehler beim Laden!</Typography>;

  const sortedGroups = [...groups].sort((a, b) => {
    if (a.kindergartenName < b.kindergartenName) return -1;
    if (a.kindergartenName > b.kindergartenName) return 1;
    if (a.groupName < b.groupName) return -1;
    if (a.groupName > b.groupName) return 1;
    return 0;
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
    if (window.confirm(`Group "${group.groupName}" wirklich löschen?`)) {
      await deleteMutation.mutateAsync(group.uuid);
    }
  };

  const handleSaveEdit = async (uuid, data) => {
    await updateMutation.mutateAsync({ uuid, data });
    setEditGroup(null);
    setOpenEdit(false);
  };

  return (
    <Box component="section">
      <Typography variant="h4" mb={3}>
        Gruppenübersicht
      </Typography>

      {paginatedGroups.map((group) => (
        <Paper key={group.uuid} elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1">{group.groupName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {group.kindergartenName || "Unbekannt"}
          </Typography>
        </Paper>
      ))}

      {totalPages > 1 && (
        <Pagination
          sx={{ mt: 3 }}
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
        <DialogTitle>Group bearbeiten</DialogTitle>
        <DialogContent>
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
