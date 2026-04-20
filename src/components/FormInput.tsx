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
  label,
  ...props
}: FormInputProps) {
  const errorId = register ? `${register.name}-error` : undefined;
  return (
    <Box>
      <TextField
        {...props}
        {...register}
        label={label}
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
        slotProps={{
          htmlInput: {
            "aria-invalid": !!errorMessage ? "true" : "false",
            "aria-describedby": errorMessage ? errorId : undefined,
            ...props.slotProps,
          },
          formHelperText: {
            id: errorId,
            role: errorMessage ? "alert" : undefined,
          },
        }}
      />
    </Box>
  );
}
