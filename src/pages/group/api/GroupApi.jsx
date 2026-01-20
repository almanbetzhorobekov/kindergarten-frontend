import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { groupAPI } from "../../../api/groupService";

const QUERY_KEY_GROUPS = "groups";

export function useGroupApi() {
  const queryClient = useQueryClient();

  const {
    data: groups = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY_GROUPS],
    queryFn: () => groupAPI.getAll().then((res) => res),
  });

  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }) => groupAPI.update(uuid, data),
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEY_GROUPS]),
  });

  const deleteMutation = useMutation({
    mutationFn: (uuid) => groupAPI.delete(uuid),
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEY_GROUPS]),
  });

  return {
    groups,
    isLoading,
    error,
    updateMutation,
    deleteMutation,
  };
}
