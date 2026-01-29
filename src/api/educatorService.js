import { fetchService } from "./fetchService";

const EDUCATORS_URL = "/api/educators";

export const educatorAPI = {
  getAll: () => fetchService(EDUCATORS_URL),
  getInfo: () => fetchService(`${EDUCATORS_URL}/miniInfo`),
  getById: (id) => fetchService(`${EDUCATORS_URL}/${uuid}`),
  create: (data) =>
    fetchService(EDUCATORS_URL, {
      method: "POST",
      body: data,
    }),
  update: (uuid, data) =>
    fetchService(`${EDUCATORS_URL}/${uuid}`, {
      method: "PUT",
      body: data,
    }),
  delete: (uuid) =>
    fetchService(`${EDUCATORS_URL}/${uuid}`, {
      method: "DELETE",
    }),
};
