import KindergartenIntro from "./components/KindergartenIntro.jsx";
import KindergartenGallery from "./components/KindergartenGallery.jsx";
import KindergartenForm from "./components/KindergartenForm.jsx";

export default function KindergartenPage() {
  return (
    <>
      <main>
        <KindergartenIntro />
        <KindergartenGallery />
        <KindergartenForm />
      </main>
    </>
  );
}
