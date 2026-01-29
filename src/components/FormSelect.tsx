import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  Typography,
} from "@mui/material";
import { useId } from "react";

type FormSelectProps = SelectProps & {
  label: string;
  options: { value: string; label: string }[];
  error: string | undefined;
};

export default function FormSelect(props: FormSelectProps) {
  const { label, options, error, ...rest } = props;
  const id = useId();

  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>

      <Select labelId={id} label={label} {...rest}>
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
