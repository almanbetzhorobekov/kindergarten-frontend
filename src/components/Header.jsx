import React from "react";
import './Header.css';

export default function Header() {
    return (
        <header>
            <a className="logo" href="index.html">Wunderkind</a>
            <nav>
                <ul>
                    <li><a href="index.html">Startseite</a></li>
                    <li><a href="about-kindergarten.html">Kindergarten</a></li>
                    <li><a href="group.html">Gruppen</a></li>
                    <li><a href="child.html">Kindern</a></li>
                    <li><a href="parents.html">Eltern</a></li>
                    <li><a href="educator.html">Erzieher*innen</a></li>
                    <li><a href="about.me.html">Über mich</a></li>
                </ul>
            </nav>
        </header>
    );
}