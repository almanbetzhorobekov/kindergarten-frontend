import KindergartenForm from "./components/KindergartenForm.jsx";
import { Box, Container, Stack } from "@mui/material";

export default function KindergartenPage() {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <KindergartenForm />
        </Stack>
      </Container>
    </Box>
  );
}
