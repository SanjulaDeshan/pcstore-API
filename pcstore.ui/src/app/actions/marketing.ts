'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const API_BASE = 'https://localhost:7297/api';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  console.log("fetchWithAuth URL:", url, "Method:", options.method || 'GET', "HasToken:", !!token);

  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
}

export async function addAdvertisement(formData: FormData) {
  const data = {
    title: formData.get('title')?.toString() || '',
    subtitle: formData.get('subtitle')?.toString() || '',
    imageUrl: formData.get('imageUrl')?.toString() || '',
    linkUrl: formData.get('linkUrl')?.toString() || '',
    isActive: formData.get('isActive') === 'on',
    sortOrder: Number(formData.get('sortOrder') || 0)
  };

  console.log("Sending Add Advertisement Payload:", data);

  const res = await fetchWithAuth(`${API_BASE}/Advertisement`, {
    method: 'POST',
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create advertisement: ${res.status} ${res.statusText} - ${errorText}`);
  }

  revalidatePath('/admin/dashboard/ads');
  revalidatePath('/');
  redirect('/admin/dashboard/ads');
}

export async function deleteAdvertisement(id: string) {
  const res = await fetchWithAuth(`${API_BASE}/Advertisement/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to delete advertisement: ${res.status} ${res.statusText} - ${errorText}`);
  }

  revalidatePath('/admin/dashboard/ads');
  revalidatePath('/');
}

export async function toggleAdvertisementStatus(id: string, currentStatus: boolean, data: any) {
  const updatedData = {
    ...data,
    isActive: !currentStatus
  };

  const res = await fetchWithAuth(`${API_BASE}/Advertisement/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedData)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update advertisement status: ${res.status} ${res.statusText} - ${errorText}`);
  }

  revalidatePath('/admin/dashboard/ads');
  revalidatePath('/');
}

export async function updateAdvertisementAction(id: string, formData: FormData) {
  const data = {
    title: formData.get('title')?.toString() || '',
    subtitle: formData.get('subtitle')?.toString() || '',
    imageUrl: formData.get('imageUrl')?.toString() || '',
    linkUrl: formData.get('linkUrl')?.toString() || '',
    isActive: formData.get('isActive') === 'on',
    sortOrder: Number(formData.get('sortOrder') || 0)
  };

  const res = await fetchWithAuth(`${API_BASE}/Advertisement/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update advertisement: ${res.status} ${res.statusText} - ${errorText}`);
  }

  revalidatePath('/admin/dashboard/ads');
  revalidatePath('/');
  redirect('/admin/dashboard/ads');
}
