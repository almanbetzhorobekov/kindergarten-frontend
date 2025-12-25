import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ContactMailIcon from "@mui/icons-material/ContactMail";

export default function Footer() {
  return (
    <AppBar position="static" component="footer" sx={{ mt: "auto" }}>
      <Box sx={{ textAlign: "center", py: 1 }}>
        <Typography variant="body2">
          © 2025 Kindergarten Wunderkind. Alle Rechte vorbehalten.
        </Typography>
      </Box>

      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Startseite"
          icon={<HomeIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Kontakt"
          icon={<ContactMailIcon />}
          component={Link}
          to="/contact"
        />
      </BottomNavigation>
    </AppBar>
  );
}
