import ParentsForm from "./components/ParentsForm.jsx";
import ParentsList from "./components/ParentsList.jsx";
import "./styles/ParentsPage.css";

export default function ParentsPage() {
 
  return (
    <>
      <main>
        <ParentsForm/>
        <ParentsList/>
      </main>
      
    </>
  );
}
