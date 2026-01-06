import { useQuery } from "@tanstack/react-query";
import { educatorAPI } from "../../../api/educatorService";
import { groupAPI } from "../../../api/groupService";
import { Box, List, ListItem, Typography } from "@mui/material";

export default function EducatorListe() {
  const {
    data: educators = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["educators"],
    queryFn: educatorAPI.getAll,
  });

  const { data: groups = [] } = useQuery({
    queryKey: ["groups"],
    queryFn: groupAPI.getAll,
  });

  const getGroupName = (groupId) => {
    const group = groups.find((g) => g.uuid === groupId);
    return group?.groupName || "-";
  };

  if (isLoading) return <Typography>Laden...</Typography>;
  if (error) return <Typography>Fehler beim Laden der Erzieher</Typography>;

  console.log(educators);
  return (
    <Box component={"section"}>
      <Typography variant="h3">Erzieher Liste</Typography>
      {educators.length === 0 ? (
        <Typography>Keine Erzieher hinzugefügt.</Typography>
      ) : (
        <List>
          {educators.map((educator, index) => (
            <ListItem key={educator.uuid ?? index}>
              {educator.firstName} {educator.lastName}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
