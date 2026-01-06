import { fetchService } from "./fetchService";

const KINDERGARTENS_URL = "/api/kindergartens";

export const kindergartenAPI = {
  getAll: () => fetchService(KINDERGARTENS_URL),
  //nur Kindergarten ohne verbundende Objecten
  getMini: () => fetchService(`${KINDERGARTENS_URL}/mini`),

  getById: (id) => fetchService(`${KINDERGARTENS_URL}/${id}`),

  create: (data) =>
    fetchService(KINDERGARTENS_URL, {
      method: "POST",
      body: data,
    }),

  update: (id, data) =>
    fetchService(`${KINDERGARTENS_URL}/${id}`, {
      method: "PUT",
      body: data,
    }),

  delete: (id) =>
    fetchService(`${KINDERGARTENS_URL}/${id}`, {
      method: "DELETE",
    }),
};
