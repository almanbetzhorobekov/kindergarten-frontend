import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import GroupList from "./GroupList";
import { useGroupApi } from "../api/GroupApi";

vi.mock("../api/GroupApi", () => ({
  useGroupApi: vi.fn(),
}));

describe("GroupList", () => {
  const mockDelete = vi.fn();
  const mockUpdateAsync = vi.fn();

  const mockGroups = [
    {
      uuid: "1",
      groupName: "Gruppe A",
      kindergartenName: "Kita 1",
    },
    {
      uuid: "2",
      groupName: "Gruppe B",
      kindergartenName: "Kita 1",
    },
    {
      uuid: "3",
      groupName: "Gruppe C",
      kindergartenName: "Kita 1",
    },
    {
      uuid: "4",
      groupName: "Gruppe D",
      kindergartenName: "Kita 1",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    (useGroupApi as any).mockReturnValue({
      groups: mockGroups,
      isLoading: false,
      error: null,
      deleteMutation: {
        mutate: mockDelete,
        isPending: false,
      },
      updateMutation: {
        mutateAsync: mockUpdateAsync,
      },
    });
  });

  test("shows Loading", () => {
    (useGroupApi as any).mockReturnValue({
      groups: [],
      isLoading: true,
      error: null,
    });

    render(<GroupList />);
    expect(screen.getByText("Lädt Gruppen...")).toBeInTheDocument();
  });

  test("shows error", () => {
    (useGroupApi as any).mockReturnValue({
      groups: [],
      isLoading: false,
      error: true,
    });

    render(<GroupList />);
    expect(screen.getByText("Fehler beim Laden!")).toBeInTheDocument();
  });

  test("renders grouped list", () => {
    render(<GroupList />);

    expect(screen.getByText("Kita 1")).toBeInTheDocument();
    expect(screen.getByText("Kita 1")).toBeInTheDocument();

    expect(screen.getByText("Gruppe A")).toBeInTheDocument();
    expect(screen.getByText("Gruppe B")).toBeInTheDocument();
    expect(screen.getByText("Gruppe C")).toBeInTheDocument();
  });

  test("calls delete on confirm", async () => {
    const user = userEvent.setup();

    vi.spyOn(window, "confirm").mockReturnValue(true);

    render(<GroupList />);

    await user.click(screen.getAllByRole("button", { name: /delete/i })[0]);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockDelete).toHaveBeenCalledWith("1");
  });

  test("opens edit dialog", async () => {
    const user = userEvent.setup();

    render(<GroupList />);

    await user.click(screen.getAllByRole("button", { name: /edit/i })[0]);

    expect(screen.getByText("Gruppe bearbeiten")).toBeInTheDocument();
  });

  test("calls updateMutation on save", async () => {
    const user = userEvent.setup();

    render(<GroupList />);

    await user.click(screen.getAllByRole("button", { name: /edit/i })[0]);

    await user.click(screen.getByRole("button", { name: /speichern/i }));
    await waitFor(() => {
      expect(mockUpdateAsync).toHaveBeenCalled();
    });
  });
});
