export type User = { id: number; name: string; username: string; email: string };
export type Post = { userId: number; id: number; title: string; body?: string };