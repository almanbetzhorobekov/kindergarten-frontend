import { fetchService } from "./fetchService";
import { CreateGroupDTO, GroupDTO, UpdateGroupDTO } from "./group.type";

const GROUPS_URL = "/api/groups";

export const groupAPI = {
  getAll: (): Promise<GroupDTO[]> => fetchService(GROUPS_URL),

  getById: (uuid: string): Promise<GroupDTO> =>
    fetchService(`${GROUPS_URL}/${uuid}`),

  create: (data: CreateGroupDTO): Promise<GroupDTO> =>
    fetchService(GROUPS_URL, {
      method: "POST",
      body: data,
    }),

  update: (uuid: string, data: UpdateGroupDTO) =>
    fetchService(`${GROUPS_URL}/${uuid}`, {
      method: "PUT",
      body: data,
    }),

  delete: (uuid: string) =>
    fetchService(`${GROUPS_URL}/${uuid}`, {
      method: "DELETE",
    }),
};
