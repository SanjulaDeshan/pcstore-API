'use server';
import { authFetcher } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function addBrand(formData: FormData) {
  const name = formData.get('name');
  if (!name) return;
  await authFetcher('/Brand', { method: 'POST', body: JSON.stringify({ name }) });
  revalidatePath('/admin/dashboard/brands');
}

export async function deleteBrand(id: string) {
  await authFetcher(`/Brand/${id}`, { method: 'DELETE' });
  revalidatePath('/admin/dashboard/brands');
}

export async function addCategory(formData: FormData) {
  const name = formData.get('name');
  if (!name) return;
  await authFetcher('/Category', { method: 'POST', body: JSON.stringify({ name }) });
  revalidatePath('/admin/dashboard/categories');
}

export async function deleteCategory(id: string) {
  await authFetcher(`/Category/${id}`, { method: 'DELETE' });
  revalidatePath('/admin/dashboard/categories');
}

export async function deleteItem(id: string) {
  await authFetcher(`/Item/${id}`, { method: 'DELETE' });
  revalidatePath('/admin/dashboard/items');
}

export async function deleteItemSpec(id: string, itemId: string) {
  await authFetcher(`/ItemSpecification/${id}`, { method: 'DELETE' });
  revalidatePath(`/admin/dashboard/items/${itemId}`);
}

export async function addItemSpec(formData: FormData) {
  const itemId = formData.get('itemId');
  const name = formData.get('name');
  const value = formData.get('value');
  if (!itemId || !name || !value) return;
  await authFetcher('/ItemSpecification', { 
    method: 'POST', 
    body: JSON.stringify({ itemId, name, value }) 
  });
  revalidatePath(`/admin/dashboard/items/${itemId}`);
}

export async function addItem(formData: FormData) {
  const data = {
    name: formData.get('name'),
    categoryId: formData.get('categoryId'),
    brandId: formData.get('brandId'),
    warranty: formData.get('warranty'),
    price: formData.get('price'),
    imageUrl: formData.get('imageUrl'),
    availability: formData.get('availability')
  };
  
  const newItem = await authFetcher('/Item', { method: 'POST', body: JSON.stringify(data) });
  
  const specsString = formData.get('specs') as string;
  if (specsString && newItem?.id) {
    try {
      const specs = JSON.parse(specsString);
      for (const spec of specs) {
        if (spec.name && spec.value) {
          await authFetcher('/ItemSpecification', { 
            method: 'POST', 
            body: JSON.stringify({ itemId: newItem.id, name: spec.name, value: spec.value }) 
          });
        }
      }
    } catch (e) {
      console.error("Failed to parse specs");
    }
  }

  revalidatePath('/admin/dashboard/items');
}

export async function updateItem(id: string, formData: FormData) {
  const data = {
    name: formData.get('name'),
    categoryId: formData.get('categoryId'),
    brandId: formData.get('brandId'),
    warranty: formData.get('warranty'),
    price: formData.get('price'),
    imageUrl: formData.get('imageUrl'),
    availability: formData.get('availability')
  };
  await authFetcher(`/Item/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  revalidatePath('/admin/dashboard/items');
  revalidatePath(`/admin/dashboard/items/${id}`);
}
