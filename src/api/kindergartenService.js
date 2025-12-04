const API_BASE = "http://localhost:8080/api/kindergartens";

// GET
export const fetchKindergartens = async () => {
  const res = await fetch(API_BASE + "/mini");
  if (!res.ok) throw new Error("Fehler beim Laden");
  return res.json();
};

// POST
export const createKindergarten = async (newKita) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newKita),
  });
  if (!res.ok) throw new Error("Fehler beim Erstellen");
  return res.json();
};
