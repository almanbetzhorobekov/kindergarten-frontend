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
import { ParentsDTO, UpdateParentsDTO } from "api/parents.type";
import { useParentsApi } from "../api/ParentsApi";
import ParentEditForm from "../components/ParentEditForm";

export default function ParentsList() {
  const [page, setPage] = useState<number>(1);
  const [editParent, setEditParent] = useState<ParentsDTO | null>(null);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const { parents, isLoading, error, updateMutation, deleteMutation } =
    useParentsApi({ page });

  if (isLoading) return <Typography sx={{ p: 2 }}>Lädt...</Typography>;
  if (error)
    return (
      <Typography color="error" sx={{ p: 2 }}>
        Fehler при загрузке родителей
      </Typography>
    );

  const ITEMS_PER_PAGE = 5;
  const pageCount = Math.ceil(parents.length / ITEMS_PER_PAGE);
  const paginatedParents = parents.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handleEdit = (parent: ParentsDTO) => {
    setEditParent(parent);
    setOpenEdit(true);
  };

  const handleDelete = async (parent: ParentsDTO) => {
    if (window.confirm(`Elternteil ${parent.firstName} ${parent.lastName} `)) {
      await deleteMutation.mutateAsync(parent.uuid);
    }
  };

  const handleSaveEdit = async (uuid: string, data: UpdateParentsDTO) => {
    await updateMutation.mutateAsync({ uuid, data });
    setOpenEdit(false);
    setEditParent(null);
  };

  return (
    <Box component="section" sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Eltern Liste
      </Typography>

      {parents.length === 0 ? (
        <Typography color="text.secondary">
          Keine Eltern hinzugefügt.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {paginatedParents.map((parent) => (
            <Card key={parent.uuid} elevation={2}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {parent.firstName} {parent.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tel: {parent.phoneNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Kinder:{" "}
                    {parent.childrenId
                      ?.map((c) => `${c.firstName}`)
                      .join(", ") || "-"}
                  </Typography>
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
        <DialogTitle>Elternteil bearbeiten</DialogTitle>
        <DialogContent sx={{ pt: 1.5 }}>
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
