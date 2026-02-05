import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { kindergartenAPI } from "api/kindergartenService";
import { KindergartenDTO } from "api/kindergarten.type";
import { GroupDTO } from "api/group.type";
import { groupAPI } from "../../../api/groupService";

const QUERY_KEY_EDUCATOR = "educator";
const QUERY_KEY_KINDERGARTENS = "kindergartens";
const QUERY_KEY_GROUPS = "groups";

import { ITEMS_PER_PAGE } from "pages/child/api/ChildApi";
import { EducatorDTO } from "api/educator.type";
import { educatorAPI } from "api/educatorService";

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
    queryFn: educatorAPI.getAll,
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
    mutationFn: ({uuid, data}) => educatorAPI.update(uuid, data),
    onSuccess: () => queryClient.invalidateQueries({
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
