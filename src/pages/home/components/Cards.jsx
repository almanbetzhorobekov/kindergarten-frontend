import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Cards() {
  const cards = [
    {
      link: "/kindergarten",
      img: "images/campus/kindergarten-main.jpg",
      alt: "Kindergarten Gebäude",
      title: "Unser Methoden",
      description: "Ein modernes und kinderfreundliches Haus.",
    },
    {
      link: "/group",
      img: "images/campus/outside.jpg",
      alt: "Garten",
      title: "Gruppen",
      description: "Viel Platz zum Spielen im Freien.",
    },
    {
      link: "/educator",
      img: "images/playroom/playroom2.jpg",
      alt: "Spielzimmer",
      title: "Unsere Team",
      description: "Sichere und kreative Räume für Kinder.",
    },
    {
      link: "/child",
      img: "images/kinder/happy-kind.jpg",
      alt: "Kindergarten Gebäude",
      title: "Unser Wunderkinds",
      description: "Ein modernes und kinderfreundliches Haus.",
    },
    {
      link: "/parents",
      img: "images/campus/nature.jpg",
      alt: "Happy Eltern",
      title: "Happy Eltern",
      description: "Viel Platz zum Spielen im Freien.",
    },
    {
      link: "/contact",
      img: "images/educator/with-educator.jpg",
      alt: "Spielzimmer",
      title: "Service",
      description: "Sichere und kreative Räume für Kinder.",
    },
  ];

  return (
    <Box component={"section"}>
      {cards.map((card, index) => (
        <Link key={index} to={card.link}>
          <Box>
            <img src={card.img} alt={card.alt} />
            <Box>
              <Typography>{card.title}</Typography>
              <Typography>{card.description}</Typography>
            </Box>
          </Box>
        </Link>
      ))}
    </Box>
  );
}
