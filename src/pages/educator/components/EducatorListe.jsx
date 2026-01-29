import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useEducatorApi } from "../api/EducatorApi";
import EducatorEditForm from "./EducatorEditForm";

export default function EducatorList() {
  const [editEducator, setEditEducator] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const { educators, isLoading, error, deleteMutation, updateMutation } =
    useEducatorApi();

  if (isLoading) return <Typography sx={{ p: 3 }}>Lädt...</Typography>;
  if (error)
    return (
      <Typography color="error" sx={{ p: 3 }}>
        Fehler beim Laden
      </Typography>
    );

  const educatorItems = Array.isArray(educators) ? educators : [];

  const handleEdit = (educator) => {
    setEditEducator(educator);
    setOpenEdit(true);
  };

  const handleDelete = async (educator) => {
    if (
      window.confirm(
        `Erzieher ${educator.firstName} ${educator.lastName} löschen?`,
      )
    ) {
      await deleteMutation.mutateAsync(educator.uuid);
    }
  };

  const handleSaveEdit = async (uuid, data) => {
    await updateMutation.mutateAsync({ uuid, data });
    setOpenEdit(false);
  };

  return (
    <Box component="section" sx={{ p: 2 }}>
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
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {educator.fullName ||
                    `${educator.firstName} ${educator.lastName}`}
                </Typography>

                <Typography variant="body2">
                  <strong>E-Mail:</strong> {educator.email || "---"}
                </Typography>
                <Typography variant="body2">
                  <strong>Tel:</strong> {educator.phoneNumber || "---"}
                </Typography>

                {educator.addressDTO ? (
                  <Typography variant="body2">
                    <strong>Adresse:</strong> {educator.addressDTO.street}{" "}
                    {educator.addressDTO.houseNumber}, {educator.addressDTO.plz}{" "}
                    {educator.addressDTO.city}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Keine Adresse hinterlegt
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

      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Erzieher bearbeiten</DialogTitle>
        <DialogContent dividers>
          {editEducator && (
            <EducatorEditForm
              educator={editEducator}
              onSave={handleSaveEdit}
              onCancel={() => setOpenEdit(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
