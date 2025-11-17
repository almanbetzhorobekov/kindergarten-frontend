import { useState } from "react";

export default function EducatorForm({ onAddEducator }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    street: "",
    houseNumber: "",
    plz: "",
    phoneNumber: "",
    kindergartenSelect: "",
    groupSelect: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEducator(formData);

    setFormData({
      firstName: "",
      lastName: "",
      birthday: "",
      street: "",
      houseNumber: "",
      plz: "",
      phoneNumber: "",
      kindergartenSelect: "",
      groupSelect: "",
    });
  };

  return (
    <section className="educators">
      <h2>Neuen Erzieher erstellen</h2>

      <form className="educator-form" onSubmit={handleSubmit}>
        <input
          className="educators-item"
          type="text"
          name="firstName"
          placeholder="Vorname"
          value={formData.firstName}
          onChange={handleChange}
        />

        <input
          className="educators-item"
          type="text"
          name="lastName"
          placeholder="Nachname"
          value={formData.lastName}
          onChange={handleChange}
        />

        <input
          className="educators-item"
          type="date"
          name="birthday"
          placeholder="Geburtsdatum"
          value={formData.birthday}
          onChange={handleChange}
        />

        <fieldset>
          <input
          className="educators-item"
          type="text"
          name="street"
          placeholder="Straße"
          value={formData.street}
          onChange={handleChange}
          />

          <input
            className="educators-item"
            type="text"
            name="houseNumber"
            placeholder="Hausnummer"
            value={formData.houseNumber}
            onChange={handleChange}
          />

          <input
            className="educators-item"
            type="text"
            name="plz"
            placeholder="PLZ"
            value={formData.plz}
            onChange={handleChange}
          />
        </fieldset>
   
        <input
          className="educators-item"
          type="text"
          name="phoneNumber"
          placeholder="Telefonnummer"
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        <label>Gruppe wählen</label>
        <select
          className="gruppe"
          name="groupSelect"
          value={formData.groupSelect}
          onChange={handleChange}
        >
          <option value="">--Wähle Gruppe--</option>
          <option value="Sonnenschein">Sonnenschein</option>
          <option value="Regenbogen">Regenbogen</option>
          <option value="Sterntaler">Sterntaler</option>
        </select>

        <label>Kindergarten wählen</label>
        <select
          className="gruppe"
          name="kindergartenSelect"
          value={formData.kindergartenSelect}
          onChange={handleChange}
        >
          <option value="">--Wähle Kindergarten--</option>
          <option value="Wunderkind Alsdorf">Wunderkind Alsdorf</option>
          <option value="Wunderkind Herzogenrath">Wunderkind Herzogenrath</option>
          <option value="Wunderkind Aachen">Wunderkind Aachen</option>
        </select>

        <button type="submit">Erstellen</button>
      </form>
    </section>
  );
}
