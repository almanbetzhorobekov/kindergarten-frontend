import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Pagination,
  Divider,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { GroupDTO, UpdateGroupDTO } from "api/group.type";
import { useGroupApi } from "../api/GroupApi";
import GroupEditForm from "./GroupEditForm";

const pageSize = 6;

export default function GroupList() {
  const [page, setPage] = useState(1);

  const [editGroup, setEditGroup] = useState<GroupDTO | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { groups, isLoading, error, deleteMutation, updateMutation } =
    useGroupApi();

  const handleEditClick = (group: GroupDTO) => {
    setEditGroup(group);
    setIsDialogOpen(true);
  };

  const handleSave = async (uuid: string, data: UpdateGroupDTO) => {
    await updateMutation.mutateAsync({ uuid, data });
    setIsDialogOpen(false);
    setEditGroup(null);
  };

  const handleDelete = (uuid: string) => {
    if (window.confirm("Möchten Sie diese Gruppe wirklich löschen?")) {
      deleteMutation.mutate(uuid);
    }
  };

  if (isLoading) return <Typography>Lädt Gruppen...</Typography>;
  if (error) return <Typography color="error">Fehler beim Laden!</Typography>;

  const totalPages = Math.ceil(groups.length / pageSize);
  const paginatedGroups = groups.slice((page - 1) * pageSize, page * pageSize);

  const groupedByKindergarten = paginatedGroups.reduce<
    Record<string, GroupDTO[]>
  >((acc, group) => {
    const kitaName = group.kindergartenName || "Unbekannt";
    if (!acc[kitaName]) acc[kitaName] = [];
    acc[kitaName].push(group);
    return acc;
  }, {});

  return (
    <Box component="section">
      <Typography variant="h4" mb={3}>
        Gruppenübersicht
      </Typography>

      {Object.entries(groupedByKindergarten).map(
        ([kindergarten, groupList]) => (
          <Paper key={kindergarten} elevation={1} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" mb={1}>
              {kindergarten}
            </Typography>
            <Divider sx={{ mb: 1 }} />

            <Stack spacing={1}>
              {groupList.map((group) => (
                <Box
                  key={group.uuid}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1,
                    borderRadius: 1,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <Typography sx={{ fontWeight: 500 }}>
                    {group.groupName}
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleEditClick(group)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(group.uuid)}
                      disabled={deleteMutation.isPending}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Paper>
        ),
      )}

      {totalPages > 1 && (
        <Pagination
          sx={{ mt: 3 }}
          page={page}
          count={totalPages}
          color="primary"
          onChange={(_, value) => setPage(value)}
        />
      )}

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Gruppe bearbeiten</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          {editGroup && (
            <GroupEditForm
              group={editGroup}
              onSave={handleSave}
              onCancel={() => setIsDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
