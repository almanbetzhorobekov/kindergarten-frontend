import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChildEditForm from "./ChildEditForm";
import { vi, describe, it, expect } from "vitest";
import { ChildDTO } from "api/child.type";
import { GroupDTO } from "api/group.type";
import { KindergartenDTO } from "api/kindergarten.type";

describe("ChildEditForm Component", () => {
  const mockChild: ChildDTO = {
    uuid: "child-123",
    firstName: "Max",
    lastName: "Mustermann",
    birthday: "2020-05-20T00:00:00Z",
    groupId: "g1",
    parentsId: [],
  };

  const mockGroups: GroupDTO[] = [
    {
      uuid: "g1",
      groupName: "Sonnengruppe",
      kindergartenId: "k1",
      childList: [],
      kindergartenName: "Waldkita",
      educatorId: "educator-001",
    },
  ];

  const mockKindergartens: KindergartenDTO[] = [
    {
      uuid: "k1",
      address: {
        uuid: "3",
        street: "Musterstraße",
        houseNumber: "1",
        plz: "12345",
        city: "Berlin",
      },
      groups: [],
      educators: [],
      kindergartenName: "",
    },
  ];

  const mockOnSave = vi.fn();
  const mockOnCancel = vi.fn();

  test("sollte das Formular mit den vorhandenen Kinddaten vor", () => {
    render(
      <ChildEditForm
        child={mockChild}
        groups={mockGroups}
        kindergartens={mockKindergartens}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />,
    );

    expect(screen.getByLabelText(/vorname/i)).toHaveValue("Max");
    expect(screen.getByLabelText(/nachname/i)).toHaveValue("Mustermann");
  });

  test("sollte onSave mit den geänderten Daten aufrufen, wenn das Formular abgesendet wird", async () => {
    render(
      <ChildEditForm
        child={mockChild}
        groups={mockGroups}
        kindergartens={mockKindergartens}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />,
    );

    const firstNameInput = screen.getByLabelText(/vorname/i);

    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, "Moritz");

    const saveButton = screen.getByRole("button", { name: /speichern/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith(
        "child-123",
        expect.objectContaining({
          firstName: "Moritz",
        }),
      );
    });
  });

  test("sollte onCancel aufrufen, wenn die Abbrechen-Schaltfläche geklickt wird", () => {
    render(
      <ChildEditForm
        child={mockChild}
        groups={mockGroups}
        kindergartens={mockKindergartens}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /abbrechen/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
