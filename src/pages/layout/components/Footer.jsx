import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <p>&copy; 2025 Kindergarten Wunderkind. Alle Rechte vorbehalten.</p>
      <nav>
        <ul>
          <li>
            <Link to="/">Startseite</Link>
          </li>
          <li>
            <Link to="/contact">Kontakt</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
