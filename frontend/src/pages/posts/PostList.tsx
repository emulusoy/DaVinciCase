import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import avatarUrl from '../../assets/avatar.svg';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import {
  fetchPosts,
  createPostRemote,
  updatePostRemote,
  deletePostRemote,
  fetchUsers,
} from '../../services/remote';
import type { Post, User } from '../../types';

type Form = Omit<Post, 'id'>;
const empty: Form = { title: '', body: '', userId: 1 };

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Form>(empty);
  const [filterUserId, setFilterUserId] = useState<number | 'all'>('all');
  const [query, setQuery] = useState('');
  const [sortMode, setSortMode] = useState<'new' | 'old' | 'title'>('new');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const isEdit = useMemo(() => editingId !== null, [editingId]);
  const composeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const [plist, ulist] = await Promise.all([fetchPosts(), fetchUsers()]); //iki listelemeyi ayni yerde yapiyor hhiz icin
        setPosts(plist);
        setUsers(ulist);
      } catch (e) {
        setErr((e as Error).message);
      } finally {
        setLoading(false);
      }
    })();
    document.title = 'Posts | App';
  }, []);


  useEffect(() => {
    if (isEdit && composeRef.current) {
      composeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => titleRef.current?.focus(), 250);
    }
  }, [isEdit]);

  function resetForm() {
    setForm(empty);
    setEditingId(null);
    setError('');
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title) {
      setError('Başlık zorunlu');
      return;
    }
    try {
      if (isEdit && editingId !== null) {
        const updated = await updatePostRemote(editingId, form);
        setPosts(prev => prev.map(p => (p.id === editingId ? updated : p)));
      } else {
        const created = await createPostRemote(form);
        setPosts(prev => [created, ...prev]);
      }
      resetForm();
      composeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      setError((err as Error).message);
    }
  }

  function onEdit(p: Post) {
    setEditingId(p.id);
    setForm({ title: p.title, body: p.body ?? '', userId: p.userId });
    setError('');
    composeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => titleRef.current?.focus(), 250);
  }

  async function onDelete(id: number) {
    if (!confirm('Silinsin mi?')) return;
    try {
      await deletePostRemote(id);
      setPosts(prev => prev.filter(p => p.id !== id));
      if (editingId === id) resetForm();
    } catch (e) {
      alert((e as Error).message);
    }
  }

  const visible = useMemo(() => {
    let arr = filterUserId === 'all' ? posts : posts.filter(p => p.userId === filterUserId);
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(p => {
        const au = users.find(u => u.id === p.userId);
        const hay = `${p.title} ${(p.body ?? '')} ${au?.name ?? ''} ${au?.username ?? ''}`.toLowerCase();
        return hay.includes(q);
      });
    }
    const sorted = [...arr].sort((a, b) =>
      sortMode === 'new' ? b.id - a.id :
      sortMode === 'old' ? a.id - b.id :
      a.title.localeCompare(b.title)
    );
    return sorted;
  }, [posts, filterUserId, query, sortMode, users]);

  return (
    <main id="main" className="container">
      <section className="timeline">
        <div className="timeline-header">Postlar</div>

        <div className="composer-card" ref={composeRef}>
          <div className="composer-filters">
            <Input
              placeholder="Ara: başlık, içerik, yazar..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <Select
              value={sortMode}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSortMode(e.target.value as 'new' | 'old' | 'title')
              }
            >
              <option value="new">Yeni → Eski</option>
              <option value="old">Eski → Yeni</option>
              <option value="title">Başlığa göre</option>
            </Select>
            <Select
              value={filterUserId === 'all' ? 'all' : String(filterUserId)}
              onChange={e => setFilterUserId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            >
              <option value="all">Tüm kullanıcılar</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
            </Select>
          </div>

          <form onSubmit={onSubmit} className="composer-form" aria-labelledby="composer-title">
            <h3 id="composer-title" className="sr-only">Gönderi oluştur / düzenle</h3>
            <Input
              ref={titleRef}
              placeholder={isEdit ? 'Başlığı güncelle…' : 'Başlık'}
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              aria-invalid={!!error}
              aria-describedby={error ? 'composer-error' : undefined}
            />
            <Textarea
              rows={3}
              placeholder="Ne oluyor?"
              value={form.body ?? ''}
              onChange={e => setForm({ ...form, body: e.target.value })}
            />
            <div className="composer-actions">
              <Select value={String(form.userId)} onChange={e => setForm({ ...form, userId: Number(e.target.value) })}>
                {users.map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
              </Select>

              {error && (
                <div id="composer-error" className="form-error" role="alert" aria-live="polite">
                  {error}
                </div>
              )}

              <div className="composer-buttons">
                <Button type="submit" variant="primary">{isEdit ? 'Güncelle' : 'Gönder'}</Button>
                {isEdit && <Button type="button" onClick={resetForm}>İptal</Button>}
              </div>
            </div>
          </form>
        </div>


        <section className="feed" aria-label="Post akışı">
          {loading && <div className="tweet">Yükleniyor…</div>}
          {err && <div className="tweet">Hata: {err}</div>}
          {!loading && !err && visible.map(p => {
            const u = users.find(x => x.id === p.userId);
            const name = u?.name ?? `Kullanıcı #${p.userId}`;
            const username = u?.username ? `@${u.username}` : '';
            const text = (p.body ?? '').trim() || '—';
            const time = `${(p.id % 12) + 1}sa`;
            const showMedia = p.id % 3 === 0;
            const mediaUrl = `https://picsum.photos/seed/tweet-${p.id}/600/400`;

            return (
              <article key={p.id} className="tweet">
                <img src={avatarUrl} alt="" className="tweet-avatar" />
                <div>
                  <div className="tweet-head">
                    <Link to={`/posts/${p.id}`} className="tweet-name">{name}</Link>
                    <span className="tweet-username">{username}</span>
                    <span className="tweet-dot">·</span>
                    <span className="tweet-time">{time}</span>
                  </div>
                  <div className="tweet-text">{text}</div>
                  {showMedia && (
                    <div className="tweet-media">
                      <img src={mediaUrl} alt="" style={{ display: 'block', width: '100%', height: 'auto' }} />
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <Button type="button" onClick={() => onEdit(p)}>Düzenle</Button>
                    <Button type="button" variant="danger" onClick={() => onDelete(p.id)}>Sil</Button>
                    <Link className="btn" to={`/posts/${p.id}`}>Detay</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </section>
    </main>
  );
}
