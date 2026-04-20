import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Divider,
} from "@mui/material";

interface ContactCardProps {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  workTime: string;
}

export default function ContactCard({
  firstName,
  lastName,
  role,
  email,
  phone,
  workTime,
}: ContactCardProps) {
  const fullName = `${firstName} ${lastName}`;
  return (
    <Card
      role="region"
      tabIndex={0}
      aria-label={`${role} im Kindergarten: ${fullName}. Kontaktinformationen folgen: Telefon und Email.`}
      sx={{
        width: 320,
        borderRadius: 3,
        boxShadow: 3,
        textAlign: "center",
      }}
    >
      <CardContent>
        <Avatar
          src="/images/educator/our-educator.jpg"
          alt={`Profilbild von ${fullName}`}
          sx={{
            width: 96,
            height: 96,
            mx: "auto",
            mb: 2,
          }}
        />

        <Typography
          id={`contact-${fullName}`}
          variant="h6"
          component="h2"
          fontWeight="bold"
        >
          {fullName}
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          {role}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ textAlign: "left" }}>
          <Typography variant="body2">
            <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
          </Typography>

          <Typography variant="body2">
            <strong>Telefon:</strong> <a href={`tel:${phone}`}>{phone}</a>
          </Typography>

          <Typography variant="body2">
            <strong>Arbeitszeit:</strong> {workTime}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
