import { Link } from 'react-router-dom';
import "../styles/Header.css";

export default function Header() {
    return (
        <header>
            <Link to="/" className="logo-link">Wunderkind</Link>
            <nav>
                <ul>
                    <li><Link to="/">Startseite</Link></li>
                    <li><Link to="/kindergarten">Kindergarten</Link></li>
                    <li><Link to="/group">Gruppen</Link></li>
                    <li><Link to="/child">Kindern</Link></li>
                    <li><Link to="/parents">Eltern</Link></li>
                    <li><Link to="/educator">Team</Link></li>
                    <li><Link to="/contact">Kontakt</Link></li>
                    <li><Link to="/about-me">Über mich</Link></li>
                </ul>
            </nav>
        </header>
    );
}