import { fetchService } from "./fetchService.js";

const PARENTS_URL = "/api/parents";

export const parentsAPI = {
  getAll: () => fetchService(PARENTS_URL),
  getById: (id) => fetchService(`${PARENTS_URL}/${id}`),
  create: (data) =>
    fetchService(PARENTS_URL, {
      method: "POST",
      body: data,
    }),
  update: (id, data) =>
    fetchService(`${PARENTS_URL}/${id}`, {
      method: "PUT",
      body: data,
    }),
  delete: (id) =>
    fetchService(`${PARENTS_URL}/${id}`, {
      method: "DELETE",
    }),
};
