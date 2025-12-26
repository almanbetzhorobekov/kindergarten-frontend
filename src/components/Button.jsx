import "./button.css";

export default function Button({
  children,
  type = "button",
  color = "green",
  onClick,
}) {
  const className = color === "red" ? "btn btn-red" : "btn";

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}