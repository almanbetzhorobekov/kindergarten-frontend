import { fetchService } from "./fetchService";
import {
  CreateEducatorDTO,
  EducatorDTO,
  UpdateEducatorDTO,
} from "./educator.type";

const EDUCATORS_URL = "/api/educators";

export const educatorAPI = {
  getAll: (page = 0, size = 10): Promise<any> =>
    fetchService(`${EDUCATORS_URL}?page=${page}&size=${size}`),

  getById: (uuid: string): Promise<EducatorDTO> =>
    fetchService(`${EDUCATORS_URL}/${uuid}`),

  create: (data: CreateEducatorDTO): Promise<EducatorDTO> =>
    fetchService(EDUCATORS_URL, {
      method: "POST",
      body: data,
    }),

  update: (uuid: string, data: UpdateEducatorDTO): Promise<void> =>
    fetchService(`${EDUCATORS_URL}/${uuid}`, {
      method: "PUT",
      body: data,
    }),
  delete: (uuid: string) =>
    fetchService(`${EDUCATORS_URL}/${uuid}`, {
      method: "DELETE",
    }),
};
