import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { parentsAPI } from "api/parentsService";
import {
  UpdateParentsDTO,
  ParentsDTO,
  CreateParentsDTO,
} from "api/parents.type";

const QUERY_KEY_PARENTS = "parents";

interface ParentsResponse {
  content: ParentsDTO[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

type UseParentsApiParams = {
  reset?: () => void;
  page?: number;
};

export function useParentsApi({ reset, page = 1 }: UseParentsApiParams = {}) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<ParentsResponse>({
    queryKey: [QUERY_KEY_PARENTS, page],
    queryFn: () => parentsAPI.getAll(page - 1, 10),
  });

  const parents: ParentsDTO[] =
    data?.content ?? (Array.isArray(data) ? data : []);
  const totalPages: number = data?.totalPages ?? 1;

  const createParents = useMutation({
    mutationFn: (data: CreateParentsDTO) => parentsAPI.create(data as any),
    onSuccess: (response) => {
      console.log("Успешно создано:", response);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PARENTS] });
      reset?.();
    },
  });

  type UpdateParams = {
    uuid: string;
    data: UpdateParentsDTO;
  };

  const updateMutation = useMutation<void, Error, UpdateParams>({
    mutationFn: ({ uuid, data }) => parentsAPI.update(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PARENTS] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => parentsAPI.delete(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PARENTS] });
    },
  });

  return {
    parents,
    totalPages,
    isLoading,
    error,
    createParents,
    updateMutation,
    deleteMutation,
  };
}
