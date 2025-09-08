export const KEY_USERS = 'app_users';
export const KEY_POSTS = 'app_posts';

export function load<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

export function save<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}
