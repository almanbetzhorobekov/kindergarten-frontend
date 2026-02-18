import { Box, Typography } from "@mui/material";
import ChildForm from "./components/ChildForm";
import ChildList from "./components/ChildList";

export default function ChildPage() {
  return (
    <>
      <Box component={"section"}>
        <Typography>Unsere kleinen Entdecker</Typography>
        <Typography>
          In unserem Kindergarten wachsen die Kinder in einem liebevollen und
          sicheren Umfeld auf. Hier findest du eine Übersicht über unsere Kinder
          und ihre individuellen Talente.
        </Typography>
      </Box>

      <Box component={"main"}>
        <ChildForm
          onAddChild={(child) => {
            console.log("Neues Kind hinzugefügt:", child);
          }}
        />
        <ChildList />
      </Box>
    </>
  );
}
