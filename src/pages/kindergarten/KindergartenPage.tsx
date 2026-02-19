import KindergartenForm from "./components/KindergartenForm";
import { Box, Container, Stack } from "@mui/material";
import KindergartenList from "./components/KindergartenList";

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
          <KindergartenForm
            onAddKindergarten={(kita) => {
              console.log("Neu Kindergarten: ", kita);
            }}
          />
        </Stack>
        <KindergartenList />
      </Container>
    </Box>
  );
}
