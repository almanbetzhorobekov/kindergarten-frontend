import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "../../../api/groupService";
import { Button, Typography, Box } from "@mui/material";

export default function GroupList() {
  const {
    data: groups = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
  });

  if (isLoading) return <Typography>Lädt Gruppen...</Typography>;
  if (error) return <Typography>Fehler beim Laden der Gruppen!</Typography>;

  // Gruppierung
  const groupedByKindergarten = groups.reduce((acc, group) => {
    const kitaName = group.kindergartenName || "Unbekannt";

    if (!acc[kitaName]) acc[kitaName] = [];
    acc[kitaName].push(group);

    return acc;
  }, {});
  console.log(groups);
  return (
    <Box component={"section"}>
      <Box>
        {Object.entries(groupedByKindergarten).map(
          ([kindergarten, groupList]) => (
            <Box key={groupList[0]?.kindergartenId || kindergarten}>
              <Typography variant="h2">{kindergarten}</Typography>

              {groupList.map((group) => (
                <Box key={group.uuid}>
                  <Typography variant="h3">{group.groupName}</Typography>
                </Box>
              ))}
            </Box>
          )
        )}
      </Box>

      {/* Buttons */}
      <Box>
        <Button onClick={() => refetch()}>Gruppen neu laden</Button>
      </Box>
    </Box>
  );
}
