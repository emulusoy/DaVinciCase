import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4001/api';

function CodeBlock({ children, copy }: { children: string; copy?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <div className="code-block">
      <pre><code>{children}</code></pre>
      <button
        className="btn btn-sm"
        onClick={async () => {
          await navigator.clipboard.writeText(copy ?? children);
          setOk(true);
          setTimeout(() => setOk(false), 1200);
        }}
        aria-label="Kodu kopyala"
        title="Kopyala"
      >
        {ok ? '✓ Kopyalandı' : 'Kopyala'}
      </button>
    </div>
  );
}

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'fail'>('idle');

  useEffect(() => {
    fetch(`${API_BASE}/users`, { method: 'GET' })
      .then(r => setStatus(r.ok ? 'ok' : 'fail'))
      .catch(() => setStatus('fail'));
  }, []);

  return (
    <main id="main" className="container" style={{ padding: 16 }}>
      
      <section className="panel hero">
        <div className="hero-left">
          <h1 className="hero-title">🚀 Proje Kurulum Rehberi</h1>
          <p className="hero-sub">Merhaba Projede backend kismini aktif etmeniz gerekmektedir burada uyarida backend aktif olmadan diger sayfalar maalesef calimaz

            Backend suesi bitebilir lutfen boyle hata irsaniz iletisime gecin

            Swaggeri Ac butonuna tiklayrak backend sunucusunu ayaga kaldirabiliirsunuz
          </p>

          <div className="badges">
            <span className="badge">Node 18+</span>
            <span className="badge">ESLint (flat)</span>
            <span className="badge">Responsive UI</span>
            <span className={`badge ${status === 'ok' ? 'badge-ok' : status === 'fail' ? 'badge-fail' : ''}`}>
              Backend: {status === 'ok' ? 'Aktif' : status === 'fail' ? 'Erişim Yok' : 'Kontrol ediliyor…'}
            </span>
          </div>

          <div className="cta">
            <a className="btn" href="https://davincicase.onrender.com/docs" target="_blank" rel="noreferrer">
              Swagger’ı Aç ↗
            </a>
            <Link className="btn" to="/users">Kullanıcılar</Link>
            <Link className="btn" to="/posts">Gönderiler</Link>
          </div>
        </div>

        <aside className="hero-right callout">
          <div className="callout-title">Canlı Backend</div>
          <div className="callout-body">
            <div><strong>Swagger:</strong> <a href="https://davincicase.onrender.com/docs" target="_blank" rel="noreferrer">/docs</a></div>
            <div><strong>API Base:</strong> <code>{API_BASE}</code></div>
            <div className="muted" style={{ marginTop: 6 }}>UI, bu adrese istek atar. Değiştirmek için <code>frontend/.env</code> kullan.</div>
          </div>
        </aside>
      </section>

      {/* Önkoşullar */}
      <section className="panel">
        <h2>Önkoşullar</h2>
        <ul className="list">
          <li>Node.js <strong>18+</strong>, npm <strong>9+</strong></li>
          <li>Portlar: Frontend <code>5173</code>, Backend <code>4001</code> (develop)</li>
          <li>Git kurulu olmalı</li>
        </ul>
      </section>

      {/* Backend & Frontend grid */}
      <section className="grid-2">
        {/* Backend */}
        <section className="panel">
          <h2>Backend (NestJS)</h2>
          <h3>Kurulum ve Çalıştırma</h3>
          <CodeBlock copy={`cd Backend\nnpm i\nnpm run start:dev`}>
{`cd Backend
npm i
npm run start:dev`}
          </CodeBlock>
          <p className="muted">API: <code>http://localhost:4001/api</code> · Swagger: <code>http://localhost:4001/docs</code></p>

          <h3 style={{ marginTop: 16 }}>Özet Endpoint’ler</h3>
          <div className="table-wrap">
            <table className="table--stack" aria-label="Backend endpointleri">
              <thead><tr><th>Yöntem</th><th>Yol</th><th>Açıklama</th></tr></thead>
              <tbody>
                <tr><td data-label="Yöntem">GET</td><td data-label="Yol"><code>/api/users</code></td><td data-label="Açıklama">Kullanıcı listesi</td></tr>
                <tr><td>POST</td><td><code>/api/users</code></td><td>Yeni kullanıcı</td></tr>
                <tr><td>PATCH</td><td><code>/api/users/:id</code></td><td>Kullanıcı güncelle</td></tr>
                <tr><td>DELETE</td><td><code>/api/users/:id</code></td><td>Kullanıcı sil</td></tr>
                <tr><td>GET</td><td><code>/api/posts</code></td><td>Gönderi listesi</td></tr>
                <tr><td>POST</td><td><code>/api/posts</code></td><td>Yeni gönderi</td></tr>
                <tr><td>PATCH</td><td><code>/api/posts/:id</code></td><td>Gönderi güncelle</td></tr>
                <tr><td>DELETE</td><td><code>/api/posts/:id</code></td><td>Gönderi sil</td></tr>
                <tr><td>GET</td><td><code>/api/users/:userId/posts</code></td><td>Kullanıcıya ait gönderiler</td></tr>
                <tr><td>POST</td><td><code>/api/users/:userId/posts</code></td><td>Kullanıcıya yeni gönderi</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Frontend */}
        <section className="panel">
          <h2>Frontend (React + Vite + TS)</h2>
          <h3>Kurulum</h3>
          <CodeBlock copy={`cd frontend\nnpm i`}>
{`cd frontend
npm i`}
          </CodeBlock>

          <h3>.env (backend’e bağlan)</h3>
          <CodeBlock copy={`VITE_API_BASE=${API_BASE}`}>{`# frontend/.env
VITE_API_BASE=${API_BASE}`}</CodeBlock>

          <h3>Geliştirme</h3>
          <CodeBlock copy={`npm run dev`}>{`npm run dev
# http://localhost:5173`}</CodeBlock>

          <h3>Lint</h3>
          <CodeBlock copy={`npm run lint\nnpm run lint:fix`}>{`npm run lint
npm run lint:fix`}</CodeBlock>
        </section>
      </section>

      {/* İpuçları */}
      <section className="panel">
        <h2>İpuçları</h2>
        <ul className="list">
          <li><strong>CORS</strong> açık; istersen Vite proxy ekleyebilirsin.</li>
          <li><strong>Swagger</strong> üzerinden “Try it out” ile CRUD test edebilirsin.</li>
          <li>Tablolar mobilde <code>table--stack</code> ile kart görünüme geçer.</li>
        </ul>
        <div style={{display:'flex',gap:8,flexWrap:'wrap', marginTop:8}}>
          <a className="btn" href="https://davincicase.onrender.com/docs" target="_blank" rel="noreferrer">Swagger’ı Aç ↗</a>
          <Link className="btn" to="/users">Kullanıcıları Gör</Link>
          <Link className="btn" to="/posts">Gönderileri Gör</Link>
        </div>
      </section>
    </main>
  );
}
