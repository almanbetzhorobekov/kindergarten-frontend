import { fetchService } from "./fetchService.js";
import { ParentsDTO } from "./parents.type.js";

const PARENTS_URL = "/api/parents";

export const parentsAPI = {
  getAll: () => fetchService(PARENTS_URL),
  getById: (uuid: string) => fetchService(`${PARENTS_URL}/${uuid}`),
  create: (data: ParentsDTO) =>
    fetchService(PARENTS_URL, {
      method: "POST",
      body: data,
    }),
  update: (uuid: string, data: ParentsDTO) =>
    fetchService(`${PARENTS_URL}/${uuid}`, {
      method: "PUT",
      body: data,
    }),
  delete: (uuid: string) =>
    fetchService(`${PARENTS_URL}/${uuid}`, {
      method: "DELETE",
    }),
};
