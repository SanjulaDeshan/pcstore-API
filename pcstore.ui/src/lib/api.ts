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
  
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

import { cookies } from 'next/headers';

export async function authFetcher(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}