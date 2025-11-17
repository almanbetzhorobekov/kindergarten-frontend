
import KindergartenIntro from "../components/kindergarten/KindergartenIntro";
import KindergartenGallery from "../components/kindergarten/KindergartenGallery";
import KindergartenForm from "../components/kindergarten/KindergartenForm";
import "../styles/KindergartenPage.css";

export default function KindergartenPage() {
  return (
    <>
      <KindergartenIntro />
      <KindergartenGallery />
      <KindergartenForm />
    </>
  );
}
