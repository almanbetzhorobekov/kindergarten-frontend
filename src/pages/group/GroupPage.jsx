import GroupForm from "./components/GroupForm.jsx";
import GroupList from "./components/GroupList.jsx";
import "./styles/GroupPage.css";

export default function GroupPage() {
    return (
        <>
        <main>
            <h1>Gruppenübersicht</h1>
        <GroupForm/>
        <GroupList/>
        </main>
        
        </>
    );
}