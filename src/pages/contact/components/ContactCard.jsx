import { Box, Typography } from "@mui/material";

export default function ContactCard({
  firstName,
  lastName,
  role,
  email,
  phone,
  workTime,
}) {
  return (
    <Box>
      <img
        src={"/images/educator/our-educator.jpg"}
        alt={`${firstName} ${lastName}`}
      />

      <Box>
        <Typography variant="h2">
          {firstName} {lastName}
        </Typography>
        <Typography>
          <strong>Position:</strong> {role}
        </Typography>
        <Typography>
          <strong>Email:</strong> {email}
        </Typography>
        <Typography>
          <strong>Telefon:</strong> {phone}
        </Typography>
        <Typography>
          <strong>Arbeitszeit:</strong> {workTime}
        </Typography>
      </Box>
    </Box>
  );
}
