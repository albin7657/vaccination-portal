import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

export default function UserLayout() {
  const me = JSON.parse(localStorage.getItem('me') || '{}');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('me');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome, {me.name || 'User'}</h1>
        <nav style={styles.nav}>
          <NavLink
            to="appointments"
            style={({ isActive }) => isActive ? styles.activeLink : styles.link}
          >
            My Appointments
          </NavLink>
          <NavLink
            to="book"
            style={({ isActive }) => isActive ? styles.activeLink : styles.link}
          >
            Book Vaccine
          </NavLink>
          <NavLink
                      to="/"
                      onClick={logout} // trigger the logout action
                      style={styles.link} // use same style as other links
                    >
                      Logout
                    </NavLink>
        </nav>
      </header>
      <main style={styles.main}>
        <Outlet />
      </main>
      <footer style={styles.footer}>
        <p>&copy; 2025 Vaccine Booking Portal</p>
      </footer>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' },
  header: { background: '#0077b6', color: '#fff', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  nav: { display: 'flex', alignItems: 'center', gap: '1rem' },
  link: { color: '#fff', textDecoration: 'none', padding: '0.5rem' },
  activeLink: { background: '#fff', color: '#0077b6', borderRadius: '4px', padding: '0.5rem' },
  logoutButton: { marginLeft: 'auto', background: '#dc3545', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' },
  main: { flex: 1, padding: '2rem', backgroundColor: '#f9f9f9' },
  footer: { background: '#023e8a', color: '#fff', textAlign: 'center', padding: '1rem' }
};