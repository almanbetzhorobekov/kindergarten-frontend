import { useState } from "react";

export default function ParentsForm({ onAddParent }) {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthday: "",
    street: "",
    houseNumber: "",
    plz: "",
    childSelect: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddParent(formData);   // передаём наверх

    // очищаем форму
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      birthday: "",
      street: "",
      houseNumber: "",
      plz: "",
      childSelect: "",
    });
  };

  return (
    <section className="parents">
      <form id="parents-form" onSubmit={handleSubmit}>
        <input
            name="firstName"
            placeholder="Vorname"
            value={formData.firstName}
            onChange={handleChange}
            required
        />

        <input 
            name="lastName"
            placeholder="Nachname"
            value={formData.lastName}
            onChange={handleChange}
            required
        />

        <input
            name="phoneNumber"
            placeholder="Telefonnummer"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
        />

        <input
            type="date" name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
        />

        <fieldset>
          <input name="street" placeholder="Straße"
                 value={formData.street} onChange={handleChange} required />

          <input name="houseNumber" placeholder="Hausnummer"
                 value={formData.houseNumber} onChange={handleChange} required />

          <input name="plz" placeholder="PLZ"
                 value={formData.plz} onChange={handleChange} required />
        </fieldset>

        <select name="childSelect" value={formData.childSelect} onChange={handleChange}>
          <option value="">-- Wähle ein Kind --</option>
          <option value="Kind 1">Kind 1</option>
          <option value="Kind 2">Kind 2</option>
        </select>

        <button type="submit">Anmelden</button>
      </form>
    </section>
  );
}
