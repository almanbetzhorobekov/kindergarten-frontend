import { describe, test, expect } from "vitest";
import { ChildEditFormValues, mapFormToUpdateChild } from "./mapChildToUpdates";

describe("mapFormToUpdateChild", () => {
  test("Test muss korrekt die Daten Tranformieren als Object API", () => {
    const formData: ChildEditFormValues = {
      firstName: "Robert",
      lastName: "Jacob",
      birthday: "2022-01-01",
      kindergartenId: "k-2",
      groupId: "g-312",
    };

    const result = mapFormToUpdateChild(formData);

    expect(result).toEqual({
      firstName: "Robert",
      lastName: "Jacob",
      birthday: "2022-01-01",
      groupId: "g-312",
    });

    expect(result).not.toHaveProperty("kindergartenId");
  });

  test("Der Test prüft, ob auch leere Werte korrekt verarbeitet werden", () => {
    const emptyData: ChildEditFormValues = {
      firstName: "",
      lastName: "",
      birthday: "2020-01-01",
      kindergartenId: "1",
      groupId: "",
    };
    const result = mapFormToUpdateChild(emptyData);

    (expect(result.firstName).toBe(""), expect(result.groupId).toBe(""));
  });
});
