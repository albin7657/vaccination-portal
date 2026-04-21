import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HospitalAppointments = () => {
    const me = JSON.parse(localStorage.getItem('me') || '{}');
    const hospitalId = me._id;
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (!hospitalId) return;
        fetchAppointments();
    }, [hospitalId]);

    const fetchAppointments = () => {
        axios.get(`http://localhost:5000/api/hospitals/appointments?hospitalId=${hospitalId}`)
            .then(res => setAppointments(res.data))
            .catch(console.error);
    };

    const markVaccinated = (id) => {
        axios.patch(`http://localhost:5000/api/hospitals/appointments/${id}`, { status: 'vaccinated' })
            .then(res => {
                setAppointments(prev => prev.map(a => a._id === id ? res.data : a));
            })
            .catch(console.error);
    };

    return (
        <div style={styles.container}>
            <main style={styles.main}>
                <section style={styles.card}>
                    <h2 style={styles.title}>Booked Appointments</h2>
                    {appointments.length === 0 ? (
                        <p style={styles.message}>No appointments yet.</p>
                    ) : (
                        <div style={styles.tableWrapper}>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.th}>User</th>
                                        <th style={styles.th}>Vaccine</th>
                                        <th style={styles.th}>Date</th>
                                        <th style={styles.th}>Status</th>
                                        <th style={styles.th}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map(appt => (
                                        <tr key={appt._id} style={styles.tr}>
                                            <td style={styles.td}>{appt.userId?.name || 'N/A'}</td>
                                            <td style={styles.td}>{appt.vaccineId?.name || 'N/A'}</td>
                                            <td style={styles.td}>{new Date(appt.date).toLocaleDateString()}</td>
                                            <td style={styles.td}>{appt.status}</td>
                                            <td style={styles.td}>
                                                {appt.status !== 'vaccinated' && (
                                                    <button
                                                        onClick={() => markVaccinated(appt._id)}
                                                        style={styles.button}
                                                    >
                                                        ✅ Mark Vaccinated
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#f2f7fc',
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '2rem 1rem',
    },
    card: {
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: '900px',
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
        padding: '2rem',
    },
    title: {
        fontSize: '1.6rem',
        color: '#023e8a',
        marginBottom: '1rem',
    },
    message: {
        fontStyle: 'italic',
        color: '#555',
    },
    tableWrapper: {
        overflowX: 'auto',
        borderRadius: '8px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '1rem',
        minWidth: '700px',
    },
    th: {
        padding: '12px 15px',
        backgroundColor: '#0077b6',
        color: '#fff',
        textAlign: 'left',
        fontWeight: '600',
    },
    td: {
        padding: '12px 15px',
        borderBottom: '1px solid #e0e0e0',
        color: '#333',
    },
    tr: {
        transition: 'background-color 0.3s ease',
    },
    button: {
        backgroundColor: '#00b4d8',
        color: '#fff',
        padding: '0.5rem 1rem',
        fontSize: '0.95rem',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default HospitalAppointments;
