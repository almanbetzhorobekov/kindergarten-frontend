import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { kindergartenAPI } from "../../../api/kindergartenService";

const QUERY_KEY_KINDERGARTENS = "kindergartens";

export function useKindergartenApi() {
  const queryClient = useQueryClient();

  const {
    data: kindergartens = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY_KINDERGARTENS],
    queryFn: () => kindergartenAPI.getAll().then((res) => res),
  });

  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }) => kindergartenAPI.update(uuid, data),
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEY_KINDERGARTENS]),
  });

  const deleteMutation = useMutation({
    mutationFn: (uuid) => kindergartenAPI.delete(uuid),
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEY_KINDERGARTENS]),
  });

  return {
    kindergartens,
    isLoading,
    error,
    updateMutation,
    deleteMutation,
  };
}
