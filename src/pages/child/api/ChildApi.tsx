import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { groupAPI } from "../../../api/groupService";
import { kindergartenAPI } from "../../../api/kindergartenService";
import { childAPI } from "../../../api/childService";
import { ChildDTO, CreateChildDTO } from "api/child.type";
import { GroupDTO } from "api/group.type";
import { KindergartenDTO } from "api/kindergarten.type";
import { UpdateChildDTO } from "api/child.type";
import { PageDTO } from "api/page.type";

const QUERY_KEY_CHILDREN = "children";
const QUERY_KEY_GROUPS = "groups";
const QUERY_KEY_KINDERGARTENS = "kindergartens";

export const ITEMS_PER_PAGE = 5;

type UseChildApiParams = {
  reset?: () => void;
  page?: number;
};

export function useChildApi({ reset, page = 1 }: UseChildApiParams) {
  const queryClient = useQueryClient();

  const { data: kindergartens = [] } = useQuery<KindergartenDTO[]>({
    queryKey: [QUERY_KEY_KINDERGARTENS],
    queryFn: kindergartenAPI.getAll,
  });

  const { data: groups = [] } = useQuery<GroupDTO[]>({
    queryKey: [QUERY_KEY_GROUPS],
    queryFn: groupAPI.getAll,
  });

  const {
    data: childrenPage,
    isLoading,
    error,
  } = useQuery<PageDTO<ChildDTO>>({
    queryKey: [QUERY_KEY_CHILDREN, page],
    queryFn: () => childAPI.getAll(page - 1, ITEMS_PER_PAGE),
  });

  const createChild = useMutation({
    mutationFn: (data: CreateChildDTO) => childAPI.create(data),
    onSuccess: (data) => {
      console.log("onSuccess", data);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_CHILDREN],
      });
      reset?.();
    },
    onError: (error) => {
      console.error("Fehler beim neu Kind Erstellen: ", error);
    },
  });

  type UpdateChildParams = {
    uuid: string;
    data: UpdateChildDTO;
  };

  const updateMutation = useMutation<void, Error, UpdateChildParams>({
    mutationFn: ({ uuid, data }) => childAPI.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_CHILDREN],
      }),
  });

  type DeleteChildParams = string;

  const deleteMutation = useMutation<void, Error, DeleteChildParams>({
    mutationFn: (uuid) => childAPI.delete(uuid),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_CHILDREN, page],
      }),
  });

  const deactivateMutation = useMutation<void, Error, string>({
    mutationFn: (uuid) => childAPI.deactivate(uuid),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_CHILDREN, page],
      }),
  });

  type ChangeGroupParams = {
    uuid: string;
    groupId: string;
  };

  const changeGroupMutation = useMutation<void, Error, ChangeGroupParams>({
    mutationFn: ({ uuid, groupId }) => childAPI.changeGroup(uuid, groupId),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_CHILDREN, page],
      }),
  });

  console.log(childrenPage, isLoading, error);

  return {
    kindergartens,
    groups,
    children: childrenPage?.content ?? [],
    totalPages: childrenPage?.totalPages ?? 0,
    isLoading,
    error,
    createChild,
    updateMutation,
    deleteMutation,
    deactivateMutation,
    changeGroupMutation,
  };
}
