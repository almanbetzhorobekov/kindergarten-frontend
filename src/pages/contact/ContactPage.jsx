import ContactList from "./components/ContactList.jsx";
import "./styles/ContactPage.css";

export default function ContactPage() {
  return (
    <main>
      <div className="contact-page">
      <h1>Kontakt</h1>
      <p>Hier finden Sie alle wichtigen Ansprechpartner.</p>

      <ContactList />
    </div>
    </main>
  );
}
