import { useQuery } from "@tanstack/react-query";
import { childAPI, groupAPI } from "../../../api/childService";
import { Box, Typography, List, ListItem } from "@mui/material";

export default function ChildList() {
  const {
    data: children = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["children"],
    queryFn: childAPI.getAll,
  });

  const { data: groups = [] } = useQuery({
    queryKey: ["groups"],
    queryFn: groupAPI.getAll,
  });

  const getGroupName = (groupId) => {
    const group = groups.find((g) => g.uuid === groupId);
    return group?.groupName || "-";
  };

  if (isLoading) return <Typography>Lädt...</Typography>;
  if (error) return <Typography>Fehler beim Laden der Kinder</Typography>;
  console.log(children);
  return (
    <Box component={"section"}>
      <Typography variant="h2">Kinder Liste</Typography>
      {children.content.length === 0 ? (
        <Typography>Keine Kinder hinzugefügt.</Typography>
      ) : (
        <List>
          {children.content.map((child, index) => (
            <ListItem key={child.uuid ?? index}>
              {child.firstName} {child.lastName} --- "Gruppe:{" "}
              {getGroupName(child.groupId)}"
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
