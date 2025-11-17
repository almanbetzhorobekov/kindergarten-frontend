import { useState } from "react";
import { createKindergarten } from "../../services/kindergartenService";

export default function KindergartenForm() {
  const [kindergartens, setKindergartens] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newKindergarten = Object.fromEntries(formData.entries());
    console.log("Neuer Kindergarten:", newKindergarten);

    setKindergartens((prev) => [...prev, newKindergarten]);
    event.target.reset();
  };

  const handleLoad = () => {
    console.log("Alle Kindergärten lade...");
    setKindergartens([
      { name: "Wunderkind", street: "Blumenweg", houseNumber: "5", plz: "12345" },
      { name: "Sonnenschein", street: "Hauptstraße", houseNumber: "10", plz: "67890" },
    ]);
  };

  return (
    <section className="kindergartens">
      <h2 className="kindergartens-title">Neuen Kindergarten erstellen</h2>

      <form onSubmit={handleSubmit }>
        <input type="text" name="name" placeholder="Kindergartenname" required />
        <fieldset>
          <input
            type="text"
            name="street"
            placeholder="Straße"
            required
          />
          <input 
            type="text" 
            name="houseNumber"
            placeholder="Hausnummer"
            required
          />
          <input
            type="text"
            name="plz"
            placeholder="PLZ"
            required
          />
        </fieldset>
        
        <button type="submit">Erstellen</button>
      </form>

      <button onClick={handleLoad} className="button-kindergartens">
        Anschauen
      </button>

      <div className="kindergartens-list">
        {kindergartens.map((kita, i) => (
          <div key={i} className="kita-card">
            <p>
              <strong>{kita.name}</strong> — {kita.street} {kita.houseNumber}, {kita.plz}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
