import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            mr: 4,
            fontWeight: "bold",
          }}
        >
          Wunderkind
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/">
            Startseite
          </Button>
          <Button color="inherit" component={RouterLink} to="/kindergarten">
            Kindergarten
          </Button>
          <Button color="inherit" component={RouterLink} to="/group">
            Gruppen
          </Button>
          <Button color="inherit" component={RouterLink} to="/child">
            Kinder
          </Button>
          <Button color="inherit" component={RouterLink} to="/parents">
            Eltern
          </Button>
          <Button color="inherit" component={RouterLink} to="/educator">
            Team
          </Button>
          <Button color="inherit" component={RouterLink} to="/contact">
            Kontakt
          </Button>
          <Button color="inherit" component={RouterLink} to="/about-me">
            Über mich
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
