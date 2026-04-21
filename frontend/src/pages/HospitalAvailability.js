import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HospitalAvailability = () => {
    const me = JSON.parse(localStorage.getItem('me') || '{}');
    const hospitalId = me._id;
    const [vaccines, setVaccines] = useState([]);
    const [selectedVaccine, setSelectedVaccine] = useState('');
    const [date, setDate] = useState('');
    const [available, setAvailable] = useState('');

    useEffect(() => {
        if (!hospitalId) return;
        axios.get(`http://localhost:5000/api/hospitals/vaccines?hospitalId=${hospitalId}`)
            .then(res => setVaccines(res.data))
            .catch(console.error);
    }, [hospitalId]);

    const updateAvailability = () => {
        if (!selectedVaccine || !date || !available) {
            alert('Fill in all fields');
            return;
        }
        axios.post('http://localhost:5000/api/hospitals/updateAvailability', {
            vaccineId: selectedVaccine,
            date,
            available: parseInt(available, 10)
        })
            .then(() => {
                alert('Availability updated');
                setSelectedVaccine('');
                setDate('');
                setAvailable('');
            })
            .catch(err => alert(err.response?.data?.message || 'Update failed'));
    };

    return (
        <div style={styles.card}>
            <h2 style={styles.title}>Manage Vaccine Availability</h2>
            <div style={styles.formGroup}>
                <label style={styles.label}>Select Vaccine:</label>
                <select
                    style={styles.input}
                    value={selectedVaccine}
                    onChange={e => setSelectedVaccine(e.target.value)}
                >
                    <option value="">-- Select --</option>
                    {vaccines.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
                </select>
            </div>
            <div style={styles.formGroup}>
                <label style={styles.label}>Date:</label>
                <input
                    type="date"
                    style={styles.input}
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
            </div>
            <div style={styles.formGroup}>
                <label style={styles.label}>Available Quantity:</label>
                <input
                    type="number"
                    style={styles.input}
                    value={available}
                    onChange={e => setAvailable(e.target.value)}
                />
            </div>
            <button style={styles.button} onClick={updateAvailability}>Save</button>
        </div>
    );
};

const styles = {
    
    card: {
        backgroundColor: '#ffffff',
        padding: '1rem',
        borderRadius: '12px',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
        maxWidth: '700px',
        margin: '2rem auto',
        fontFamily: 'Segoe UI, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: '1.8rem',
        color: '#023e8a',
        textAlign: 'center',
        marginBottom: '2rem',
        fontWeight: '600',
    },
    formGroup: {
        marginBottom: '1.5rem',
        width: '100%',
    },
    label: {
        fontSize: '1.1rem',
        fontWeight: '500',
        color: '#333',
        marginBottom: '0.5rem',
    },
    input: {
        padding: '0.75rem',
        width: '100%',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        transition: 'border-color 0.2s ease',
        boxSizing: 'border-box', // Prevents padding from causing overflow
    },
    button: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#0077b6',
        color: '#fff',
        fontSize: '1.1rem',
        fontWeight: '500',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        width: '100%',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#005f8d',
    },


};

export default HospitalAvailability;
