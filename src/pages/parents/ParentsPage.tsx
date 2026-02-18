import ParentsForm from "./components/ParentsForm";
import ParentsList from "./components/ParentsList";
import { Box } from "@mui/material";

export default function ParentsPage() {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Box component={"main"}>
        <ParentsForm
          onAddParent={(parents) => {
            console.log("Neues Eltern hinzugefügt:", parents);
          }}
        />
        <ParentsList />
      </Box>
    </Box>
  );
}
