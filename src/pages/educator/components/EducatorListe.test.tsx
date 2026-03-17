import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, describe, test, beforeEach } from "vitest";
import EducatorListe from "./EducatorListe";
import { useEducatorApi } from "../api/EducatorApi";
import { EducatorDTO } from "api/educator.type";

vi.mock("../api/EducatorApi");

const mockDelete = vi.fn();
const mockUpdate = vi.fn();

const EDUCATOR_TEST_PAYLOAD: EducatorDTO[] = [
  {
    firstName: "Max",
    lastName: "Mustermann",
    birthday: null,
    uuid: "12",
    email: "maxi@gamil.com",
    phoneNumber: "01861235488",
    kindergartenId: "k3",
    groupIds: [],
    addressDTO: {
      uuid: "a1",
      plz: "523477",
      street: "Haupstraße",
      houseNumber: "10",
      city: "Alsdorf",
    },
  },
];

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

describe("EducatorListe component (unit)", () => {
  beforeEach(() => {
    queryClient.clear();
    mockDelete.mockReset();
    mockUpdate.mockReset();

    (useEducatorApi as any).mockReturnValue({
      educators: EDUCATOR_TEST_PAYLOAD,
      totalPages: 1,
      isLoading: false,
      error: null,
      deleteMutation: { mutate: mockDelete },
      updateMutation: { mutateAsync: mockUpdate },
    });
  });

  test("renders educators", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EducatorListe />
      </QueryClientProvider>,
    );

    const edu = EDUCATOR_TEST_PAYLOAD[0];
    expect(
      screen.getByText(`${edu.firstName} ${edu.lastName}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${edu.email} | ${edu.phoneNumber}`),
    ).toBeInTheDocument();
    expect(screen.getByText(/Gruppen:/)).toBeInTheDocument();
  });

  test("delete button calls deleteMutation", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EducatorListe />
      </QueryClientProvider>,
    );

    window.confirm = vi.fn(() => true);

    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));

    expect(mockDelete).toHaveBeenCalledWith(EDUCATOR_TEST_PAYLOAD[0].uuid);
  });

  test("shows loading state", async () => {
    (useEducatorApi as any).mockReturnValue({
      educators: [],
      totalPages: 0,
      isLoading: true,
      error: null,
      deleteMutation: { mutate: mockDelete },
      updateMutation: { mutateAsync: mockUpdate },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <EducatorListe />
      </QueryClientProvider>,
    );

    expect(screen.getByText("Laden...")).toBeInTheDocument();
  });

  test("shows error state", async () => {
    (useEducatorApi as any).mockReturnValue({
      educators: [],
      totalPages: 0,
      isLoading: false,
      error: true,
      deleteMutation: { mutate: mockDelete },
      updateMutation: { mutateAsync: mockUpdate },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <EducatorListe />
      </QueryClientProvider>,
    );

    expect(screen.getByText("Fehler beim Laden.")).toBeInTheDocument();
  });
});

/*import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EducatorDTO } from "api/educator.type";
import { PageDTO } from "api/page.type";
import nock from "nock";
import { EDUCATORS_URL } from "api/educatorService";
import EducatorListe from "./EducatorListe";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import { useEducatorApi } from "../api/EducatorApi";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const EDUCATOR_TEST_PAYLOAD: PageDTO<EducatorDTO> = {
  content: [
    {
      firstName: "Max",
      lastName: "Mustermann",
      birthday: null,
      uuid: "12",

      email: "maxi@gamil.com",
      phoneNumber: "01861235488",
      kindergartenId: "k3",

      groupIds: [],

      addressDTO: {
        uuid: "a1",
        plz: "523477",
        street: "Haupstraße",
        houseNumber: "10",
        city: "Alsdorf",
      },
    },
  ],
  totalPages: 1,
  totalElements: 1,
  size: 1,
  number: 0,
};

describe("EducatorList komponent", () => {
  beforeEach(() => {
    queryClient.resetQueries();
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test("initial page load", async () => {
    nock("http://localhost:8080")
      .get(`${EDUCATORS_URL}?page=1&size=1`)
      .reply(200, EDUCATOR_TEST_PAYLOAD);

    render(
      <QueryClientProvider client={queryClient}>
        <EducatorListe />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByText("Laden...")).not.toBeInTheDocument();
    });

    const educator = EDUCATOR_TEST_PAYLOAD.content[0];
    expect(
      screen.getByText(`${educator.firstName} ${educator.lastName}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${educator.email} | ${educator.phoneNumber}`),
    ).toBeInTheDocument();
    expect(screen.getByText(/Gruppen:/)).toBeInTheDocument();

    test("shows error if API fails", async () => {
      nock("http://localhost:8080")
        .get(`${EDUCATORS_URL}?page=${1}&size=${1}`)
        .reply(500);

      render(
        <QueryClientProvider client={queryClient}>
          <EducatorListe />
        </QueryClientProvider>,
      );

      await waitFor(() => {
        expect(screen.getByText("Fehler beim Laden.")).toBeInTheDocument();
      });
    });

    test("delete button calls deleteMutation", async () => {
      const mockDelete = vi.fn();

      vi.mock("api/EducatorApi", async () => {
        const actual = await vi.importActual("../api/EducatorApi");
        return {
          ...actual,
          useEducatorApi: () => ({
            educators: EDUCATOR_TEST_PAYLOAD.content,
            totalPages: 1,
            isLoading: false,
            error: null,
            deleteMutation: { mutate: mockDelete },
            updateMutation: { mutateAsync: vi.fn() },
          }),
        };
      });

      render(
        <QueryClientProvider client={queryClient}>
          <EducatorListe />
        </QueryClientProvider>,
      );

      window.confirm = vi.fn(() => true);
      fireEvent.click(screen.getByRole("button", { name: /Delete/i }));

      expect(mockDelete).toHaveBeenCalledWith(
        EDUCATOR_TEST_PAYLOAD.content[0].uuid,
      );
    });
  });
});
*/
