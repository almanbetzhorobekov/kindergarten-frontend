import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./pages/layout/Layout.jsx";

import HomePage from "./pages/home/HomePage.jsx";
import KindergartenPage from "./pages/kindergarten/KindergartenPage.jsx";
import GroupPage from "./pages/group/GroupPage.jsx";
import ChildPage from "./pages/child/ChildPage.jsx";
import ParentsPage from "./pages/parents/ParentsPage.jsx";
import EducatorPage from "./pages/educator/EducatorPage.jsx";
import AboutMePage from "./pages/about-me/AboutMePage.jsx";
import ContactPage from "./pages/contact/ContactPage.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import theme from "./styling/theme.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 6 * 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/kindergarten" element={<KindergartenPage />} />
              <Route path="/group" element={<GroupPage />} />
              <Route path="/child" element={<ChildPage />} />
              <Route path="/parents" element={<ParentsPage />} />
              <Route path="/educator" element={<EducatorPage />} />
              <Route path="/about-me" element={<AboutMePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
