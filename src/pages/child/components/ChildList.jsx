import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { childAPI, groupAPI } from "../../../api/childService";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Pagination,
} from "@mui/material";

const ITEMS_PER_PAGE = 5;

export default function ChildList() {
  const [page, setPage] = useState(1);

  const {
    data: children = { content: [], totalElements: 0 },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["children", page],
    queryFn: () => childAPI.getAll(page - 1, ITEMS_PER_PAGE),
  });

  const { data: groups = [] } = useQuery({
    queryKey: ["groups"],
    queryFn: groupAPI.getAll,
  });

  const getGroupName = (groupId) =>
    groups.find((g) => g.uuid === groupId)?.groupName || "-";

  if (isLoading) return <Typography>Lädt...</Typography>;
  if (error) return <Typography>Fehler beim Laden der Kinder</Typography>;

  const pageCount = Math.ceil(children.totalElements / ITEMS_PER_PAGE);

  return (
    <Box component="section">
      <Typography variant="h6" gutterBottom>
        Kinder Liste
      </Typography>

      {children.content.length === 0 ? (
        <Typography>Keine Kinder hinzugefügt.</Typography>
      ) : (
        <Stack spacing={2}>
          {children.content.map((child) => (
            <Card key={child.uuid}>
              <CardContent
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>
                  {child.firstName} {child.lastName}
                </Typography>
                <Typography color="text.secondary">
                  Gruppe: {getGroupName(child.groupId)}
                </Typography>
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
    </Box>
  );
}
