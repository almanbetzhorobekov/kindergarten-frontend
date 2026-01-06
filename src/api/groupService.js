import { fetchService } from "./fetchService";

const GROUPS_URL = "/api/groups";

export const groupAPI = {
  getAll: () => fetchService(GROUPS_URL),

  getById: (id) => fetchService(`${GROUPS_URL}/${id}`),

  create: (data) =>
    fetchService(GROUPS_URL, {
      method: "POST",
      body: data,
    }),

  update: (id, data) =>
    fetchService(`${GROUPS_URL}/${id}`, {
      method: "PUT",
      body: data,
    }),

  delete: (id) =>
    fetchService(`${GROUPS_URL}/${id}`, {
      method: "DELETE",
    }),
};
