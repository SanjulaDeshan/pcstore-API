// src/lib/api.ts
const API_BASE_URL = "https://localhost:7297/api"; // Your .NET Port

export async function fetcher(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}