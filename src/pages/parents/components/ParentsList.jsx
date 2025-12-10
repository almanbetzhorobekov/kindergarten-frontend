import { useQuery } from "@tanstack/react-query";
import { parentsAPI, childAPI } from "../../../api/parentsService";

export default function ParentsList() {
  const { data: parents = [], isLoading, error } = useQuery({
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

  if (isLoading) return <p>Laden...</p>;
  if (error) return <p>Fehler beim Laden der Eltern</p>;
 console.log(parents);
  return (
    <section className="parents-list">
      <h2>Eltern Liste</h2>

      {parents.length === 0 ? (
        <p>Keine Eltern hinzugefügt.</p>
      ) : (
        <ul>
          {parents.map((parent, index) => (
            <li key={parent.uuid ?? index}>
              <strong>
                {parent.firstName} {parent.lastName}
              </strong>
              <div>{parent.phoneNumber}</div>

              {/* Версия 1: если приходит объект child */}
              {parent.child && (
                <div>
                  Kind: {parent.child.firstName} {parent.child.lastName}
                </div>
              )}

              {/* Версия 2: если приходит только childId */}
              {!parent.child && parent.childUuid && (
                <div>Kind: {getChildName(parent.childId)}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

