import { useState } from "react";
import ChildForm from "../components/child/ChildForm.jsx";
import ChildList from "../components/child/ChildList.jsx";
import ChildClearButton from "../components/child/ChildClearButton.jsx";
import "../styles/ChildPage.css";

export default function ChildPage() {
  const [children, setChildren] = useState([]);

  const addChild = (child) => {
    setChildren((prev) => [...prev, child]);
  };

  const clearChildren = () => {
    setChildren([]);
  };

  return (
    <>
      <section className="intro">
        <h1>Unsere kleinen Entdecker</h1>
        <p>
          In unserem Kindergarten wachsen die Kinder in einem liebevollen und sicheren Umfeld auf.
          Hier findest du eine Übersicht über unsere Kinder und ihre individuellen Talente.
        </p>
      </section>

      <ChildForm onAddChild={addChild} />

      <ChildClearButton onClear={clearChildren} />

      <ChildList childrenList={children} />
    </>
  );
}
