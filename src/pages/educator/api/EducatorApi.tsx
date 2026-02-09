import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { kindergartenAPI } from "api/kindergartenService";
import { educatorAPI } from "api/educatorService";
import { groupAPI } from "../../../api/groupService";

import { KindergartenDTO } from "api/kindergarten.type";
import { EducatorDTO } from "api/educator.type";
import { GroupDTO } from "api/group.type";

const QUERY_KEY_EDUCATOR = "educator";
const QUERY_KEY_KINDERGARTENS = "kindergartens";
const QUERY_KEY_GROUPS = "groups";

type UseEducatorApiParams = {
  reset?: () => void;
  page?: number;
};

export function useEducatorApi({ reset, page = 1 }: UseEducatorApiParams) {
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
    data: educators = [],
    isLoading,
    error,
  } = useQuery<EducatorDTO[]>({
    queryKey: [QUERY_KEY_EDUCATOR, page],
    queryFn: () => educatorAPI.getAll(page),
  });

  const createEducator = useMutation({
    mutationFn: educatorAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_EDUCATOR],
      });
      reset?.();
    },
  });

  type UpdateEducatorDTO = Partial<Omit<EducatorDTO, "uuid">>;

  type UpdateEducatorParams = {
    uuid: string;
    data: UpdateEducatorDTO;
  };

  const updateMutation = useMutation<void, Error, UpdateEducatorParams>({
    mutationFn: ({ uuid, data }) => educatorAPI.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_EDUCATOR],
      }),
  });

  type DeleteEducatorParams = string;

  const deleteMutation = useMutation<void, Error, DeleteEducatorParams>({
    mutationFn: (uuid) => educatorAPI.delete(uuid),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_EDUCATOR, page],
      }),
  });

  return {
    kindergartens,
    groups,
    educators,
    isLoading,
    error,
    createEducator,
    updateMutation,
    deleteMutation,
  };
}
