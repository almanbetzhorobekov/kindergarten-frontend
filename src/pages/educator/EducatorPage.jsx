import { Box, Container, Stack } from "@mui/material";
import EducatorForm from "./components/EducatorForm";
import EducatorListe from "./components/EducatorListe";

export default function EducatorPage() {
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
          <EducatorForm />
          <EducatorListe />
        </Stack>
      </Container>
    </Box>
  );
}
