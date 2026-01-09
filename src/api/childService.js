import { fetchService } from "./fetchService";

const CHILDREN_URL = "/api/children";

export const childAPI = {
  getAll: () => fetchService(CHILDREN_URL),

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

  deactivate: (uuid) =>
    fetchService(`${CHILDREN_URL}/${uuid}/deactivate`, {
      method: "PUT",
    }),

  changeGroup: (uuid, groupId) =>
    fetchService(`${CHILDREN_URL}/${uuid}/change-group/${groupId}`, {
      method: "PUT",
    }),
};
