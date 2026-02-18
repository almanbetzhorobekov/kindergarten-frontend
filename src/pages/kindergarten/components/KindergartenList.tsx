import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import { KindergartenDTO, UpdateKindergartenDTO } from "api/kindergarten.type";
import { useKindergartenApi } from "../api/KindergartenApi";
import KindergartenEditForm from "./KindergartenEditForm";

export default function KindergartenList() {
  const { kindergartens, isLoading, error, deleteMutation, updateMutation } =
    useKindergartenApi();

  const [editingKita, setEditingKita] = useState<KindergartenDTO | null>(null);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  if (isLoading) return <Typography>Lädt...</Typography>;
  if (error) return <Typography color="error">Fehler!</Typography>;

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
    if (window.confirm("Kindergarten wirklich löschen?")) {
      deleteMutation.mutate(uuid);
    }
  };

  return (
    <Box component="section">
      <Typography variant="h4" mb={3}>
        Kindergarten Übersicht
      </Typography>

      <Stack spacing={2}>
        {kindergartens.map((kita) => (
          <Paper
            key={kita.uuid}
            elevation={1}
            sx={{
              p: 2,
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h6" lineHeight={1.2}>
                  {kita.kindergartenName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {kita.address.street} {kita.address.houseNumber},{" "}
                  {kita.address.plz} {kita.address.city}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} sx={{ ml: 2 }}>
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
