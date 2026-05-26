// src/app/actions/auth.ts
'use server'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  const res = await fetch("https://localhost:7297/api/Auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" }
  });

  const data = await res.json();

  if (res.ok && data.token) {
    // Store JWT in a secure HTTP-only cookie
    (await cookies()).set("admin_token", data.token, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    redirect("/admin/dashboard");
  }
}

export async function logoutAdmin() {
  (await cookies()).delete('admin_token');
  redirect('/admin/login');
}