import { useQuery } from "@tanstack/react-query";
import Button from "../../../components/Button";
import { fetchGroups } from "../../../api/groupService";
import "../styles/GroupPage.css";

export default function GroupList() {
  // 1. Загружаем группы из базы
  const {
    data: groups = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
  });

  if (isLoading) return <p>Lädt Gruppen...</p>;
  if (error) return <p>Fehler beim Laden der Gruppen!</p>;

  // 2. Группировка по Kindergarten
  const groupedByKindergarten = groups.reduce((acc, group) => {
    const kitaName = group.kindergartenName || "Unbekannt";

    if (!acc[kitaName]) acc[kitaName] = [];
    acc[kitaName].push(group);

    return acc;
  }, {});

  return (
    <section className="groups-container">

      {/* Grid — колонки по детсадам */}
      <div className="groups-grid">
        {Object.entries(groupedByKindergarten).map(
          ([kindergarten, groupList]) => (
            <div key={kindergarten} className="group-column">
              <h2>{kindergarten}</h2>

              {groupList.map((group) => (
                <div key={group.id} className="group-card">
                  <h3>{group.name}</h3>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Buttons */}
      <div className="group-buttons">
        <Button onClick={() => refetch()}>
          Gruppen neu laden
        </Button>

        <Button
          className="btn-red"
          onClick={() => alert("Nur Backend kann Gruppen löschen :)")}
        >
          Alle Gruppen löschen
        </Button>
      </div>

    </section>
  );
}

