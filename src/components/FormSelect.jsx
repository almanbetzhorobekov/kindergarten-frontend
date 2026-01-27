import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

export default function FormSelect({ label, options = [], error, ...props }) {
  return (
    <FormControl>
      <InputLabel> {label} </InputLabel>

      <Select {...props}>
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
