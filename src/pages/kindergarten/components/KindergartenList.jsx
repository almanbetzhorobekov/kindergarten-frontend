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
  Pagination,
} from "@mui/material";

import { useKindergartenApi } from "../api/KindergartenApi";
import KindergartenEditForm from "./KindergartenEditForm";

const pageSize = 6;

export default function KindergartenList() {
  const [editKindergarten, setEditKindergarten] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [page, setPage] = useState(1);

  const {
    kindergartens = [],
    isLoading,
    error,
    updateMutation,
    deleteMutation,
  } = useKindergartenApi({});

  if (isLoading) return <Typography>Lädt...</Typography>;
  if (error) return <Typography>Fehler beim Laden der Kindergärten</Typography>;

  const sortedKindergartens = [...kindergartens].sort((a, b) => {
    if (a.kindergartenName < b.kindergartenName) return -1;
    if (a.kindergartenName > b.kindergartenName) return 1;
    return 0;
  });

  const totalPages = Math.ceil(sortedKindergartens.length / pageSize);
  const paginatedKindergartens = sortedKindergartens.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const handleEdit = (kg) => {
    setEditKindergarten(kg);
    setOpenEdit(true);
  };

  const handleDelete = async (kg) => {
    if (
      window.confirm(`Kindergarten "${kg.kindergartenName}" wirklich löschen?`)
    ) {
      await deleteMutation.mutateAsync(kg.uuid);
    }
  };

  const handleSaveEdit = async (uuid, data) => {
    await updateMutation.mutateAsync({ uuid, data });
    setEditKindergarten(null);
    setOpenEdit(false);
  };

  return (
    <Box component="section">
      <Typography variant="h4" gutterBottom>
        Kindergartenliste
      </Typography>

      {paginatedKindergartens.length === 0 ? (
        <Typography>Keine Kindergärten vorhanden.</Typography>
      ) : (
        <Stack spacing={2}>
          {paginatedKindergartens.map((kg) => (
            <Card key={kg.uuid}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography>{kg.kindergartenName}</Typography>
                  <Typography color="text.secondary">
                    {kg.address?.street} {kg.address?.houseNumber},{" "}
                    {kg.address?.plz} {kg.address?.city}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEdit(kg)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(kg)}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

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
        <DialogTitle>Kindergarten bearbeiten</DialogTitle>
        <DialogContent>
          {editKindergarten && (
            <KindergartenEditForm
              kindergarten={editKindergarten}
              onSave={handleSaveEdit}
              onCancel={() => setOpenEdit(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
