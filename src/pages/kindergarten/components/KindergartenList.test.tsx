import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import KindergartenList from "./KindergartenList";
import { useKindergartenApi } from "../api/KindergartenApi";

vi.mock("../api/KindergartenApi", () => ({
  useKindergartenApi: vi.fn(),
}));

describe("KindergartenList", () => {
  const mockDelete = vi.fn();
  const mockUpdate = vi.fn();

  const mockData = [
    {
      uuid: "1",
      kindergartenName: "Kita Sonnenschein",
      address: {
        street: "Hauptstraße",
        houseNumber: "10",
        plz: "53111",
        city: "Bonn",
      },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    (useKindergartenApi as any).mockReturnValue({
      kindergartens: mockData,
      isLoading: false,
      error: null,
      deleteMutation: { mutate: mockDelete, isPending: false },
      updateMutation: { mutate: mockUpdate },
    });
  });

  //Рендер списка
  test("renders kindergarten list", () => {
    render(<KindergartenList />);

    expect(screen.getByText("Kita Sonnenschein")).toBeInTheDocument();
    expect(screen.getByText("Hauptstraße 10, 53111 Bonn")).toBeInTheDocument();
  });

  //Loading state
  test("shows loading", () => {
    (useKindergartenApi as any).mockReturnValue({
      kindergartens: [],
      isLoading: true,
      error: null,
    });

    render(<KindergartenList />);
    expect(screen.getByText("Lädt...")).toBeInTheDocument();
  });

  // Error state
  test("shows error", () => {
    (useKindergartenApi as any).mockReturnValue({
      kindergartens: [],
      isLoading: false,
      error: true,
    });

    render(<KindergartenList />);
    expect(screen.getByText("Fehler!")).toBeInTheDocument();
  });

  test("calls delete when confirmed", async () => {
    const user = userEvent.setup();

    vi.spyOn(window, "confirm").mockReturnValue(true);

    render(<KindergartenList />);

    await user.click(screen.getByRole("button", { name: /delete/i }));

    expect(window.confirm).toHaveBeenCalled();
    expect(mockDelete).toHaveBeenCalledWith("1");
  });

  test("opens edit dialog", async () => {
    const user = userEvent.setup();

    render(<KindergartenList />);

    await user.click(screen.getByRole("button", { name: /edit/i }));

    expect(screen.getByText("Kindergarten bearbeiten")).toBeInTheDocument();
  });
});
