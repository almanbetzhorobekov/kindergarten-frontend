import { useState } from "react";
import {
  Box,
  Stack,
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useEducatorApi } from "../api/EducatorApi";
import { EducatorDTO } from "api/educator.type";
import EducatorEditForm from "../components/EducatorEditForm";

export default function EducatorListe() {
  const [page, setPage] = useState(1);
  const [editItem, setEditItem] = useState<EducatorDTO | null>(null);

  const {
    educators,
    totalPages,
    isLoading,
    error,
    deleteMutation,
    updateMutation,
  } = useEducatorApi({ page });

  if (isLoading) return <Typography>Laden...</Typography>;
  if (error) return <Typography color="error">Fehler beim Laden.</Typography>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Erzieher Liste
      </Typography>
      <Stack spacing={2}>
        {educators.map((edu) => (
          <Card key={edu.uuid} elevation={2}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {edu.firstName} {edu.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {edu.email} | {edu.phoneNumber}
                </Typography>
                <Typography variant="caption" display="block">
                  Gruppen:{" "}
                  {edu.groupIds?.map((g) => g.groupName).join(", ") || "-"}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setEditItem(edu)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() =>
                    window.confirm("Löschen?") &&
                    deleteMutation.mutate(edu.uuid)
                  }
                >
                  Delete
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, v) => setPage(v)}
        sx={{ mt: 3, display: "flex", justifyContent: "center" }}
      />

      <Dialog
        open={!!editItem}
        onClose={() => setEditItem(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Erzieher bearbeiten</DialogTitle>
        <DialogContent>
          {editItem && (
            <EducatorEditForm
              educator={editItem}
              onCancel={() => setEditItem(null)}
              onSave={async (uuid: string, data: EducatorDTO) => {
                const payload = {
                  ...data,
                  groupIds: Array.isArray(data.groupIds)
                    ? data.groupIds.map((g: any) =>
                        typeof g === "string" ? g : g.uuid,
                      )
                    : [],
                };
                await updateMutation.mutateAsync({ uuid, data: payload });
                setEditItem(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
