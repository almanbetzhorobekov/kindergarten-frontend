import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { educatorAPI } from "../../../api/educatorService";
import { kindergartenAPI } from "../../../api/kindergartenService";
import { groupAPI } from "../../../api/groupService";
import { EducatorDTO, UpdateEducatorDTO } from "../../../api/educator.type";

const QUERY_KEY_EDUCATOR = "educators";

export function useEducatorApi({
  reset,
  page = 1,
}: { reset?: () => void; page?: number } = {}) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEY_EDUCATOR, page],
    queryFn: () => educatorAPI.getAll(page - 1, 5),
  });

  const educators: EducatorDTO[] =
    data?.content ?? (Array.isArray(data) ? data : []);
  const totalPages: number = data?.totalPages ?? 1;

  const { data: kindergartens = [] } = useQuery({
    queryKey: ["kindergartens"],
    queryFn: kindergartenAPI.getAll,
  });

  const { data: groups = [] } = useQuery({
    queryKey: ["groups"],
    queryFn: groupAPI.getAll,
  });

  const createEducator = useMutation({
    mutationFn: educatorAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_EDUCATOR] });
      reset?.();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateEducatorDTO }) =>
      educatorAPI.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_EDUCATOR] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => educatorAPI.delete(uuid),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_EDUCATOR] }),
  });

  return {
    educators,
    totalPages,
    kindergartens,
    groups,
    isLoading,
    error,
    createEducator,
    updateMutation,
    deleteMutation,
  };
}
