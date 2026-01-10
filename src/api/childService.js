import { fetchService } from "./fetchService";

const CHILDREN_URL = "/api/children";

export const childAPI = {
  getAll: (page = 0, size = 5) =>
    fetchService(`${CHILDREN_URL}?page=${page}&size=${size}`),

  getById: (uuid) => fetchService(`${CHILDREN_URL}/${uuid}`),

  create: (data) =>
    fetchService(CHILDREN_URL, {
      method: "POST",
      body: data,
    }),

  update: (uuid, data) =>
    fetchService(`${CHILDREN_URL}/${uuid}`, {
      method: "PUT",
      body: data,
    }),

  delete: (uuid) =>
    fetchService(`${CHILDREN_URL}/${uuid}`, {
      method: "DELETE",
    }),

  deactivate: (uuid) =>
    fetchService(`${CHILDREN_URL}/${uuid}/deactivate`, {
      method: "PUT",
    }),

  changeGroup: (uuid, groupId) =>
    fetchService(`${CHILDREN_URL}/${uuid}/change-group/${groupId}`, {
      method: "PUT",
    }),
};
