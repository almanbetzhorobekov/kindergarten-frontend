import ParentsForm from "./components/ParentsForm.jsx";
import ParentsList from "./components/ParentsList.jsx";
import { Box, Container, Stack, Typography } from "@mui/material";

export default function ParentsPage() {
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
          <ParentsForm />
          <ParentsList />
        </Stack>
      </Container>
    </Box>
  );
}
