import { Box, Container, Stack, Typography } from "@mui/material";
import GroupForm from "./components/GroupForm.jsx";
import GroupList from "./components/GroupList.jsx";

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
          <Typography variant="h6">Gruppenübersicht</Typography>
          <GroupForm />
          <GroupList />
        </Stack>
      </Container>
    </Box>
  );
}
