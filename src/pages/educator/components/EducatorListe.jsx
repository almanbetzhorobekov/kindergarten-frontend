import { useQuery } from "@tanstack/react-query";
import { fetchEducators } from "../../../api/educatorService";

export default function EducatorListe() {
  const { data: educators = [], isLoading } = useQuery({
    queryKey: ["educators"],
    queryFn: () => fetchService("/api/kindergartens"),
  });

  if (isLoading) return <p>Laden...</p>;
console.log(educators);
  return (
    <>
      <h2>Erzieher Liste</h2>

      <section className="educators">
        {educators.length === 0 ? (
          <p>Keine Erzieher hinzugefügt.</p>
        ) : (
          <ul>
            {educators.map((e) => (
              <li key={e.id}>
                {e.firstName} {e.lastName} – {e.phoneNumber}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
