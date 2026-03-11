import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChildList from "./ChildList";
import { useChildApi } from "../api/ChildApi";
import { vi, describe, test, expect, beforeEach } from "vitest";
import nock from "nock";
import { CHILDREN_URL } from "api/childService";
import { PageDTO } from "api/page.type";
import { ChildDTO } from "api/child.type";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1. Мокаем хук useChildApi
/*
vi.mock("../api/ChildApi", () => ({
  useChildApi: vi.fn(),
}));*/

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const CHILDREN_TEST_PAYLOAD: PageDTO<ChildDTO> = {
  content: [
    {
      birthday: null,
      firstName: "Almanbet",
      groupId: "",
      lastName: "Niklas",
      parentsId: [""],
      uuid: "",
    },
  ],
  totalPages: 0,
  totalElements: 0,
  size: 0,
  number: 0,
};

describe("ChildList kompomemt new", () => {
  beforeEach(() => {
    queryClient.resetQueries();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test("initial page load", async () => {
    nock(new URL("http://localhost:8080"))
      .persist()
      .get(`${CHILDREN_URL}?page=${0}&size=${5}`)
      .reply(200, CHILDREN_TEST_PAYLOAD);

    render(
      <QueryClientProvider client={queryClient}>
        <ChildList />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByText("Lädt...")).not.toBeInTheDocument();
    });

    // screen.debug();
    const nameElements = screen.getAllByTestId("children-name");
    for (const [index, element] of nameElements.entries()) {
      expect(element).toHaveTextContent(
        `${CHILDREN_TEST_PAYLOAD.content[index].firstName} ${CHILDREN_TEST_PAYLOAD.content[index].lastName}`,
      );
    }
  });
  test("no children", async () => {
    const EMPTY_LIST: PageDTO<ChildDTO> = {
      content: [],
      totalPages: 0,
      totalElements: 0,
      size: 0,
      number: 0,
    };
    nock(new URL("http://localhost:8080"))
      .persist()
      .get(`${CHILDREN_URL}?page=${0}&size=${5}`)
      .reply(200, EMPTY_LIST);

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <ChildList />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByText("Lädt...")).not.toBeInTheDocument();
    });

    expect(container).toHaveTextContent("Keine Kinder hinzugefügt.");
  });
});

/** 
describe("ChildList Component", () => {
  const mockChildren = [
    { uuid: "1", firstName: "Max", lastName: "Mustermann", groupId: "g1" },
    { uuid: "2", firstName: "Erika", lastName: "Musterfrau", groupId: "g2" },
  ];

  const mockGroups = [
    { uuid: "g1", groupName: "Sonnengruppe" },
    { uuid: "g2", groupName: "Regenbogengruppe" },
  ];

  const mockMutate = vi.fn(); //speichert alle Argumenten und Daten

  beforeEach(() => {
    vi.clearAllMocks(); //before Test anfangen. Muss man einmal löschen alles
    //Default Mock für mehrere Testen
    (useChildApi as any).mockReturnValue({
      children: mockChildren,
      totalPages: 1,
      isLoading: false,
      error: null,
      groups: mockGroups,
      kindergartens: [],
      updateMutation: { mutateAsync: vi.fn() },
      deleteMutation: { mutateAsync: mockMutate },
      deactivateMutation: { mutateAsync: vi.fn() },
    });

    vi.spyOn(window, "confirm").mockReturnValue(true);
  });

  test("sollte die Liste der Kinder und deren Gruppennamen korrekt rendern", () => {
    render(<ChildList />);

    expect(screen.getByText("Max Mustermann")).toBeInTheDocument();
    expect(screen.getByText("Erika Musterfrau")).toBeInTheDocument();
    expect(screen.getByText("Gruppe: Sonnengruppe")).toBeInTheDocument();
  });

  test("sollte eine Ladeanzeige rendern, wenn isLoading true ist", () => {
    (useChildApi as any).mockReturnValue({
      isLoading: true,
      children: [],
      groups: [],
    });

    render(<ChildList />);
    expect(screen.getByText("Lädt...")).toBeInTheDocument();
  });

  test("sollte deleteMutation aufrufen, wenn die Löschen-Schaltfläche geklickt wird", async () => {
    render(<ChildList />);

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockMutate).toHaveBeenCalledWith("1");
  });

  test("sollte das Bearbeitungs-Dialogfeld öffnen, wenn auf Edit geklickt wird", async () => {
    render(<ChildList />);

    const editButtons = screen.getAllByRole("button", { name: /edit/i });
    fireEvent.click(editButtons[0]);

    expect(screen.getByText("Kind bearbeiten")).toBeInTheDocument();
  });
});
*/
