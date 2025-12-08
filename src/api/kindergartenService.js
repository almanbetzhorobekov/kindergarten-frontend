import { fetchService } from "./fetchService";

const API_BASE = "/api/kindergartens";

export const fetchKindergartens = () => {
  return fetchService(API_BASE + "/mini");
};

export const createKindergarten = (newKita) => {
  return fetchService(API_BASE, {
    method: "POST",
    body: newKita,
  });
};