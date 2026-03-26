import { fetchService } from "./fetchService";
import { ParentsDTO, UpdateParentsDTO, CreateParentsDTO } from "./parents.type";

import { PageDTO } from "./page.type";

const PARENTS_URL = "/api/parents";

export const parentsAPI = {
  getAll: (page: number = 0, size: number = 10): Promise<PageDTO<ParentsDTO>> =>
    fetchService(`${PARENTS_URL}?page=${page}&size=${size}`),

  create: (data: CreateParentsDTO): Promise<ParentsDTO> =>
    fetchService(PARENTS_URL, { method: "POST", body: data }),

  update: (uuid: string, data: UpdateParentsDTO): Promise<void> =>
    fetchService(`${PARENTS_URL}/${uuid}`, { method: "PUT", body: data }),

  delete: (uuid: string): Promise<void> =>
    fetchService(`${PARENTS_URL}/${uuid}`, { method: "DELETE" }),
};
