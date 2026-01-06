import { fetchService } from "./fetchService";

const EDUCATORS_URL = "/api/educators";

export const educatorAPI = {
  getAll: () => fetchService(EDUCATORS_URL),
  getById: (id) => fetchService(`${EDUCATORS_URL}/${id}`),
  create: (data) =>
    fetchService(EDUCATORS_URL, {
      method: "POST",
      body: data,
    }),
  update: (id, data) =>
    fetchService(`${EDUCATORS_URL}/${id}`, {
      method: "PUT",
      body: data,
    }),
  delete: (id) =>
    fetchService(`${EDUCATORS_URL}/${id}`, {
      method: "DELETE",
    }),
};
