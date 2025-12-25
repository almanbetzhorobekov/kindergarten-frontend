import EducatorForm from "./components/EducatorForm";
import EducatorListe from "./components/EducatorListe";

export default function EducatorPage() {
  return (
    <main>
      <EducatorForm
        onAddEducator={(educator) => {
          console.log("Neues Kind hinzugefügt:", educator);
        }}
      />

      <EducatorListe />
    </main>
  );
}
