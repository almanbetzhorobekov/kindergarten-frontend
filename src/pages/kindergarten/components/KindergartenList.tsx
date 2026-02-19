import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Pagination,
} from "@mui/material";
import { useState } from "react";
import { KindergartenDTO, UpdateKindergartenDTO } from "api/kindergarten.type";
import { useKindergartenApi } from "../api/KindergartenApi";
import KindergartenEditForm from "./KindergartenEditForm";

const pageSize = 5;

export default function KindergartenList() {
  const [page, setPage] = useState(1);
  const [editingKita, setEditingKita] = useState<KindergartenDTO | null>(null);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const { kindergartens, isLoading, error, deleteMutation, updateMutation } =
    useKindergartenApi();

  if (isLoading) return <Typography>Lädt...</Typography>;
  if (error) return <Typography color="error">Fehler!</Typography>;

  const totalPages = Math.ceil(kindergartens.length / pageSize);
  const paginatedKitas = kindergartens.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const handleEdit = (kita: KindergartenDTO) => {
    setEditingKita(kita);
    setOpenEdit(true);
  };

  const handleUpdate = (uuid: string, data: UpdateKindergartenDTO) => {
    updateMutation.mutate({ uuid, data });
    setOpenEdit(false);
    setEditingKita(null);
  };

  const handleDelete = (uuid: string) => {
    if (window.confirm("Kindergarten действительно удалить?")) {
      deleteMutation.mutate(uuid);
    }
  };

  return (
    <Box component="section">
      <Typography variant="h4" mb={3}>
        Kindergarten Übersicht
      </Typography>

      <Stack spacing={2}>
        {paginatedKitas.map((kita) => (
          <Paper
            key={kita.uuid}
            elevation={1}
            sx={{ p: 2, "&:hover": { bgcolor: "action.hover" } }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h6">{kita.kindergartenName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {kita.address.street} {kita.address.houseNumber},{" "}
                  {kita.address.plz} {kita.address.city}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleEdit(kita)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => handleDelete(kita.uuid)}
                  disabled={deleteMutation.isPending}
                >
                  Delete
                </Button>
              </Stack>
            </Box>
          </Paper>
        ))}
      </Stack>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={totalPages}
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
        <DialogTitle>Kindergarten bearbeiten</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          {editingKita && (
            <KindergartenEditForm
              kindergarten={editingKita}
              onSave={handleUpdate}
              onCancel={() => setOpenEdit(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
