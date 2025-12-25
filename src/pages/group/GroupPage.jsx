import { Typography } from "@mui/material";
import GroupForm from "./components/GroupForm.jsx";
import GroupList from "./components/GroupList.jsx";

export default function GroupPage() {
  return (
    <>
      <main>
        <Typography variant="h1">Gruppenübersicht</Typography>
        <GroupForm />
        <GroupList />
      </main>
    </>
  );
}
