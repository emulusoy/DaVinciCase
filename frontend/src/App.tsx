
import { Outlet, NavLink } from 'react-router-dom';


export default function App() {

  return (
    <div>
      <header className="topbar">
        <div className="topbar-wrap">
          <div className="brand">App</div>
          <nav className="nav" aria-label="Ana menü" style={{ display:'flex', gap:12 }}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/posts">Posts</NavLink>
          </nav>
        </div>
      </header>

      <a href="#main" className="skip-link">İçeriğe geç</a>
      <Outlet />
    </div>
  );
}
