import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <>
        <Header />
        <Outlet />
        {/** Main  */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          {children}
        </Box>
        <Footer />
      </>
    </Box>
  );
}
