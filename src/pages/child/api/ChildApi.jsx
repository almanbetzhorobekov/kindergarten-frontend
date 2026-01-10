import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { groupAPI } from "../../../api/groupService";
import { kindergartenAPI } from "../../../api/kindergartenService";
import { childAPI } from "../../../api/childService";

const QUERY_KEY_CHILDREN = "children";
const QUERY_KEY_GROUPS = "groups";
const QUERY_KEY_KINDERGARTENS = "kindergartens";

export const ITEMS_PER_PAGE = 5;

export function useChildApi({ reset, page = 1 }) {
  const queryClient = useQueryClient();

  const { data: kindergartens = [] } = useQuery({
    queryKey: [QUERY_KEY_KINDERGARTENS],
    queryFn: kindergartenAPI.getAll,
  });

  const { data: groups = [] } = useQuery({
    queryKey: [QUERY_KEY_GROUPS],
    queryFn: groupAPI.getAll,
  });

  const {
    data: children = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY_CHILDREN, page],
    queryFn: () => childAPI.getAll(page - 1, ITEMS_PER_PAGE),
    keepPreviousData: true,
  });

  const mutation = useMutation({
    mutationFn: childAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY_CHILDREN]);
      reset?.();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }) => childAPI.update(uuid, data),
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEY_CHILDREN, page]),
  });

  const deleteMutation = useMutation({
    mutationFn: (uuid) => childAPI.delete(uuid),
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEY_CHILDREN, page]),
  });

  const deactivateMutation = useMutation({
    mutationFn: (uuid) => childAPI.deactivate(uuid),
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEY_CHILDREN, page]),
  });

  const changeGroupMutation = useMutation({
    mutationFn: ({ uuid, groupId }) => childAPI.changeGroup(uuid, groupId),
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEY_CHILDREN, page]),
  });

  return {
    kindergartens,
    groups,
    children,
    isLoading,
    error,
    mutation,
    updateMutation,
    deleteMutation,
    deactivateMutation,
    changeGroupMutation,
  };
}
