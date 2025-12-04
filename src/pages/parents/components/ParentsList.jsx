import { useQuery } from "@tanstack/react-query";
import { fetchParents } from "../../../api/parentsService";

export default function ParentsList() {
  const { data: parents = [], isLoading, error, refetch } = useQuery({
  queryKey: ["parents"],
  queryFn: fetchParents,
});
  if(error) {
    return <p>Fehler beim Laden der Eltern!</p>;
  }

  if (isLoading) return <p>Laden...</p>;

  console.log("parents:", parents);

  return (
    <section className="parents-list">
      <h2>Eltern Liste</h2>

      <button onClick={() => refetch()}>Alle laden</button>

      {parents.length === 0 ? (
        <p>Keine Eltern hinzugefügt.</p>
      ) : (
        <ul>
          {parents.map((p) => (
            <li key={p.id}>
              {p.firstName} {p.lastName} — {p.phoneNumber}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

