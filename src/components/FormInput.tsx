import { Box, TextField, Typography, TextFieldProps } from "@mui/material";

type FormInputProps = Omit<TextFieldProps, "error" | "helperText"> & {
  errorMessage?: string;
};

export default function FormInput({ errorMessage, ...props }: FormInputProps) {
  return (
    <Box>
      <TextField
        {...props}
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
      />

      {errorMessage && <Typography>{errorMessage}</Typography>}
    </Box>
  );
}
