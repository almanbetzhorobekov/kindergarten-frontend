import DashboardCards from "./components/DashboardCards";
import { Box, Container } from "@mui/material";

export default function HomePage() {
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
        <DashboardCards />
      </Container>
    </Box>
  );
}
