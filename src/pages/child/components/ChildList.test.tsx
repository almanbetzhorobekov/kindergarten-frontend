import { render, screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import ChildList from "./ChildList";
import { useChildApi } from "../api/ChildApi";

vi.mock("../api/ChildApi", () => ({
  useChildApi: vi.fn(),
}));

describe("ChildList Component", () => {
  (useChildApi as any).mockReturnValue({
    children: [
      { uuid: "1", firstName: "Max", lastName: "Mustermann", groupId: "g1" },
    ],
    groups: [{ uuid: "g1", groupName: "Sonnenschein" }],
    isLoading: false,
    error: null,
    totalPages: 1,

    updateMutation: { mutatAsync: vi.fn() },
    deleteMutation: { mutatAsync: vi.fn() },
    deactivateMutation: { mutatAsync: vi.fn() },
  });

  render(<ChildList />);

  expect(screen.getByText(/Max Mustermann/i)).toBeInTheDocument();
  expect(screen.getByText(/Sonnenschein/i)).toBeInTheDocument();
});
