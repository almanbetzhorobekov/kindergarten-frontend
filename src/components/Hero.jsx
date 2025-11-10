import "../styles/Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-image">
        <img src="images/campus/Kindergarten-main.jpg" alt="main" />
      </div>

      <div className="hero-content">
        <h1>Willkommen in der Welt der begabten Kinder</h1>
        <p>
          "Wir fördern die Talente Ihres Kindes, begleiten es auf dem Weg zur
          Selbstentfaltung und bereiten es optimal auf die Zukunft vor."
        </p>
        <a href="/kindergarten" className="hero-btn">
          Weiterlesen
        </a>
      </div>
    </section>
  );
}
