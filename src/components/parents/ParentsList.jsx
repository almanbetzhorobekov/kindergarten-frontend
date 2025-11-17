export default function ParentsList({ parents, onLoad }) {
  return (
    <section className="parents-list">
      <h2>Eltern Liste</h2>

      <button onClick={onLoad}>Alle laden</button>

      {parents.length === 0 ? (
        <p>Keine Eltern hinzugefügt.</p>
      ) : (
        <ul>
          {parents.map((p, i) => (
            <li key={i}>
              {p.firstName} {p.lastName} — {p.phoneNumber}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
