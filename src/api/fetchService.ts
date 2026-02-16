export async function fetchService(
  endpoint: string,
  requestOptions?: { method?: string; body?: unknown },
) {
  const options: RequestInit = {
    method: requestOptions?.method || "GET",
  };

  if (requestOptions?.body) {
    options.body = JSON.stringify(requestOptions.body);
    options.headers = { "Content-Type": "application/json" };
  }

  const res = await fetch("http://localhost:8080" + endpoint, options);

  const contentType = res.headers.get("Content-Type");
  if (contentType?.includes("application/json")) {
    return await res.json();
  }
  return null;
}
