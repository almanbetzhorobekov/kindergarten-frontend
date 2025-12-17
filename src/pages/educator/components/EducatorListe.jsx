import { useQuery } from "@tanstack/react-query";
import { educatorAPI, groupAPI } from "../../../api/educatorService";

export default function EducatorListe() {
  const { data: educators = [], isLoading, error } = useQuery({
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

  if (isLoading) return <p>Laden...</p>;
  if (error) return <p>Fehler beim Laden der Erzieher</p>;
  
  console.log(educators);
  return (
    <section className="educators">
      <h2>Erzieher Liste</h2>
      {educators.length === 0 ? (
        <p>Keine Erzieher hinzugefügt.</p>
      ) : (
        <ul>
          {educators.map((educator, index) => (
            <li key={educator.uuid ?? index}>
              {educator.firstName} {educator.lastName}
            </li>
          ))}
        </ul> 
      )}
    </section>
  );
}
