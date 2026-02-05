import { Box, Container, Stack, Typography } from "@mui/material";
import GroupForm from "./components/GroupForm";
import GroupList from "./components/GroupList";

export default function GroupPage() {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <GroupForm
            onAddGroup={(group) => {
              console.log("Neu Group: ", group);
            }}
          />
          <GroupList />
        </Stack>
      </Container>
    </Box>
  );
}
