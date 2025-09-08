import type { User, Post } from '../types';

const API = import.meta.env.VITE_API_BASE ?? 'http://localhost:4001/api';

export async function fetchUsers(): Promise<User[]> {
  const r = await fetch(`${API}/users`);
  if (!r.ok) throw new Error('Kullanıcılar yüklenemedi');
  return r.json();
}
export async function createUserRemote(u: Omit<User, 'id'>): Promise<User> {
  const r = await fetch(`${API}/users`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(u),
  });
  if (!r.ok) throw new Error('Kullanıcı oluşturulamadı');
  return r.json();
}
export async function updateUserRemote(id: number, u: Partial<User>): Promise<User> {
  const r = await fetch(`${API}/users/${id}`, {
    method: 'PATCH', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(u),
  });
  if (!r.ok) throw new Error('Kullanıcı güncellenemedi');
  return r.json();
}
export async function deleteUserRemote(id: number): Promise<void> {
  const r = await fetch(`${API}/users/${id}`, { method: 'DELETE' });
  if (!r.ok) throw new Error('Kullanıcı silinemedi');
}

export async function fetchPosts(): Promise<Post[]> {
  const r = await fetch(`${API}/posts`);
  if (!r.ok) throw new Error('Postlar yüklenemedi');
  return r.json();
}
export async function createPostRemote(p: Omit<Post, 'id'>): Promise<Post> {
  const r = await fetch(`${API}/posts`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(p),
  });
  if (!r.ok) throw new Error('Post oluşturulamadı');
  return r.json();
}
export async function updatePostRemote(id: number, p: Partial<Post>): Promise<Post> {
  const r = await fetch(`${API}/posts/${id}`, {
    method: 'PATCH', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(p),
  });
  if (!r.ok) throw new Error('Post güncellenemedi');
  return r.json();
}
export async function deletePostRemote(id: number): Promise<void> {
  const r = await fetch(`${API}/posts/${id}`, { method: 'DELETE' });
  if (!r.ok) throw new Error('Post silinemedi');
}

// Kullanıcıya ait postlar
export async function fetchPostsByUser(userId: number): Promise<Post[]> {
  const r = await fetch(`${API}/users/${userId}/posts`);
  if (!r.ok) throw new Error('Kullanıcı postları yüklenemedi');
  return r.json();
}
export async function createPostForUser(userId: number, p: Omit<Post,'id'|'userId'>): Promise<Post> {
  const r = await fetch(`${API}/users/${userId}/posts`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(p),
  });
  if (!r.ok) throw new Error('Kullanıcıya post eklenemedi');
  return r.json();
}
