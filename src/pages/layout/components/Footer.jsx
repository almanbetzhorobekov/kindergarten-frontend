import {
  AppBar,
  BottomNavigation,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <AppBar>
      <Typography
        variant="h6"
        component={Link}
        to="/"
        sx={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        &copy; 2025 Kindergarten Wunderkind. Alle Rechte vorbehalten.
      </Typography>
      <BottomNavigation>
        <List>
          <ListItem>
            <Link to="/">Startseite</Link>
          </ListItem>
          <ListItem>
            <Link to="/contact">Kontakt</Link>
          </ListItem>
        </List>
      </BottomNavigation>
    </AppBar>
  );
}
