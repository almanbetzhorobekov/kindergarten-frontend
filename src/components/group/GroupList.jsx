import { useState } from "react";
import "../../styles/GroupPage.css";

export default function GroupList() {
  const [groups, setGroups] = useState([
    { id: 1, name: "Sonnenblumen", kindergarten: "Wunderkind Alsdorf" },  
    { id: 2, name: "Regenbogen", kindergarten: "Wunderkind Herzogenrath" },
    { id: 3, name: "Sternchen", kindergarten: "Wunderkind Aachen" },
  ]);

  const clearAll = () => {
    setGroups([]);
  };

  const loadGroups = () => {
    alert("Hier könnte ein Request an die Datenbank kommen :)");
  };

  const groupedByKindergarten = groups.reduce((acc, group) => {
    if (!acc[group.kindergarten]) acc[group.kindergarten] = [];
    acc[group.kindergarten].push(group);
    return acc;
  }, {});

  return (
    <section className="groups-container">
      <div className="groups-grid">
        {Object.entries(groupedByKindergarten).map(([kindergarten, groupList]) => (
          <div key={kindergarten} className="group-column">
            <h2>{kindergarten}</h2>
            {groupList.map((group) => (
              <div key={group.id} className="group-card">
                <h3>{group.name}</h3>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="group-buttons">
        <button onClick={loadGroups}>Alle Gruppen laden</button>
        <button onClick={clearAll} className="clear-btn">Alle Gruppen löschen</button>
      </div>
      
    </section>
  );
}
