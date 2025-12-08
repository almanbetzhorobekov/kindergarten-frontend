import { useQuery } from "@tanstack/react-query";
import { childAPI, groupAPI } from "../../../api/childService";

export default function ChildList() {
  const { data: children = [], isLoading, error } = useQuery({
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

  if (isLoading) return <p>Lädt...</p>;
  if (error) return <p>Fehler beim Laden der Kinder</p>;
  console.log(children);
  return (
    <section className="childs">
      <h2>Kinder Liste</h2>
      {children.length === 0 ? (
        <p>Keine Kinder hinzugefügt.</p>
      ) : (
        <ul>
          {children.map((child, index) => (
            <li key={child.uuid ?? index}>
              {child.firstName} {child.lastName} --- "Gruppe: {getGroupName(child.groupId)}"
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
