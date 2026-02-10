import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { KindergartenDTO } from "api/kindergarten.type";
import { kindergartenAPI } from "../../../api/kindergartenService";

const QUERY_KEY_KINDERGARTENS = "kindergartens"; //memory

export const ITEMS_PER_PAGE = 5;

type UseKindergartenParams = {
  reset?: () => void;
  page?: number;
};
export function useKinergartenApi({ reset, page }: UseKindergartenParams) {
  const queryClient = useQueryClient();

  const { data: kindergartens = [] } = useQuery<KindergartenDTO[]>({
    queryKey: [QUERY_KEY_KINDERGARTENS],
    queryFn: kindergartenAPI.getAll,
  });

  const {
    data: kindergarten = [],
    isLoading,
    error,
  } = useQuery<KindergartenDTO[]>({
    queryKey: [QUERY_KEY_KINDERGARTENS, page],
    queryFn: kindergartenAPI.getAll,
  });

  const createKindergraten = useMutation({
    mutationFn: kindergartenAPI.create,
    onSuccess: (data) => {
      console.log("onSuccess", data);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_KINDERGARTENS],
      });
      reset?.();
    },
  });

  type UpdateKindergartenDTO = Partial<Omit<KindergartenDTO, "uuid">>;

  type UpdateKindergartenParams = {
    uuid: string;
    data: UpdateKindergartenDTO;
  };

  const updateMutation = useMutation<void, Error, UpdateKindergartenParams>({
    mutationFn: ({ uuid, data }) => kindergartenAPI.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_KINDERGARTENS],
      }),
  });

  type DeleteKindergartensParams = string;

  const deleteMutation = useMutation<void, Error, DeleteKindergartensParams>({
    mutationFn: (uuid) => kindergartenAPI.delete(uuid),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_KINDERGARTENS, page],
      }),
  });

  return {
    kindergartens,
    isLoading,
    error,
    createKindergraten,
    updateMutation,
    deleteMutation,
    kindergarten,
  };
}
