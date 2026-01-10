export async function fetchService(endpoint, requestOptions) {
  const res = await fetch("http://localhost:8080" + endpoint, {
    method: requestOptions?.method || "GET",
    headers: { "Content-Type": "application/json" },
    body: requestOptions?.body ? JSON.stringify(requestOptions.body) : null,
  });

  if (!res.ok) {
    throw new Error("Fehler bei Kommunikation mit dem Server");
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
