import { render, screen, fireEvent } from "@testing-library/react";
import ChildForm from "./ChildForm";
import { useChildApi } from "../api/ChildApi";
import { vi } from "vitest";

vi.mock("../api/ChildApi");

(describe("ChildForm (unit)"),
  () => {
    const mockMutate = vi.fn();

    beforeEach(() => {
      (useChildApi as any).mockReturnValue({
        kindergartens: [],
        groups: [],
        createChild: {
          mutate: mockMutate,
          isPending: false,
          isError: false,
        },
      });
    });

    test("render form", () => {
      render(<ChildForm onAddChild={vi.fn()} />);

      expect(screen.getByLabelText("Vorname")).toBeInTheDocument();
      expect(screen.getByLabelText("Nachname")).toBeInTheDocument();
    });

    test("validation works", async () => {
      render(<ChildForm onAddChild={vi.fn()} />);

      fireEvent.click(screen.getByRole("button", { name: "Anmelden" }));

      expect(
        await screen.findByText("Vorname ist erforderlich"),
      ).toBeInTheDocument();
    });

    test("submit calls mutate", async () => {
      render(<ChildForm onAddChild={vi.fn()} />);

      fireEvent.change(screen.getByLabelText("Vorname"), {
        target: { value: "Almanbet" },
      });

      fireEvent.change(screen.getByLabelText("Nachname"), {
        target: { value: "Zhorobekov" },
      });

      fireEvent.change(screen.getByLabelText("Geburtsdatum"), {
        target: { value: "2022-02-02" },
      });

      fireEvent.click(screen.getByRole("button", { name: "Anmelden" }));

      expect(mockMutate).toHaveBeenCalled();
    });
  });
