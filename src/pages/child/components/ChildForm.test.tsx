import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChildForm from "./ChildForm";
import { useChildApi } from "../api/ChildApi";
import { describe, vi, test, expect } from "vitest";

vi.mock("../api/ChildApi", () => ({
  useChildApi: vi.fn(),
}));

test("Soll Validierungsfehler bei einem leeren Formular anzeigen", async () => {
  (useChildApi as any).mockReturnValue({
    kindergartens: [],
    groups: [],
    createChild: { mutate: vi.fn(), isPending: false },
  });

  render(<ChildForm onAddChild={vi.fn()} />);

  const submitButton = screen.getByRole("button", { name: /anmelden/i });
  fireEvent.click(submitButton);

  expect(
    await screen.findByText(/vorname ist erforderlich/i),
  ).toBeInTheDocument();
  expect(
    await screen.findByText(/nachname ist erforderlich/i),
  ).toBeInTheDocument();
});
