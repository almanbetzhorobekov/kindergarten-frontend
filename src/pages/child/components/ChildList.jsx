import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { ITEMS_PER_PAGE, useChildApi } from "../api/childApi";
import ChildEditForm from "./ChildEditForm";

export default function ChildList() {
  const [page, setPage] = useState(1);
  const [editChild, setEditChild] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const {
    children,
    error,
    isLoading,
    groups,
    kindergartens,
    updateMutation,
    deleteMutation,
    deactivateMutation,
    changeGroupMutation,
  } = useChildApi({ page });

  const getGroupName = (groupId) =>
    groups.find((g) => g.uuid === groupId)?.groupName || "-";

  if (isLoading) return <Typography>Lädt...</Typography>;
  if (error) return <Typography>Fehler beim Laden der Kinder</Typography>;

  const paginatedChildren = children.content ?? [];
  const pageCount = children?.totalPages ?? 0;

  const handleEdit = (child) => {
    setEditChild(child);
    setOpenEdit(true);
  };

  const handleDelete = async (child) => {
    if (window.confirm(`Kind ${child.firstName} wirklich löschen?`)) {
      await deleteMutation.mutateAsync(child.uuid);
    }
  };

  const handleDeactivate = async (child) => {
    if (window.confirm(`Kind ${child.firstName} inaktiv setzen?`)) {
      await deactivateMutation.mutateAsync(child.uuid);
    }
  };

  const handleChangeGroup = async (child, newGroupId) => {
    await changeGroupMutation.mutateAsync({
      uuid: child.uuid,
      groupId: newGroupId,
    });
  };

  const handleSaveEdit = async (uuid, data) => {
    await updateMutation.mutateAsync({ uuid, data });
    setOpenEdit(false);
  };

  return (
    <Box component="section">
      <Typography variant="h6" gutterBottom>
        Kinder Liste
      </Typography>

      {paginatedChildren.length === 0 ? (
        <Typography>Keine Kinder hinzugefügt.</Typography>
      ) : (
        <Stack spacing={2}>
          {paginatedChildren.map((child) => (
            <Card key={child.uuid}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography>
                    {child.firstName} {child.lastName}
                  </Typography>
                  <Typography color="text.secondary">
                    Gruppe: {getGroupName(child.groupId)}
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
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    onClick={() => handleDeactivate(child)}
                  >
                    Deactivate
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {pageCount > 1 && (
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}

      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Kind bearbeiten</DialogTitle>
        <DialogContent>
          {editChild && (
            <ChildEditForm
              child={editChild}
              groups={groups}
              kindergartens={kindergartens}
              onSave={handleSaveEdit}
              onCancel={() => setOpenEdit(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
