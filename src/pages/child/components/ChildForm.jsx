import { useState } from "react";

export default function ChildForm({ onAddChild }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    kindergartenSelect: "",
    groupSelect: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddChild(formData);

    setFormData({
      firstName: "",
      lastName: "",
      birthday: "",
      kindergartenSelect: "",
      groupSelect: "",
    });
  };

  return (
    <section className="childs">
      <form id="childForm" onSubmit={handleSubmit}>

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
          value={formData.birthday}
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
          <option value="Wunderkind Alsdorf">Wunderkind Alsdorf</option>
          <option value="Wunderkind Herzogenrath">Wunderkind Herzogenrath</option>
          <option value="Wunderkind Aachen">Wunderkind Aachen</option>
        </select>

        <select
          className="gruppe"
          name="groupSelect"
          value={formData.groupSelect}
          onChange={handleChange}
          required
        >
          <option value="">Bitte die Gruppe auswählen...</option>
          <option value="Sonnenschein">Sonnenschein</option>
          <option value="Regenbogen">Regenbogen</option>
          <option value="Sterntaler">Sterntaler</option>
        </select>

        <button type="submit">Anmelden</button>
      </form>
    </section>
  );
}
