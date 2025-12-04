import { fetchService } from "./fetchService";

export const childAPI = {
  getAll: () => fetchService("/api/children"),
  create: (data) => fetchService("/api/children", { method: "POST", body: data }),
};
//ruft die Endpunkte für Kindergärten und Gruppen ab
export const kindergartenAPI = {
  getAll: () => fetchService("/api/kindergartens"),
};

export const groupAPI = {
  getAll: () => fetchService("/api/groups"),
};
