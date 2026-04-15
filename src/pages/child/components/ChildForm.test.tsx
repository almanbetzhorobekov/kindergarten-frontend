import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChildForm from "./ChildForm";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { TestingProvider } from "testing/testing";
import nock from "nock";
import { CHILDREN_URL } from "api/childService";
import { PageDTO } from "api/page.type";
import { ChildDTO } from "api/child.type";
import { queryClient } from "App";
import { KINDERGARTENS_URL } from "api/kindergartenService";
import { KindergartenDTO } from "api/kindergarten.type";

//vi.mock("../api/ChildApi");
describe("ChildForm (unit)", () => {
  /* const mockMutate = vi.fn();

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
  });*/

  beforeEach(() => {
    queryClient.resetQueries;
  });
  afterEach(() => {
    nock.cleanAll();
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

  test.only("submit calls mutate", async () => {
    nock(new URL("http://localhost:8080"))
      .persist()
      .get(`${CHILDREN_URL}?page=${0}&size=${5}`)
      .reply(200, CHILDREN_TEST_PAYLOAD)
      .get(KINDERGARTENS_URL)
      .reply(200, KINDERGARTENS_TEST_PAYLOAD);

    const user = userEvent.setup();
    const dings = nock("http://localhost:8080")
      .persist()
      .post(CHILDREN_URL, {})
      .reply(200);

    const { debug } = render(
      <TestingProvider>
        <ChildForm onAddChild={vi.fn()} />
      </TestingProvider>,
    );

    const firstNameEl: HTMLInputElement = screen.getByLabelText("Vorname");
    const firstNameValue = "Almanbet";
    await user.click(firstNameEl);
    await user.keyboard(firstNameValue);
    expect(firstNameEl).toHaveValue(firstNameValue);

    const lastNameEl: HTMLInputElement = screen.getByLabelText("Nachname");
    const lastNameValue = "Zhorobekov";
    await user.click(lastNameEl);
    await user.keyboard(lastNameValue);
    expect(lastNameEl).toHaveValue(lastNameValue);

    const birthdayEl: HTMLInputElement = screen.getByLabelText("Geburtsdatum");
    const birthdayValue = "2022-02-02";
    await user.click(birthdayEl);
    await user.keyboard(birthdayValue);
    expect(birthdayEl).toHaveValue(birthdayValue);

    const kindergartenIdEl: HTMLSelectElement =
      screen.getByLabelText("Kindergarten");
    await user.click(kindergartenIdEl);
    await user.selectOptions(kindergartenIdEl, KINDERGARTEN_ID); //Hier ich finde Problem
    expect(kindergartenIdEl).toHaveValue([KINDERGARTEN_ID]);

    const registerButtonEl = screen.getByRole("button", { name: /Anmelden/i });
    await user.click(registerButtonEl);

    expect(dings.isDone()).toBe(true);

    /*

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });*/
  });
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

const KINDERGARTEN_ID = "kindergarten-id";

const KINDERGARTENS_TEST_PAYLOAD: KindergartenDTO[] = [
  {
    uuid: KINDERGARTEN_ID,
    kindergartenName: "Kita Test",
    address: {
      uuid: "",
      city: "Bonn",
      plz: "53111",
      street: "Musterstraße",
      houseNumber: "1",
    },
    groups: [],
    educators: [],
  },
];
