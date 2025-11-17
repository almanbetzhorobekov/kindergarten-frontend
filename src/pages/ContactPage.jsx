import ContactList from "../components/contact/ContactCard.jsx";
import "../styles/ContactPage.css";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <h1>Kontakt</h1>
      <p>Hier finden Sie alle wichtigen Ansprechpartner.</p>

      <ContactList />
    </div>
  );
}
