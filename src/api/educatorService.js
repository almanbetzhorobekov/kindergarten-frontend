export async function addEducator(data) {
  const res = await fetch("http://localhost:8080/api/educators", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Fehler beim Speichern");

  return res.json();
}

export async function fetchEducators() {
  const res = await fetch("http://localhost:8080/api/educators");

  if (!res.ok) throw new Error("Fehler beim Laden");

  return res.json();
}

export async function fetchService(endpoint, requestOptions) {
    
    const res = await fetch("http://localhost:8080" + endpoint, {
    method: requestOptions?.method || "GET",
    headers: { "Content-Type": "application/json" },
    body: requestOptions?.body ? JSON.stringify(requestOptions.body) : null,

  });

  if (!res.ok) throw new Error("Fehler bei Kommunikation mit dem Server");

  return res.json();

}
fetchService("/api/kindergartens", { method: "GET"});
fetchService("/api/educators");