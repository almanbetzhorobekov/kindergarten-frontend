export type BackendLocalDate = `${number}-${number}-${number}`;

export function toBackendDate(
  inputDate: string | null,
): BackendLocalDate | undefined {
  if (!inputDate) return undefined;

  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}` as BackendLocalDate;
}

export function toInputDate(inputDate: string | null): string {
  if (!inputDate) return "";
  return new Date(inputDate).toISOString().split("T")[0];
}
