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
import { ParentsDTO } from "api/parents.type";
import { useParentsApi } from "../api/ParentsApi";
import ParentEditForm from "./ParentEditForm";

export default function ParentsList() {
  const [page, setPage] = useState(1);
  const [editParent, setEditParent] = useState<ParentsDTO | null>(null);

  const {
    parents,
    totalPages,
    isLoading,
    error,
    updateMutation,
    deleteMutation,
  } = useParentsApi(page);

  if (isLoading) return <Typography sx={{ p: 2 }}>Lädt...</Typography>;
  if (error)
    return (
      <Typography color="error" sx={{ p: 2 }}>
        Fehler beim Laden
      </Typography>
    );

  return (
    <Box component="section" sx={{ mt: 4 }}>
      <Typography variant="h5" mb={2}>
        Eltern Übersicht
      </Typography>

      {parents.length === 0 ? (
        <Typography color="text.secondary">Keine Eltern gefunden.</Typography>
      ) : (
        <Stack spacing={2}>
          {parents.map((parent) => (
            <Card key={parent.uuid} elevation={2}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {parent.firstName} {parent.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tel: {parent.phoneNumber} | Kinder:{" "}
                    {parent.childrenId?.map((c) => c.firstName).join(", ") ||
                      "-"}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setEditParent(parent)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    disabled={deleteMutation.isPending}
                    onClick={() =>
                      window.confirm("Löschen?") &&
                      deleteMutation.mutate(parent.uuid)
                    }
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
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={page}
            color="primary"
            onChange={(_, value) => setPage(value)}
          />
        </Box>
      )}

      <Dialog
        open={!!editParent}
        onClose={() => setEditParent(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Elternteil bearbeiten</DialogTitle>
        <DialogContent sx={{ pt: 1.5 }}>
          {editParent && (
            <ParentEditForm
              parent={editParent}
              onCancel={() => setEditParent(null)}
              onSave={async (uuid, data) => {
                await updateMutation.mutateAsync({ uuid, data });
                setEditParent(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
