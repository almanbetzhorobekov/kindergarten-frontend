
import KindergartenIntro from "./components/KindergartenIntro.jsx";
import KindergartenGallery from "./components/KindergartenGallery.jsx";
import KindergartenForm from "./components/KindergartenForm.jsx";
import "./styles/KindergartenPage.css";

export default function KindergartenPage() {
  return (
    <>
      <KindergartenIntro />
      <KindergartenGallery />
      <KindergartenForm />
    </>
  );
}
