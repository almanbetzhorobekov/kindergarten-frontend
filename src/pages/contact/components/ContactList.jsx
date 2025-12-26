import ContactCard from "./ContactCard.jsx";

export default function ContactList() {
  const contacts = [
    {
      photo: "",
      firstName: "",
      lastName: "",
      role: "",
      email: "",
      phone: "",
      workTime: "Mo–Fr, 08:00–16:00"
    },
    {
      photo: "",
      firstName: "",
      lastName: "",
      role: "",
      email: "",
      phone: "",
      workTime: "Mo–Fr, 09:00–15:00"
    },
    {
      photo: "",
      firstName: "",
      lastName: "",
      role: "",
      email: "",
      phone: "",
      workTime: "Mo–Fr, 10:00–18:00"
    }
  ];

  return (
    <section className="contact-list">
      {contacts.map((c, index) => (
        <ContactCard key={index} {...c} />
      ))}
    </section>
  );
}
