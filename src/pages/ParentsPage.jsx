import { useState } from "react";
import ParentsForm from "../components/parents/ParentsForm.jsx";
import ParentsList from "../components/parents/ParentsList.jsx";
import "../styles/ParentsPage.css";

export default function ParentsPage() {
  const [parents, setParents] = useState([]);

  // Добавление нового родителя
  const addParent = (parentData) => {
    setParents(prev => [...prev, parentData]);
  };

  // Загрузить всех (пока просто показываем state)
  const loadAllParents = () => {
    console.log("Alle Eltern:", parents);
  };

  return (
    <>
      <ParentsForm onAddParent={addParent} />
      <ParentsList parents={parents} onLoad={loadAllParents} />
    </>
  );
}
