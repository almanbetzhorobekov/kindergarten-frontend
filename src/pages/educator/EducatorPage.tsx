import { Box, Container, Stack } from "@mui/material";
import EducatorForm from "./components/EducatorForm";
import EducatorListe from "./components/EducatorListe";
import { EducatorDTO } from "api/educator.type";

export default function EducatorPage() {
  const handleAddEducator = (educator: EducatorDTO) => {
    // TODO: Implement adding educator logic
    console.log("Adding educator:", educator);
  };

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
          <EducatorForm onAddEducator={handleAddEducator}/>
          <EducatorListe />
        </Stack>
      </Container>
    </Box>
  );
}
