export default function FormSelect({ label, options = [], error, ...props }) {
  return (
    <div className="form-field">
      {label && <label>{label}</label>}

      <select className="child-item" {...props}>
        <option key="default" value="">
          -- auswählen --
        </option>

        {options.map((o) => (
          <option 
            key={String(o.value)} 
            value={o.value}
          >
            {o.label}
          </option>
        ))}
      </select>

      {error && <p className="error">{error}</p>}
    </div>
  );
}
