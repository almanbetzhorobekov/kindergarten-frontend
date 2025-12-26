import { Link } from "react-router-dom";

import "../styles/Cards.css";

export default function Cards() {
  const cards = [
    {
      link: "/kindergarten",
      img: "images/campus/kindergarten-main.jpg",
      alt: "Kindergarten Gebäude",
      title: "Unser Methoden",
      description: "Ein modernes und kinderfreundliches Haus."
    },
    {
      link: "/group",
      img: "images/campus/outside.jpg",
      alt: "Garten",
      title: "Gruppen",
      description: "Viel Platz zum Spielen im Freien."
    },
    {
      link: "/educator",
      img: "images/playroom/playroom2.jpg",
      alt: "Spielzimmer",
      title: "Unsere Team",
      description: "Sichere und kreative Räume für Kinder."
    },
    {
      link: "/child",
      img: "images/kinder/happy-kind.jpg",
      alt: "Kindergarten Gebäude",
      title: "Unser Wunderkinds",
      description: "Ein modernes und kinderfreundliches Haus."
    },
    {
      link: "/parents",
      img: "images/campus/nature.jpg",
      alt: "Happy Eltern",
      title: "Happy Eltern",
      description: "Viel Platz zum Spielen im Freien."
    },
    {
      link: "/contact",
      img: "images/educator/with-educator.jpg",
      alt: "Spielzimmer",
      title: "Service",
      description: "Sichere und kreative Räume für Kinder."
    }
  ];

  return (
    <section className="cards container">
      {cards.map((card, index) => (
        <Link key={index} to={card.link} className="card-link">
          <div className="card">
            <img src={card.img} alt={card.alt} />
            <div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}

