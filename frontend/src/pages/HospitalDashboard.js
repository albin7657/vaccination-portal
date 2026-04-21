import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const HospitalLayout = () => {
  const me = JSON.parse(localStorage.getItem('me') || '{}');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('me');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1>Welcome, {me.name || 'Hospital Staff'}</h1>
        
        <nav style={styles.nav}>
          <NavLink
            to="availability"
            style={({ isActive }) => isActive ? styles.activeLink : styles.link}
          >
            Manage Availability
          </NavLink>
          <NavLink
            to="appointments"
            style={({ isActive }) => isActive ? styles.activeLink : styles.link}
          >
            Appointments
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

      {/* Content */}
      <main style={styles.main}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Vaccine Management System</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif'
  },
  header: {
    background: '#0077b6',
    color: '#fff',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    padding: '0.5rem'
  },
  activeLink: {
    background: '#fff',
    color: '#0077b6',
    borderRadius: '4px',
    padding: '0.5rem'
  },
  main: {
    flex: 1,
    padding: '2rem',
    backgroundColor: '#f2f7fc'
  },
  footer: {
    background: '#023e8a',
    color: '#fff',
    textAlign: 'center',
    padding: '1rem'
  }
};

export default HospitalLayout;
