export async function fetchService(
  endpoint: string,
  requestOptions?: { method?: string; body?: unknown },
) {
  const res = await fetch("http://localhost:8080" + endpoint, {
    method: requestOptions?.method || "GET",
    headers: { "Content-Type": "application/json" },
    body: requestOptions?.body ? JSON.stringify(requestOptions.body) : null,
  });

  if (!res.ok) {
    throw new Error("Fehler bei Kommunikation mit dem Server");
  }
  return await res.json();
}
