import { Box, TextField, Typography } from "@mui/material";

export default function FormInput({ error, ...props }) {
  return (
    <Box>
      <TextField {...props} />

      {error && <Typography>{error}</Typography>}
    </Box>
  );
}
