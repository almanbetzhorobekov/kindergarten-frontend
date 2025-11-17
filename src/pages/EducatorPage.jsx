import { useState } from "react";
import EducatorForm from "../components/educator/EducatorForm.jsx";
import EducatorListe from "../components/educator/EducatorListe.jsx";
import "../styles/EducatorPage.css";

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
