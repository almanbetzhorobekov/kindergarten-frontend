import { Link } from "react-router-dom";
import "../styles/Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-image">
        <img src="/images/campus/Kindergarten-main.jpg" alt="Kindergarten Hauptbild" />
      </div>

      <div className="hero-content">
        <h1>Willkommen in der Welt der begabten Kinder</h1>
        <p>
          „Wir fördern die Talente Ihres Kindes, begleiten es auf dem Weg zur
          Selbstentfaltung und bereiten es optimal auf die Zukunft vor.“
        </p>
        <Link to="/kindergarten" className="hero-btn">
          Weiterlesen
        </Link>
      </div>
    </section>
  );
}