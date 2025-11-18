import { Link } from "react-router-dom";
import "../styles/Footer-2.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2025 Kindergarten Wunderkind. Alle Rechte vorbehalten.</p>
      <nav>
        <ul className="footer-links">
          <li><Link to="/">Startseite</Link></li>
          <li><Link to="/contact">Kontakt</Link></li>
        </ul>
      </nav>
    </footer>
  );
}
