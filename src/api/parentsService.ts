import { fetchService } from "./fetchService.js";
import { ParentsDTO, UpdateParentsDTO } from "./parents.type.js";

const PARENTS_URL = "/api/parents";

export const parentsAPI = {
  getAll: (page: number = 0, size: number = 10) =>
    fetchService(`${PARENTS_URL}?page=${page}&size=${size}`),

  getById: (uuid: string) => fetchService(`${PARENTS_URL}/${uuid}`),

  create: (data: ParentsDTO) =>
    fetchService(PARENTS_URL, {
      method: "POST",
      body: data,
    }),

  update: (uuid: string, data: UpdateParentsDTO): Promise<void> =>
    fetchService(`${PARENTS_URL}/${uuid}`, {
      method: "PUT",
      body: data,
    }),

  delete: (uuid: string) =>
    fetchService(`${PARENTS_URL}/${uuid}`, {
      method: "DELETE",
    }),
};
