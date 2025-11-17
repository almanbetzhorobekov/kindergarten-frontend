export default function EducatorListe({ educators = [] }) {
  return (
    <>
      <h2>Erzieher Liste</h2>

      <section className="educators">
        {educators.length === 0 ? (
          <p>Keine Erzieher hinzugefügt.</p>
        ) : (
          <ul>
            {educators.map((e, i) => (
              <li key={i}>
                {e.firstName} {e.lastName} – {e.phoneNumber}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
