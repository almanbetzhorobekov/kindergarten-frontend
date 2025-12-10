import { fetchService } from "./fetchService";

export const educatorAPI = {
  getAll: () => fetchService("/api/educators"),
  create: (data) => fetchService("/api/educators", {
     method: "POST", 
     body: data 
    }),
};

export const kindergartenAPI = {
  getAll: () => fetchService("/api/kindergartens"),
};

export const groupAPI = {
  getAll: () => fetchService("/api/groups"),
};
