import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { kindergartenAPI } from "../../../api/kindergartenService";
import { childAPI } from "../../../api/childService";

const QUERY_KEY_KINDERGARTENS = "kindergartens";

export const ITEMS_PER_PAGE = 5;

export function useKindergartenApi({ reset, page = 1 }) {
  const queryClient = useQueryClient();

  const { data: kindergartens = [] } = useQuery({
    queryKey: [QUERY_KEY_KINDERGARTENS],
    queryFn: kindergartenAPI.getAll,
  });

  const {
    data: kindergarten = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY_KINDERGARTENS, page],
    queryFn: () => kindergartenAPI.getAll(page - 1, ITEMS_PER_PAGE),
    keepPreviousData: true,
  });

  const mutation = useMutation({
    mutationFn: childAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY_KINDERGARTENS]);
      reset?.();
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }) => kindergartenAPI.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries([QUERY_KEY_KINDERGARTENS, page]),
  });

  const deleteMutation = useMutation({
    mutationFn: (uuid) => kindergartenAPI.delete(uuid),
    onSuccess: () =>
      queryClient.invalidateQueries([QUERY_KEY_KINDERGARTENS, page]),
  });

  return {
    kindergartens,
    isLoading,
    kindergarten,
    error,
    mutation,
    updateMutation,
    deleteMutation,
  };
}
