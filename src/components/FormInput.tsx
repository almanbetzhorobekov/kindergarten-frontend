import { Box, TextField, Typography, TextFieldProps } from "@mui/material";

type FormInputProps = TextFieldProps & {
  errorMessage?: string;
};

export default function FormInput({ errorMessage, ...props }: FormInputProps) {
  return (
    <Box>
      <TextField {...props} />

      {errorMessage && <Typography>{errorMessage}</Typography>}
    </Box>
  );
}
