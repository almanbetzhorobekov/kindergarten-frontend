import { Box, Typography, Paper, Divider, Button, Stack } from "@mui/material";
import { useState } from "react";
import { KindergartenDTO, UpdateKindergartenDTO } from "api/kindergarten.type";
import { useKindergartenApi } from "../api/KindergartenApi";
import KindergartenEditForm from "./KindergartenEditForm";

export default function KindergartenList() {
  const { kindergartens, isLoading, error, deleteMutation, updateMutation } =
    useKindergartenApi();

  const [editingKita, setEditingKita] = useState<KindergartenDTO | null>(null);

  if (isLoading) return <Typography>Lädt...</Typography>;
  if (error) return <Typography color="error">Fehler!</Typography>;

  const handleUpdate = (uuid: string, data: UpdateKindergartenDTO) => {
    updateMutation.mutate({ uuid, data });
    setEditingKita(null);
  };

  return (
    <Box component="section">
      <Typography variant="h4" mb={3}>
        Kindergarten Übersicht
      </Typography>

      <Stack spacing={3}>
        {kindergartens.map((kita) => (
          <Paper key={kita.uuid} elevation={2} sx={{ p: 2 }}>
            {editingKita?.uuid === kita.uuid ? (
              <KindergartenEditForm
                kindergarten={kita}
                onSave={handleUpdate}
                onCancel={() => setEditingKita(null)}
              />
            ) : (
              <>
                <Typography variant="h6">{kita.kindergartenName}</Typography>

                <Divider sx={{ my: 1 }} />

                <Typography>
                  {kita.address.street} {kita.address.houseNumber}
                </Typography>

                <Typography>
                  {kita.address.plz} {kita.address.city}
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setEditingKita(kita)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => deleteMutation.mutate(kita.uuid)}
                  >
                    Delete
                  </Button>
                </Stack>
              </>
            )}
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
