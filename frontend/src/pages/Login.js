import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const url = role === 'user'
        ? 'http://localhost:5000/api/users/login'
        : 'http://localhost:5000/api/hospitals/login';
      const res = await axios.post(url, { email, password });
      localStorage.setItem('me', JSON.stringify({ ...res.data, role }));
      navigate(role === 'user' ? '/user/dashboard' : '/hospital/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Vaccine Management System</h1>
        <p>Login to your account</p>
      </header>

      <main style={styles.main}>
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Login</h2>

          <div style={styles.radioGroup}>
            <label>
              <input type='radio' checked={role === 'user'} onChange={() => setRole('user')} />
              User
            </label>
            <label style={styles.radioLabel}>
              <input type='radio' checked={role === 'hospital'} onChange={() => setRole('hospital')} />
              Hospital
            </label>
          </div>

          <input
            style={styles.input}
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            style={styles.input}
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button style={styles.button} onClick={handleLogin}>Login</button>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>&copy; 2025 Vaccine Management Portal</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#0077b6',
    color: 'white',
    textAlign: 'center',
    padding: '2rem',
  },
  main: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  formCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1.5rem',
    color: '#333',
  },
  radioGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  radioLabel: {
    marginLeft: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#0077b6',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#005f8a',
  },
  footer: {
    backgroundColor: '#023e8a',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',
  },
};
