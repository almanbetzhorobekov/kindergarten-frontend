import { Box } from "@mui/material";
import ContactCard from "./ContactCard.jsx";

export default function ContactList() {
  const contacts = [
    {
      firstName: "Anna",
      lastName: "Müller",
      role: "Erzieherin",
      email: "anna@kita.de",
      phone: "+49 123 456",
      workTime: "Mo–Fr, 08:00–16:00",
    },
    {
      firstName: "Max",
      lastName: "Schmidt",
      role: "Erzieher",
      email: "max@kita.de",
      phone: "+49 987 654",
      workTime: "Mo–Fr, 09:00–15:00",
    },
    {
      firstName: "Julia",
      lastName: "Weber",
      role: "Leitung",
      email: "julia@kita.de",
      phone: "+49 555 111",
      workTime: "Mo–Fr, 10:00–18:00",
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 4,
        mt: 4,
        justifyItems: "center",
      }}
    >
      {contacts.map((c, index) => (
        <ContactCard key={index} {...c} />
      ))}
    </Box>
  );
}
