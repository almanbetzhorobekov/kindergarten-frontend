const API_BASE = "http://localhost:8080/api/kindergartens";

export async function fetchKindergartens() {
  const res = await fetch(API_BASE);

  if (res.status === 204) return [];

  if (!res.ok) {
    throw new Error("Fehler beim Laden der Kindergärten");
  }

  return res.json();
}

export async function createKindergarten(kindergarten) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(kindergarten),
  });

  if (!res.ok) {
    throw new Error("Fehler beim Erstellen des Kindergartens");
  }

  return res.json();
}
