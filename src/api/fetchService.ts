export async function fetchService(
  endpoint: string,
  requestOptions?: { method?: string; body?: unknown },
) {
  const res = await fetch("http://localhost:8080" + endpoint, {
    method: requestOptions?.method || "GET",
    headers: { "Content-Type": "application/json" },
    body: requestOptions?.body ? JSON.stringify(requestOptions.body) : null,
  });

  const contentType = res.headers.get("Content-Type");
  if (contentType?.includes("application/json")) {
    return await res.json();
  }
  return null;
}
