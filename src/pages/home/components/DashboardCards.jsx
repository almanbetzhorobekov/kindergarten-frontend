import {
  Box,
  Card,
  CardContent,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const cards = [
  {
    title: "Anmeldung",
    description: "Anmeldungen wie Kinder, Eltern",
    link: "/child",
  },

  {
    title: "Kontaktpersonen",
    description: "Wichtige Ansprechpartner und Notfallkontakte.",
    link: "/contact",
  },
  {
    title: "Media",
    description: "Wichtige Ansprechpartner und Notfallkontakte.",
    link: "/contact",
  },
];

export default function DashboardCards() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 5,
        justifyContent: "center",
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          elevation={5}
          sx={{
            height: 360,
            width: 350,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <CardContent sx={{ flexGrow: 1, p: 3 }}>
            <Typography
              color="green"
              underline="black"
              variant="h6"
              sx={{ mb: 1, fontWeight: "bold" }}
            >
              {card.title}
            </Typography>

            <Divider variant="fullWidth" sx={{ color: "darkgreen" }} />

            <Typography color="text.secondary">{card.description}</Typography>
          </CardContent>

          {/*link*/}
          <Box sx={{ p: 2, pt: 0 }}>
            <Divider variant="fullWidth" />
            <Link component={RouterLink} to={card.link} underline="hover">
              Mehr
            </Link>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
