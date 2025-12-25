import { Link } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

export default function Hero() {
  return (
    <Box component={"section"}>
      <Box>
        <img
          src="/images/campus/Kindergarten-main.jpg"
          alt="Kindergarten Hauptbild"
        ></img>
      </Box>

      <Box>
        <Typography variant="h1">
          Willkommen in der Welt der begabten Kinder
        </Typography>
        <Typography>
          „Wir fördern die Talente Ihres Kindes, begleiten es auf dem Weg zur
          Selbstentfaltung und bereiten es optimal auf die Zukunft vor.“
        </Typography>
        <Link to="/kindergarten">
          <Button>Weiterlesen</Button>
        </Link>
      </Box>
    </Box>
  );
}
