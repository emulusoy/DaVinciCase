import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import avatarUrl from '../../assets/avatar.svg';
import { fetchPosts, fetchUsers } from '../../services/remote';
import type { Post, User } from '../../types';

export default function PostDetail() {
  const { id } = useParams();
  const pid = Number(id);

  const [post, setPost] = useState<Post | undefined>();
  const [users, setUsers] = useState<User[]>([]);
  const [others, setOthers] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [plist, ulist] = await Promise.all([fetchPosts(), fetchUsers()]);
        const found = plist.find(p => p.id === pid);
        setPost(found);
        setUsers(ulist);
        setOthers(plist.filter(p => p.id !== pid).slice(0, 12));
      } catch (e) {
        setErr((e as Error).message);
      } finally {
        setLoading(false);
      }
    })();
    document.title = 'Post | App';
  }, [pid]);

  if (loading) {
    return (
      <main id="main" className="container">
        <div className="panel">Yükleniyor…</div>
      </main>
    );
  }

  if (err) {
    return (
      <main id="main" className="container">
        <div className="panel">Hata: {err}</div>
      </main>
    );
  }

  if (!post) {
    return (
      <main id="main" className="container">
        <div className="panel">
          <p>Post bulunamadı.</p>
          <Link to="/posts">← Post listesine dön</Link>
        </div>
      </main>
    );
  }

  const author = users.find(u => u.id === post.userId);
  const imageUrl = `https://picsum.photos/seed/post-${post.id}/900/500`;

  return (
    <main className="container">
      <header className="post-header">
        <img src={avatarUrl} alt="Kullanıcı fotoğrafı" className="avatar" />
        <div>
          <h1 style={{ margin: 0 }}>{post.title}</h1>
          <div className="muted">
            {author ? `@${author.username}` : `Kullanıcı #${post.userId}`}
          </div>
        </div>
        <div className="post-username-box">
          @{author?.username ?? post.userId}
        </div>
      </header>

      <section className="post-main">
        <aside className="panel post-aside" aria-label="Diğer postlar">
          <h3>DİĞER ULAŞILABİLECEK POSTLAR</h3>
          <ul>
            {others.map(o => (
              <li key={o.id}>
                <Link to={`/posts/${o.id}`}>{o.title}</Link>
              </li>
            ))}
            {others.length === 0 && (
              <li className="empty">Listelenecek post yok</li>
            )}
          </ul>
          <div style={{ marginTop: 12 }}>
            <Link to="/posts">← Listeye dön</Link>
          </div>
        </aside>

        <article className="panel post-content">
          <h2 className="sr-only">Metin Kısmı</h2>
          <p style={{ lineHeight: 1.6 }}>
            {post.body ?? 'İçerik yok.'}
          </p>
          <img
            src={imageUrl}
            alt="Post ile ilgili rastgele görsel"
            className="post-image"
          />
        </article>
      </section>
    </main>
  );
}
