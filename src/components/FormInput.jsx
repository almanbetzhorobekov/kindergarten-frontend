export default function FormInput({ label, error, ...props }) {
  return (
    <div className="form-field">
      {label && <label>{label}</label>}

      <input className="child-item" {...props} />

      {error && <p className="error">{error}</p>}
    </div>
  );
}