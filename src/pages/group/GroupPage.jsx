import GroupForm from "./components/GroupForm.jsx";
import GroupList from "./components/GroupList.jsx";
import "./styles/GroupPage.css";

export default function GroupPage() {
    return (
        <>
        <h1>Unsere Kindergartengruppen</h1>

        <p>
            <em>
                In unserem Kindergarten bieten wir verschiedene Gruppen an, die auf das Alter
                und die individuellen Bedürfnisse der Kinder abgestimmt sind.
          <br />
                Jede Gruppe wird von erfahrenen und liebevollen Erzieher*innen betreut und
                bietet eine Umgebung zum Lernen, Spielen und Wachsen.
            </em>
        </p>

        <h1>Gruppenübersicht</h1>
        <GroupForm/>
        <GroupList/>
        </>
    );
}