import { useQuery } from "@tanstack/react-query";
import { parentsAPI } from "api/parentsService";
import { Box, List, ListItem, Typography } from "@mui/material";
import { childAPI } from "../../../api/childService";

export default function ParentsList() {
  const {
    data: parents = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["parents"],
    queryFn: parentsAPI.getAll,
  });

  const { data: children = [] } = useQuery({
    queryKey: ["children"],
    queryFn: childAPI.getAll,
  });

  const getChildName = (childId) => {
    const child = children.find((c) => c.id === childId);
    return child ? `${child.firstName} ${child.lastName}` : "-";
  };

  if (isLoading) return <Typography>Laden...</Typography>;
  if (error) return <Typography>Fehler beim Laden der Eltern</Typography>;
  console.log(parents);
  return (
    <Box component={"section"}>
      <Typography variant="h2">Eltern Liste</Typography>

      {parents.length === 0 ? (
        <Typography>Keine Eltern hinzugefügt.</Typography>
      ) : (
        <List>
          {parents.map((parent, index) => (
            <ListItem key={parent.uuid ?? index}>
              <strong>
                {parent.firstName} {parent.lastName}
              </strong>
              <Box>{parent.phoneNumber}</Box>

              {parent.child && (
                <Box>
                  Kind: {parent.child.firstName} {parent.child.lastName}
                </Box>
              )}

              {!parent.child && parent.childUuid && (
                <Box>Kind: {getChildName(parent.childId)}</Box>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
