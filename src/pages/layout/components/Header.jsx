import { AppBar, Box, MenuItem, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            mr: 4,
          }}
        >
          Wunderkind
        </Typography>
        <Box>
          <MenuItem>
            <Link to="/">Startseite</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/kindergarten">Kindergarten</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/group">Gruppen</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/child">Kindern</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/parents">Eltern</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/educator">Team</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/contact">Kontakt</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/about-me">Über mich</Link>
          </MenuItem>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
