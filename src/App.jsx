import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Cards from "./components/Cards";
import Footer from "./components/Footer";

//Links
import KindergartenPage from "./pages/KindergartenPage";
import GroupPage from "./pages/GroupPage";
import ChildPage from "./pages/ChildPage.jsx";
import ParentsPage from "./pages/ParentsPage";
import EducatorPage from "./pages/EducatorPage";
import ContactPage from "./pages/ContactPage";
import AboutMePage from "./pages/AboutMePage";

import "./styles/Header.css";
import "./styles/Hero.css";
import "./styles/Cards.css";
import "./styles/Footer.css";

export default function App() {

  return (
     <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<><Hero /><Cards /></>} />
          <Route path="/kindergarten" element={<KindergartenPage/>} />
          <Route path="/group" element={<GroupPage/>} />
          <Route path="/child" element={<ChildPage/>} />
          <Route path="/parents" element={<ParentsPage/>} />
          <Route path="/educator" element={<EducatorPage/>} />
          <Route path="/abaut-me" element={<AboutMePage/>} />
          <Route path="/contact" element={<ContactPage/>} />
        </Routes>
      </main>

      <Footer />
  
    </>
  );

}


