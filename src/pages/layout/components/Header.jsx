import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  const [anchorOrg, setAnchorOrg] = useState(null);
  const [anchorPerson, setAnchorPerson] = useState(null);
  const [anchorInfo, setAnchorInfo] = useState(null);

  return (
    <AppBar
      position="static"
      sx={{
        height: "100%",
        width: "100%",
        left: 0,
        borderRadius: 0,
        backgroundColor: "#676464ff",
      }}
    >
      <Toolbar disableGutters sx={{ px: 2 }}>
        <Typography
          variant="h5"
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
        {/**Navi */}
        <Box sx={{ display: "flex", gap: 4, ml: "auto" }}>
          <Button component={RouterLink} to="/">
            Startseite
          </Button>
          {/**Organisation in MegaMenu */}
          <Button onClick={(e) => setAnchorOrg(e.currentTarget)}>
            Organisation
          </Button>

          <Menu
            anchorEl={anchorOrg}
            open={Boolean(anchorOrg)}
            onClose={() => setAnchorOrg(null)}
          >
            <MenuItem
              component={RouterLink}
              to="/kindergarten"
              onClick={() => setAnchorOrg(null)}
            >
              Kindergarten
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/group"
              onClick={() => setAnchorOrg(null)}
            >
              Gruppen
            </MenuItem>
          </Menu>

          {/**Personen */}

          <Button onClick={(e) => setAnchorPerson(e.currentTarget)}>
            Personen
          </Button>

          <Menu
            anchorEl={anchorPerson}
            open={Boolean(anchorPerson)}
            onClose={() => setAnchorPerson(null)}
          >
            <MenuItem
              component={RouterLink}
              to="/child"
              onClick={() => setAnchorPerson(null)}
            >
              Kinder
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/parents"
              onClick={() => setAnchorPerson(null)}
            >
              Eltern
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/educator"
              onClick={() => setAnchorPerson(null)}
            >
              Erzieher
            </MenuItem>
          </Menu>

          {/* Info */}
          <Button
            color="inherit"
            onClick={(e) => setAnchorInfo(e.currentTarget)}
          >
            Info
          </Button>
          <Menu
            anchorEl={anchorInfo}
            open={Boolean(anchorInfo)}
            onClose={() => setAnchorInfo(null)}
          >
            <MenuItem
              component={RouterLink}
              to="/contact"
              onClick={() => setAnchorInfo(null)}
            >
              Kontakt
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/about-me"
              onClick={() => setAnchorInfo(null)}
            >
              Über mich
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
