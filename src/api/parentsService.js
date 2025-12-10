import { fetchService } from "./fetchService.js";

export const parentsAPI = {
    getAll: () => fetchService("/api/parents"),
    create: (data) => fetchService("/api/parents", {
        method: "POST",
        body: data
    }),
};

export const childAPI = {
    getAll: () => fetchService("/api/children"),
};
