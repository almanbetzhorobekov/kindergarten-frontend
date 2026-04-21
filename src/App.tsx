import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./pages/layout/Layout";

import HomePage from "./pages/home/HomePage";
import KindergartenPage from "./pages/kindergarten/KindergartenPage";
import GroupPage from "./pages/group/GroupPage";
import ChildPage from "./pages/child/ChildPage";
import ParentsPage from "./pages/parents/ParentsPage";
import EducatorPage from "./pages/educator/EducatorPage";
import AboutMePage from "./pages/about-me/AboutMePage";
import ContactPage from "./pages/contact/ContactPage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import theme from "./styling/theme.js";
//import { useState } from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 6 * 60 * 1000,
    },
  },
});

export default function App() {
  // const [mode, setMode] = useState<'light' | 'dark'>('light')>;
  //const theme = getAppTheme(mode);

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
