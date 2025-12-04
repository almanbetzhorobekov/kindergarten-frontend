export default function ChildClearButton({ onClear }) {
  return (
    <section className="clear-section">
      <button type="button" className="clear" onClick={onClear}>
        Alle Kinder löschen
      </button>
    </section>
  );
}