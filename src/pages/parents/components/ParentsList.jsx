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

import { useParentApi } from "../api/ParentApi";
import ParentEditForm from "./ParentEditForm.jsx";

export default function ParentsList() {
  const [page, setPage] = useState(1);
  const [editParent, setEditParent] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const {
    parents = [],
    isLoading,
    error,
    updateMutation,
    deleteMutation,
  } = useParentApi({ page });

  if (isLoading) return <Typography sx={{ p: 3 }}>Lädt Eltern...</Typography>;
  if (error)
    return (
      <Typography color="error" sx={{ p: 3 }}>
        Fehler beim Laden
      </Typography>
    );

  const paginatedParents = parents?.content ?? [];
  const pageCount = parents?.totalPages ?? 0;

  const handleEdit = (parent) => {
    setEditParent(parent);
    setOpenEdit(true);
  };

  const handleDelete = async (parent) => {
    if (
      window.confirm(
        `Elternteil ${parent.firstName} ${parent.lastName} löschen?`,
      )
    ) {
      await deleteMutation.mutateAsync(parent.uuid);
    }
  };

  const handleSaveEdit = async (uuid, data) => {
    await updateMutation.mutateAsync({ uuid, data });
    setOpenEdit(false);
  };

  return (
    <Box component="section" sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Elternliste
      </Typography>

      {paginatedParents.length === 0 ? (
        <Typography>Keine Eltern gefunden.</Typography>
      ) : (
        <Stack spacing={2}>
          {paginatedParents.map((parent) => (
            <Card key={parent.uuid || parent.id} elevation={2}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {parent.firstName} {parent.lastName}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Telephone: {parent.phoneNumber || "-"}
                  </Typography>

                  {parent.addressDTO && (
                    <Typography variant="body2" color="text.secondary">
                      Address: {parent.addressDTO.street}{" "}
                      {parent.addressDTO.houseNumber}, {parent.addressDTO.city}
                    </Typography>
                  )}

                  {parent.children && parent.children.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      {parent.children.map((child) => (
                        <Typography
                          key={child.uuid}
                          variant="body2"
                          color="text.secondary"
                        >
                          Kinder: {child.firstName} {child.lastName}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEdit(parent)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(parent)}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {pageCount > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, v) => setPage(v)}
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
        <DialogTitle>Elternteil bearbeiten</DialogTitle>
        <DialogContent dividers>
          {editParent && (
            <ParentEditForm
              parent={editParent}
              onSave={handleSaveEdit}
              onCancel={() => setOpenEdit(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
