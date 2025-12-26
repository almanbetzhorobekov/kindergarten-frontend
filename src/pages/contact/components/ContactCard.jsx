
export default function ContactCard({firstName, lastName, role, email, phone, workTime }) {
  return (
    <div className="contact-card">
      <img src={"/images/educator/our-educator.jpg"} alt={`${firstName} ${lastName}`} className="contact-photo" />

      <div className="contact-info">
        <h2>{firstName} {lastName}</h2>
        <p><strong>Position:</strong> {role}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Telefon:</strong> {phone}</p>
        <p><strong>Arbeitszeit:</strong> {workTime}</p>
      </div>
    </div>
  );
}
