import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main id='main' className='container' style={{ padding: 16 }}>
      <h1>Merhaba</h1>
      <p>Case ile alakali bilgiler.</p>

      <a className="btn" href="https://davincicase.onrender.com/docs">Swagger’ı Aç render service icin canlida backendi ayaga kaldirdim</a>
        
      <header className="header">
        <h1 style={{ margin: 0 }}>🚀 Proje Kurulum Rehberi</h1>
        <nav className="nav" aria-label="Hızlı bağlantılar">
          <Link className="btn" to="/users">Kullanıcılar</Link>
          <Link className="btn" to="/posts">Gönderiler</Link>
        </nav>
      </header>

      <section className="panel" style={{ marginBottom: 16 }}>
        <h2>Önkoşullar</h2>
        <ul>
          <li>Node.js <strong>18+</strong>, npm <strong>9+</strong></li>
          <li>Portlar: Frontend <code>5173</code>, Backend <code>4001</code></li>
        </ul>
      </section>

      <section className="panel" style={{ marginBottom: 16 }}>
        <h2>Backend (NestJS)</h2>
        <ol>
          <li><strong>Bağımlılıklar</strong></li>
        </ol>
        <pre><code>cd backend
npm i</code></pre>
        <ol start={2}>
          <li><strong>Geliştirme sunucusu</strong></li>
        </ol>
        <pre><code>npm run start:dev
# API:     http://localhost:4001/api
# Swagger: http://localhost:4001/docs</code></pre>
        <ol start={3}>
          <li><strong>Özet Endpoint’ler</strong></li>
        </ol>
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
      <section className="panel" style={{ marginBottom: 16 }}>
        <h2>Frontend (React + Vite + TS)</h2>
        <ol>
          <li><strong>Bağımlılıklar</strong></li>
        </ol>
        <pre><code>cd frontend
npm i</code></pre>
        <ol start={2}>
          <li><strong>Ortam değişkeni</strong> (backend’e bağlanmak için)</li>
        </ol>
        <pre><code># frontend/.env
VITE_API_BASE=http://localhost:4001/api</code></pre>
        <ol start={3}>
          <li><strong>Geliştirme sunucusu</strong></li>
        </ol>
        <pre><code>npm run dev
# Uygulama: http://localhost:5173</code></pre>
        <ol start={4}>
          <li><strong>Lint</strong> (ESLint v9 flat config)</li>
        </ol>
        <pre><code>npm run lint
npm run lint:fix</code></pre>
      </section>
      <section className="panel">
        <h2>İpuçları</h2>
        <ul>
          <li><strong>CORS</strong> açık; istersen Vite proxy kullanabilirsin.</li>
          <li><strong>Swagger</strong> üzerinden CRUD çağrılarını “Try it out” ile test edebilirsin.</li>
          <li>Responsive tasarım ve erişilebilirlik (focus, skip-link) aktiftir.</li>
        </ul>
        <div style={{display:'flex',gap:8,flexWrap:'wrap', marginTop:8}}>
          <a className="btn" href="http://localhost:4001/docs">Swagger’ı Aç</a>
          <Link className="btn" to="/users">Kullanıcıları Gör</Link>
          <Link className="btn" to="/posts">Gönderileri Gör</Link>
        </div>
      </section>
    </main>
  );
}