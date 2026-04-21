import React from "react";
import { Box, Typography, Paper } from "@mui/material";

interface KidCardProps {
  name: string;
  age: number;
  group: string;
  isPresent: boolean;
}

export const KidCard = ({ name, isPresent }: KidCardProps) => {
  return (
    <Paper
      elevation={1}
      sx={{
        padding: 2,
        width: "25rem",
        borderRadius: 2,

        backgroundColor: isPresent ? "success.shade50" : "error.shade50",
        border: "1px solid",
        borderColor: isPresent ? "success.main" : "error.main",
      }}
    >
      <Typography variant="h5"> {name}</Typography>

      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        Gruppe:
      </Typography>

      <Box sx={{ bgcolor: "neutrals.white", color: "primary.main" }}></Box>
    </Paper>
  );
};
