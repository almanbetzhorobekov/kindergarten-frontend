import { useQuery } from "@tanstack/react-query";
import { childAPI } from "../../../api/childService";

export default function ChildList() {
  const { data: children = [], isLoading, error } = useQuery({
    queryKey: ["children"],
    queryFn: childAPI.getAll,
  });

  if (isLoading) return <p>Lädt...</p>;
  if (error) return <p>Fehler beim Laden der Kinder</p>;

  return (
    <section className="childs">
      <h2>Kinder Liste</h2>
      {children.length === 0 ? (
        <p>Keine Kinder hinzugefügt.</p>
      ) : (
        <ul>
          {children.map((child) => (
            <li key={child.uuid}>
              {child.firstName} {child.lastName} – Gruppe: {child.group?.name || "-"}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
