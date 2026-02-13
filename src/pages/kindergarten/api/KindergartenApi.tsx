import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import {
  KindergartenDTO,
  CreateKindergartenDTO,
  UpdateKindergartenDTO,
} from "api/kindergarten.type";
import { kindergartenAPI } from "../../../api/kindergartenService";

export const QUERY_KEY_KINDERGARTENS = "kindergartens";

type UpdateParams = {
  uuid: string;
  data: UpdateKindergartenDTO;
};

export function useKindergartenApi() {
  const queryClient = useQueryClient();

  const {
    data: kindergartens = [],
    isLoading,
    error,
  } = useQuery<KindergartenDTO[]>({
    queryKey: [QUERY_KEY_KINDERGARTENS],
    queryFn: kindergartenAPI.getAll,
  });

  const createMutation = useMutation<void, Error, CreateKindergartenDTO>({
    mutationFn: kindergartenAPI.create,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_KINDERGARTENS],
      }),
  });

  const updateMutation = useMutation<void, Error, UpdateParams>({
    mutationFn: ({ uuid, data }) => kindergartenAPI.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_KINDERGARTENS],
      }),
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: kindergartenAPI.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_KINDERGARTENS],
      }),
  });

  return {
    kindergartens,
    isLoading,
    error,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
