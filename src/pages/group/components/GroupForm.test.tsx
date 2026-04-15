import { vi, beforeEach, test, expect, describe } from "vitest";
import { useGroupApi } from "../api/GroupApi";
import { useKindergartenApi } from "pages/kindergarten/api/KindergartenApi";
import { render, screen } from "@testing-library/react";
import GroupForm from "./GroupForm";
import userEvent from "@testing-library/user-event";
vi.mock("../api/GroupApi", () => ({
  useGroupApi: vi.fn(),
}));

vi.mock("../../kindergarten/api/KindergartenApi", () => ({
  useKindergartenApi: vi.fn(),
}));

describe("GroupForm", () => {
  const mockMutate = vi.fn();

  const mockKitas = [
    { uuid: "1", kindergartenName: "Kita A" },
    { uuid: "2", kindergartenName: "Kita B" },
  ];

  beforeEach(() => {
    (vi.clearAllMocks(),
      (useGroupApi as any).mockReturnValue({
        createMutation: {
          mutate: mockMutate,
          isPending: false,
          isError: false,
        },
      }));
    (useKindergartenApi as any).mockReturnValue({
      kindergartens: mockKitas,
      isLoading: false,
    });
  });

  test("shows loading state", () => {
    (useKindergartenApi as any).mockReturnValue({
      kindergartens: [],
      isLoading: true,
    });

    render(<GroupForm />);
    expect(screen.getByText("Lädt Kindergärten...")).toBeInTheDocument();
  });

  test("renders form fields", () => {
    render(<GroupForm />);

    expect(screen.getByLabelText(/Gruppenname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Kindergarten/i)).toBeInTheDocument();
  });

  test("submits form correctly", async () => {
    const user = userEvent.setup();

    render(<GroupForm />);

    await user.type(screen.getByLabelText(/Gruppenname/i), "Gruppe 1");

    await user.click(screen.getByLabelText(/Kindergarten/i));
    await user.click(screen.getByText("Kita A"));
    await user.click(screen.getByRole("button", { name: /erstellen/i }));

    expect(mockMutate).toHaveBeenCalledWith(
      {
        groupName: "Gruppe 1",
        kindergartenId: "1",
      },
      expect.any(Object),
    );
  });

  test("shows validation error", async () => {
    const user = userEvent.setup();

    render(<GroupForm />);

    await user.click(screen.getByRole("button", { name: /erstellen/i }));

    expect(
      await screen.findByText("Gruppenname ist erforderlich"),
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Bitte Kindergarten auswählen"),
    ).toBeInTheDocument();
  });

  test("Shows API error", async () => {
    (useGroupApi as any).mockReturnValue({
      createMutation: {
        mutate: vi.fn(),
        isPending: false,
        isError: false,
        error: { message: "Server Fehler" },
      },
    });
    render(<GroupForm />);
    expect(screen.getByText(/Server Fehler/i)).toBeInTheDocument();
  });
});
