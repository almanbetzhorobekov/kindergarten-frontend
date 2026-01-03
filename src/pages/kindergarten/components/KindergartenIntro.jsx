import { Box, Typography, Stack } from "@mui/material";

export default function KindergartenIntro() {
  return (
    <Box component="section">
      <Stack spacing={2}>
        <Typography variant="body2" color="text.secondary">
          Unser Kindergarten wurde mit neuen Ideen, Konzepten und Technologien
          gegründet. Wir glauben, dass jedes Kind einzigartig ist und sein
          Potenzial entfalten kann.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Unser Ziel ist es, liebevolle, wissbegierige und kreative Kinder zu
          fördern. Wir nutzen moderne Methoden und Technologien, die Kinder zum
          Lernen, Forschen und täglichen Entdecken motivieren.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Bei uns verbringen Kinder nicht einfach nur Zeit — sie wachsen,
          entwickeln sich und lernen, selbstbewusste, freundliche und kluge
          Persönlichkeiten zu werden.
        </Typography>
      </Stack>
    </Box>
  );
}
