import { fetchService } from "./fetchService";
import {
  CreateKindergartenDTO,
  KindergartenDTO,
  UpdateKindergartenDTO,
} from "./kindergarten.type";

const KINDERGARTENS_URL = "/api/kindergartens";

export const kindergartenAPI = {
  getAll: (): Promise<KindergartenDTO[]> => fetchService(KINDERGARTENS_URL),

  getMini: (): Promise<KindergartenDTO[]> =>
    fetchService(`${KINDERGARTENS_URL}/mini`),

  getById: (uuid: string): Promise<KindergartenDTO> =>
    fetchService(`${KINDERGARTENS_URL}/${uuid}`),

  create: (data: CreateKindergartenDTO): Promise<void> =>
    fetchService(KINDERGARTENS_URL, {
      method: "POST",
      body: data,
    }),

  update: (uuid: string, data: UpdateKindergartenDTO): Promise<void> =>
    fetchService(`${KINDERGARTENS_URL}/${uuid}`, {
      method: "PUT",
      body: data,
    }),

  delete: (uuid: string) =>
    fetchService(`${KINDERGARTENS_URL}/${uuid}`, {
      method: "DELETE",
    }),
};
