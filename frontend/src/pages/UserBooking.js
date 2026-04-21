import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserBooking() {
  const me = JSON.parse(localStorage.getItem('me') || '{}');
  const userId = me._id;
  const [date, setDate] = useState('');
  const [availableVaccines, setAvailableVaccines] = useState([]);

  useEffect(() => {
    if (!date) {
      setAvailableVaccines([]);
      return;
    }
    axios.get('http://localhost:5000/api/users/vaccines')
      .then(res => {
        const filtered = res.data.filter(v => {
          const entry = (v.availability || []).find(a => a.date === date);
          return entry && entry.available > 0;
        });
        setAvailableVaccines(filtered);
      })
      .catch(console.error);
  }, [date]);

  const book = (vaccineId, hospitalId) => {
    axios.post('http://localhost:5000/api/users/appointments', { userId, hospitalId, vaccineId, date })
      .then(() => alert('Booked successfully!'))
      .catch(err => alert(err.response?.data?.message || 'Booking failed'));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Book Your Vaccine</h2>
      <div style={styles.inputContainer}>
        <label style={styles.label}>
          Select Date:
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            style={styles.dateInput}
          />
        </label>
      </div>
      {date && availableVaccines.length > 0 ? (
        <div style={styles.vaccineList}>
          {availableVaccines.map(v => {
            const entry = v.availability.find(a => a.date === date);
            return (
              <div key={v._id} style={styles.card}>
                <div style={styles.vaccineDetails}>
                  <h4 style={styles.vaccineName}>{v.name}</h4>
                  <p style={styles.hospitalName}>{v.hospitalId.name}</p>
                  <div style={styles.availableCount}>
                    <span>{entry.available} available</span>
                  </div>
                </div>
                <button
                  onClick={() => book(v._id, v.hospitalId._id)}
                  style={styles.button}
                >
                  Book Now
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        date && <p style={styles.noVaccines}>No vaccines available for the selected date.</p>
      )}
    </div>
  );
}

const styles = {
    container: {
      padding: '30px',
      maxWidth: '900px',
      margin: '0 auto',
      fontFamily: '"Poppins", sans-serif',
      backgroundColor: '#f5faff',
      borderRadius: '12px',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
    },
    header: {
      textAlign: 'center',
      fontSize: '2rem',
      color: '#007BFF',
      marginBottom: '25px',
      fontWeight: '700',
    },
    inputContainer: {
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      fontSize: '0.95rem',
      fontWeight: '500',
      marginRight: '10px',
      color: '#34495e',
    },
    dateInput: {
      padding: '10px 12px',
      fontSize: '0.95rem',
      borderRadius: '8px',
      border: '1px solid #ccc',
      width: '220px',
      outline: 'none',
    },
    vaccineList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '18px',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: '0.3s ease',
      border: '1px solidrgb(254, 255, 255)',
    },
    vaccineDetails: {
      flex: 1,
      fontWeight: '500',
      color: '#2c3e50',
    },
    vaccineName: {
      fontSize: '1.1rem',
      color: '#2980b9',
      marginBottom: '6px',
      fontWeight: '600',
    },
    hospitalName: {
      fontSize: '0.95rem',
      color: '#7f8c8d',
      marginBottom: '6px',
    },
    availableCount: {
      fontSize: '0.95rem',
      color: '#e67e22',
      fontWeight: '500',
    },
    button: {
      padding: '10px 16px',
      backgroundColor: '#00b4d8',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: '0.3s ease',
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    noVaccines: {
      textAlign: 'center',
      fontSize: '1rem',
      color: '#999',
      marginTop: '30px',
    },
  };
  
