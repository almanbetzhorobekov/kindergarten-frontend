import { Box, Typography } from "@mui/material";
import ContactList from "./components/ContactList.jsx";

export default function ContactPage() {
  return (
    <main>
      <Box>
        <Typography variant="h1">Kontakt</Typography>
        <Typography>Hier finden Sie alle wichtigen Ansprechpartner.</Typography>

        <ContactList />
      </Box>
    </main>
  );
}
