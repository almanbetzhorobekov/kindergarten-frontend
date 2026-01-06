import { fetchService } from "./fetchService";

const CHILDREN_URL = "/api/children";

export const childAPI = {
  getAll: () => fetchService(CHILDREN_URL),
  create: (data) =>
    fetchService(CHILDREN_URL, {
      method: "POST",
      body: data,
    }),
};
