import { Routes, Route } from "react-router-dom";

//Links
import HomePage from "./pages/home/HomePage.jsx";
import KindergartenPage from "./pages/kindergarten/KindergartenPage.jsx";
import GroupPage from "./pages/group/GroupPage.jsx";
import ChildPage from "./pages/child/ChildPage.jsx";
import ParentsPage from "./pages/parents/ParentsPage.jsx";
import EducatorPage from "./pages/educator/EducatorPage.jsx";
import AboutMePage from "./pages/about-me/AboutMePage.jsx";
import ContactPage from "./pages/contact/ContactPage.jsx";

// Komponen App das ist der Haupstruktur der Anwendung
export default function App() {

  return (
     
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/kindergarten" element={<KindergartenPage/>} />
      <Route path="/group" element={<GroupPage/>} />
      <Route path="/child" element={<ChildPage/>} />
      <Route path="/parents" element={<ParentsPage/>} />
      <Route path="/educator" element={<EducatorPage/>} />
      <Route path="/about-me" element={<AboutMePage/>} />
      <Route path="/contact" element={<ContactPage/>} />
    </Routes>
      
  );

}



