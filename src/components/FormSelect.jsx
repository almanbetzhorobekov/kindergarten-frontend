import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useId } from "react";

export default function FormSelect({
  label,
  options = [],
  error,
  value,
  onChange,
  disabled,
}) {
  const id = useId();

  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>

      <Select
        labelId={id}
        label={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <MenuItem key="default" value="">
          -- auswählen --
        </MenuItem>

        {options.map((o, index) => (
          <MenuItem key={o.value ?? `option-${index}`} value={o.value ?? ""}>
            {o.label}
          </MenuItem>
        ))}
      </Select>

      {error && <Typography>{error}</Typography>}
    </FormControl>
  );
}
