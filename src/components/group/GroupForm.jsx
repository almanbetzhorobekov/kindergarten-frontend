import { useState } from "react";
import "../../styles/GroupPage.css";

export default function GroupForm() {
  const [groupName, setGroupName] = useState("");
  const [kindergarten, setKindergarten] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName || !kindergarten) {
      alert("Bitte alle Felder ausfüllen!");
      return;
    }
    console.log("Neue Gruppe:", { groupName, kindergarten });
    setGroupName("");
    setKindergarten("");
  };

  return (
    <form className="group-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Gruppenname"
        required
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />

      <label>Kindergarten wählen:</label>
      <select
        required
        value={kindergarten}
        onChange={(e) => setKindergarten(e.target.value)}
      >
        <option value="">--Wähle Kindergarten--</option>
        <option value="Wunderkind Nord">Wunderkind Alsdorf</option>
        <option value="Wunderkind Süd">Wunderkind Herzogenrath</option>
        <option value="Wunderkind Süd">Wunderkind Aachen</option>
      </select>

      <button type="submit">Erstellen</button>
    </form>
  );
}
