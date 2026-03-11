import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ParentsForm from "./ParentsForm";
import { useParentsApi } from "../api/ParentsApi";
//Arrange
console.log("ParentsForm.test.tsx");
vi.mock("../api/ParentsApi", () => ({
  useParentsApi: vi.fn(),
}));

vi.mock("../../../api/childService", () => ({
  childAPI: {
    getAll: vi.fn().mockResolvedValue({
      content: [{ uuid: "child-1", firstName: "Sascha", lastName: "Pascha" }],
    }),
  },
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

describe("ParentsForm Compnent", () => {
  const mockMutate = vi.fn();
  const mockOnAddParent = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useParentsApi as any).mockReturnValue({
      createMutation: {
        mutate: mockMutate,
        isPending: false,
      },
    });
  });

  test("Wenn alle inputs erforderlich erstellt wird, dann muss diese Formular ohne Problem senden ", async () => {
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <ParentsForm onAddParent={mockOnAddParent} />
      </QueryClientProvider>,
    );

    fireEvent.change(screen.getByLabelText(/Vorname/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Nachname/i), {
      target: { value: "Therry" },
    });
    fireEvent.change(screen.getByLabelText(/Geburtsdatum/i), {
      target: { value: "1985-05-20" },
    });
    fireEvent.change(screen.getByLabelText(/Straße/i), {
      target: { value: "Main St" },
    });
    fireEvent.change(screen.getByLabelText(/Hausnummer/i), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText(/PLZ/i), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByLabelText(/Stadt/i), {
      target: { value: "Berlin" },
    });
    fireEvent.change(screen.getByLabelText(/Telefonnummer/i), {
      target: { value: "01621090291" },
    });
    const select = screen.getByLabelText(/Kinder/i);

    fireEvent.change(select, { target: { value: ["child-1"] } });

    const submitButton = screen.getByRole("button", {
      name: /Eltern speichern/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: "John",
          lastName: "Therry",
          addressDTO: expect.objectContaining({
            city: "Berlin",
          }),
        }),
        expect.any(Object),
      );
    });
  });
  afterAll;
});
