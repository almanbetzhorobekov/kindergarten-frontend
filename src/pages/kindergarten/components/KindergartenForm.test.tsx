import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, beforeEach, afterEach } from "vitest";
import nock from "nock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import KindergartenForm from "./KindergartenForm";
import { KINDERGARTENS_URL } from "api/kindergartenService";
const API_BASE = "http://localhost:8080";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("KindergartenForm", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test("should submit form and call API", async () => {
    const user = userEvent.setup();

    const scope = nock(API_BASE)
      .post(KINDERGARTENS_URL, {
        kindergartenName: "Test Kindergarten",
        address: {
          street: "Teststraße",
          houseNumber: "10",
          plz: "53111",
          city: "Bonn",
        },
      })
      .reply(201, {});

    render(
      <QueryClientProvider client={queryClient}>
        <KindergartenForm />
      </QueryClientProvider>,
    );

    await user.type(
      screen.getByLabelText(/Kindergartenname/i),
      "Test Kindergarten",
    );
    await user.type(screen.getByLabelText(/Straße/i), "Teststraße");
    await user.type(screen.getByLabelText(/Hausnummer/i), "10");
    await user.type(screen.getByLabelText(/PLZ/i), "53111");
    await user.type(screen.getByLabelText(/Stadt/i), "Bonn");

    await user.click(screen.getByRole("button", { name: /erstellen/i }));

    await waitFor(() => {
      expect(scope.isDone()).toBe(true);
    });
  });
});
