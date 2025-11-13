import { useState } from "react";

export default function EducatorPage() {
  const [educators, setEducators] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    street: "",
    houseNumber: "",
    plz: "",
    email: "",
    phoneNumber: "",
    kindergartenSelect: "",
    groupSelect: "",
  });

  // Обработка изменений в форме
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Обработка отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    // Добавляем нового воспитателя в список
    setEducators((prev) => [...prev, formData]);

    // Очищаем поля
    setFormData({
      firstName: "",
      lastName: "",
      birthday: "",
      street: "",
      houseNumber: "",
      plz: "",
      email: "",
      phoneNumber: "",
      kindergartenSelect: "",
      groupSelect: "",
    });
  };

  return (
    <main>
      <h2>Neue Erzieher hinzufügen</h2>

      <section className="educators">
        <form id="educator-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="Vorname"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Nachname"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="birthday"
            placeholder="Geburtsdatum"
            value={formData.birthday}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="street"
            placeholder="Straße"
            value={formData.street}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="houseNumber"
            placeholder="Hausnummer"
            value={formData.houseNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="plz"
            placeholder="PLZ"
            value={formData.plz}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Telefonnummer"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />

          <select
            name="kindergartenSelect"
            value={formData.kindergartenSelect}
            onChange={handleChange}
            required
          >
            <option value="">Wähle Kindergarten</option>
            <option value="Kindergarten 1">Kindergarten 1</option>
            <option value="Kindergarten 2">Kindergarten 2</option>
          </select>

          <select
            name="groupSelect"
            className="gruppe"
            value={formData.groupSelect}
            onChange={handleChange}
            required
          >
            <option value="">Bitte die Gruppe auswählen...</option>
            <option value="Gruppe A">Gruppe A</option>
            <option value="Gruppe B">Gruppe B</option>
          </select>

          <button type="submit">Erstellen</button>
        </form>
      </section>

      <h2>Erzieher Liste</h2>
      <section id="educator-list">
        {educators.length === 0 ? (
          <p>Keine Erzieher hinzugefügt.</p>
        ) : (
          <ul>
            {educators.map((e, i) => (
              <li key={i}>
                {e.firstName} {e.lastName} – {e.email}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
