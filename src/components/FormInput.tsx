import { Box, TextField, Typography, TextFieldProps } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = Omit<TextFieldProps, "error" | "helperText"> & {
  label: string;
  register?: UseFormRegisterReturn;
  errorMessage?: string;
};

export default function FormInput({
  register,
  errorMessage,
  ...props
}: FormInputProps) {
  return (
    <Box>
      <TextField
        {...props}
        {...register}
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
      />

      {errorMessage && <Typography>{errorMessage}</Typography>}
    </Box>
  );
}
