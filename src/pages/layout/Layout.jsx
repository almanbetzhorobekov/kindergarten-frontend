import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default function Layout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Header />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
