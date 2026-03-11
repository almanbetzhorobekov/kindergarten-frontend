import { renderHook, waitFor } from "@testing-library/react";
import { useChildApi } from "./ChildApi";
import { childAPI } from "api/childService";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, test, vi, expect } from "vitest";
import React from "react";
import { CreateChildDTO } from "api/child.type";
import { UpdateChildDTO } from "api/child.type";
import { kindergartenAPI } from "api/kindergartenService";
import { groupAPI } from "api/groupService";

vi.mock("../../../api/childService", () => ({
  childAPI: {
    create: vi.fn(),
    getAll: vi.fn(),
    delete: vi.fn(),
    deactivate: vi.fn(),
    changeGroup: vi.fn(),
    update: vi.fn(),
  },
}));

vi.mock("../../../api/kindergartenService", () => ({
  kindergartenAPI: {
    getAll: vi.fn(),
  },
}));

vi.mock("../../../api/groupService", () => ({
  groupAPI: {
    getAll: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useChildApi", () => {
  beforeEach(() => {
    vi.mocked(childAPI.getAll).mockResolvedValue({
      content: [],
      totalPages: 0,
      totalElements: 0,
      size: 0,
      number: 0,
    });

    vi.mocked(kindergartenAPI.getAll).mockResolvedValue([]);
    vi.mocked(groupAPI.getAll).mockResolvedValue([]);
  });
  test("Soll beim Erstellen eines Kindes childAPI.create aufrufen", async () => {
    const { result } = renderHook(() => useChildApi({}), {
      wrapper: createWrapper(),
    });

    const newChild: CreateChildDTO = {
      firstName: "Hugo",
      lastName: "Schneider",
      groupId: "1",
      birthday: "2022-02-02",
      parentsId: [],
    };

    vi.mocked(childAPI.create).mockResolvedValue({
      uuid: "123",
      ...newChild,
    });

    result.current.createChild.mutate(newChild);

    await waitFor(() => {
      expect(childAPI.create).toHaveBeenCalledWith(newChild);
    });
  });

  describe("useChildApi", () => {
    test("Soll beim Delete eines Kindes childApi.delete aufrufen", async () => {
      const childUuid = "test-uuid-123";

      vi.mocked(childAPI.delete).mockResolvedValue(undefined);

      const { result } = renderHook(() => useChildApi({}), {
        wrapper: createWrapper(),
      });

      result.current.deleteMutation.mutate(childUuid);

      await waitFor(() => {
        expect(childAPI.delete).toHaveBeenCalledWith(childUuid);
      });
    });
  });

  describe("useChildApi", () => {
    test("Soll beim Update eines Kindes childAPI.update", async () => {
      const childUuid = "test-uuid-123";
      const updateData: UpdateChildDTO = {
        firstName: "Max",
        lastName: "Mustermann",
        groupId: "group-B",
        birthday: "2021-05-10",
      };

      vi.mocked(childAPI.update).mockResolvedValue(undefined);

      const { result } = renderHook(() => useChildApi({}), {
        wrapper: createWrapper(),
      });

      result.current.updateMutation.mutate({
        uuid: childUuid,
        data: updateData,
      });

      await waitFor(() => {
        expect(childAPI.update).toHaveBeenCalledWith(childUuid, updateData);
      });
    });
  });

  describe("useChildApi", () => {
    test("Soll beim Deactivate eines Kindes childApi.deactivate aufrufen", async () => {
      const childUuid = "test-uuid-123";

      vi.mocked(childAPI.deactivate).mockResolvedValue(undefined);

      const { result } = renderHook(() => useChildApi({}), {
        wrapper: createWrapper(),
      });

      result.current.deactivateMutation.mutate(childUuid);

      await waitFor(() => {
        expect(childAPI.deactivate).toHaveBeenCalledWith(childUuid);
      });
    });
  });

  describe("Soll beim Ändern der Gruppe childApi.changeGroup mit ruchtigen Parametern aufrufen", async () => {
    const childUuid = "test-uuid-123";
    const newGroupId = "group-abc";

    vi.mocked(childAPI.changeGroup).mockResolvedValue(undefined);

    const { result } = renderHook(() => useChildApi({}), {
      wrapper: createWrapper(),
    });

    result.current.changeGroupMutation.mutate({
      uuid: childUuid,
      groupId: newGroupId,
    });

    await waitFor(() => {
      expect(childAPI.changeGroup).toHaveBeenCalledWith(childUuid, newGroupId);
    });
  });
});
