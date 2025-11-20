import { useState } from "react";
import EducatorForm from "./components/EducatorForm.jsx";
import EducatorListe from "./components/EducatorListe.jsx";
import "./styles/EducatorPage.css";

export default function EducatorPage() {
  const [educators, setEducators] = useState([]);

  // функция для добавления воспитателя
  const addEducator = (newEducator) => {
    setEducators((prev) => [...prev, newEducator]);
  };

  return (
    <>
      <EducatorForm onAddEducator={addEducator}/>
      <EducatorListe educators={educators}/>
    </>
  );
}
