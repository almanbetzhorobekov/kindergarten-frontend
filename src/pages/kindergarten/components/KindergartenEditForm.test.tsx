import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import KindergartenEditForm from "./KindergartenEditForm";

describe("KindergartenEditForm", () => {
  const mockOnSave = vi.fn();
  const mockOnCancel = vi.fn();

  const mockKindergarten = {
    uuid: "1",
    kindergartenName: "Kita",
    address: {
      plz: "12345",
      street: "Haupstraße",
      houseNumber: "1",
      city: "Alsdorf",
    },
  };

  test("renders with default values", async () => {
    render(
      <KindergartenEditForm
        kindergarten={mockKindergarten}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />,
    );

    expect(await screen.findByDisplayValue("Kita")).toBeInTheDocument();
    expect(screen.getByDisplayValue("12345")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Haupstraße")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Alsdorf")).toBeInTheDocument();
  });

  test("shows validation errors when fields are empty", async () => {
    const user = userEvent.setup();

    render(
      <KindergartenEditForm
        kindergarten={{
          uuid: "1",
          kindergartenName: "",
          address: { city: "", houseNumber: "", plz: "", street: "" },
        }}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />,
    );
    await user.click(screen.getByRole("button", { name: /Speichern/i }));

    expect(
      await screen.findByText(/Name ist erforderlich/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/PLZ ist erforderlich/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Straße ist erforderlich/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Hausnummer ist erforderlich/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Stadt ist erforderlich/i),
    ).toBeInTheDocument();
  });

  test("calls onSave with correct data", async () => {
    const user = userEvent.setup();

    render(
      <KindergartenEditForm
        kindergarten={{
          uuid: "1",
          kindergartenName: "",
          address: { city: "", houseNumber: "", plz: "", street: "" },
        }}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />,
    );

    await user.type(screen.getByLabelText(/Kindergarten Name/i), "Neue Kita");
    await user.type(screen.getByLabelText(/PLZ/i), "54321");
    await user.type(screen.getByLabelText(/Straße/i), "Neue Straße");
    await user.type(screen.getByLabelText(/Hausnummer/i), "2");
    await user.type(screen.getByLabelText(/Stadt/i), "Köln");

    await user.click(screen.getByRole("button", { name: /Speichern/i }));

    expect(mockOnSave).toHaveBeenCalledTimes(1);

    const [uuid, data] = mockOnSave.mock.calls[0];

    expect(uuid).toBe("1");

    expect(data).toMatchObject({
      kindergartenName: "Neue Kita",
      address: {
        plz: "54321",
        street: "Neue Straße",
        houseNumber: "2",
        city: "Köln",
      },
    });
  });

  test("calls onCancel", async () => {
    const user = userEvent.setup();

    render(
      <KindergartenEditForm
        kindergarten={mockKindergarten}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Abbrechen/i }));

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
