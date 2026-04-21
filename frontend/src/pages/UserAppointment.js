import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserAppointments() {
  const me = JSON.parse(localStorage.getItem('me') || '{}');
  const userId = me._id;
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:5000/api/users/appointments/${userId}`)
      .then(res => setAppointments(res.data))
      .catch(console.error);
  }, [userId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Appointments</h2>
      {appointments.length === 0 ? (
        <p style={styles.noData}>You have no appointments yet.</p>
      ) : (
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Vaccine</th>
              <th style={styles.th}>Hospital</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, i) => (
              <tr key={a._id} style={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                <td style={styles.td}>{a.vaccineId?.name || 'Unknown Vaccine'}</td>
                <td style={styles.td}>{a.hospitalId?.name || 'Unknown Hospital'}</td>
                <td style={styles.td}>{a.date}</td>
                <td style={styles.td}>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    fontSize: '1.8rem',
    color: '#0077b6',
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontWeight: '600',
  },
  noData: {
    textAlign: 'center',
    color: '#555555',
    fontStyle: 'italic',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    overflow: 'hidden',
  },
  thead: {
    backgroundColor: '#0077b6',
  },
  th: {
    padding: '1rem',
    color: '#ffffff',
    textAlign: 'left',
    fontWeight: '500',
  },
  rowEven: {
    backgroundColor: '#f9f9f9',
  },
  rowOdd: {
    backgroundColor: '#ffffff',
  },
  td: {
    padding: '0.75rem 1rem',
    color: '#333333',
  },
};