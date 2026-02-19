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
  return (
    <Card
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
          alt={`${firstName} ${lastName}`}
          sx={{
            width: 96,
            height: 96,
            mx: "auto",
            mb: 2,
          }}
        />

        <Typography variant="h6" fontWeight="bold">
          {firstName} {lastName}
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          {role}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ textAlign: "left" }}>
          <Typography variant="body2">
            <strong>Email:</strong> {email}
          </Typography>
          <Typography variant="body2">
            <strong>Telefon:</strong> {phone}
          </Typography>
          <Typography variant="body2">
            <strong>Arbeitszeit:</strong> {workTime}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
