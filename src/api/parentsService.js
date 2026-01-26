import { fetchService } from "./fetchService.js";

const PARENTS_URL = "/api/parents";

export const parentsAPI = {
  getAll: (page = 0, size = 5) =>
    fetchService(`${PARENTS_URL}?page=${page}&size=${size}`),

  getMini: () => fetchService(`${PARENTS_URL}/mini`),
  getById: (id) => fetchService(`${PARENTS_URL}/${id}`),

  create: (data) =>
    fetchService(PARENTS_URL, {
      method: "POST",
      body: data,
    }),

  update: (uuid, data) =>
    fetchService(`${PARENTS_URL}/${uuid}`, {
      method: "PUT",
      body: data,
    }),

  delete: (uuid) =>
    fetchService(`${PARENTS_URL}/${uuid}`, {
      method: "DELETE",
    }),
};
