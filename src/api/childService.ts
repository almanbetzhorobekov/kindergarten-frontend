import { fetchService } from "./fetchService";
import { ChildDTO, CreateChildDTO, UpdateChildDTO } from "./child.type";
import { PageDTO } from "./page.type";

const CHILDREN_URL = "/api/children";

export const childAPI = {
  getAll: (page = 0, size = 5): Promise<PageDTO<ChildDTO>> =>
    fetchService(`${CHILDREN_URL}?page=${page}&size=${size}`),

  getById: (uuid: string): Promise<ChildDTO> =>
    fetchService(`${CHILDREN_URL}/${uuid}`),

  create: (data: CreateChildDTO): Promise<ChildDTO> =>
    fetchService(CHILDREN_URL, {
      method: "POST",
      body: data,
    }),

  update: (uuid: string, data: UpdateChildDTO): Promise<void> =>
    fetchService(`${CHILDREN_URL}/${uuid}`, {
      method: "PUT",
      body: data,
    }),

  delete: (uuid: string) =>
    fetchService(`${CHILDREN_URL}/${uuid}`, {
      method: "DELETE",
    }),

  deactivate: (uuid: string) =>
    fetchService(`${CHILDREN_URL}/${uuid}/deactivate`, {
      method: "PUT",
    }),

  changeGroup: (uuid: string, groupId: string) =>
    fetchService(`${CHILDREN_URL}/${uuid}/change-group/${groupId}`, {
      method: "PUT",
    }),
};
