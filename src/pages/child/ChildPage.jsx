import ChildForm from "./components/ChildForm.jsx";
import ChildList from "./components/ChildList.jsx";
import "./styles/ChildPage.css";

export default function ChildPage() {
  
  return (
    <>
      <section className="intro">
        <h1>Unsere kleinen Entdecker</h1>
        <p>
          In unserem Kindergarten wachsen die Kinder in einem liebevollen und sicheren Umfeld auf.
          Hier findest du eine Übersicht über unsere Kinder und ihre individuellen Talente.
        </p>
      </section>

      <ChildForm/>
      <ChildList/>
    </>
  );
}
