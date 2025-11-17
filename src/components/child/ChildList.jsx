import { useState } from "react";
export default function ChildList({ childrenList }) {
  return (
    <section className="childs">
      <h2>Kinder Liste</h2>

      {childrenList.length === 0 ? (
        <p>Keine Kinder hinzugefügt.</p>
      ) : (
        <ul>
          {childrenList.map((child, index) => (
            <li key={index}>
              {child.firstName} {child.lastName} – {child.groupSelect}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
