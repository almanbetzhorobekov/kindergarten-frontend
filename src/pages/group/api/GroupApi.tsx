import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import {
  GroupDTO,
  CreateGroupDTO,
  UpdateGroupDTO,
} from "api/group.type";
import { groupAPI } from "api/groupService";

export const QUERY_KEY_GROUPS = "groups";

type UpdateParams = {
  uuid: string;
  data: UpdateGroupDTO;
};

export function useGroupApi() {
  const queryClient = useQueryClient();

  const {
    data: groups = [],
    isLoading,
    error,
  } = useQuery<GroupDTO[]>({
    queryKey: [QUERY_KEY_GROUPS],
    queryFn: groupAPI.getAll,
  });

  const createMutation = useMutation<GroupDTO, Error, CreateGroupDTO>({
    mutationFn: groupAPI.create,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_GROUPS],
      }),
  });

  const updateMutation = useMutation<void, Error, UpdateParams>({
    mutationFn: ({ uuid, data }) =>
      groupAPI.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_GROUPS],
      }),
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: groupAPI.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_GROUPS],
      }),
  });

  return {
    groups,
    isLoading,
    error,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
