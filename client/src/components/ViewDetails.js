import React, { useState, useEffect } from 'react';

function ViewDetails({ team, onClose }) {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetchPeople();
  }, []); // Chama fetchPeople() uma vez quando o componente é montado

  const fetchPeople = async () => {
    try {
      const response = await fetch(`http://localhost:3333/people?team_id=${team.id}`);
      const people = await response.json();
      setPeople(people);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  return (
    <div
      className="modal-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: '9999',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClose}
    >
      <div
        className="modal"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          width: '50%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
          <span
            className="close"
            onClick={onClose}
            style={{ cursor: 'pointer', fontSize: '24px' }}
          >
            &times;
          </span>
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Pessoas do Time</h2>
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>{team.title}</p>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          {people.map((person) => (
            team.id === person.team_id && (
              <li key={person.id} style={{ textAlign: 'center', marginBottom: '10px' }}>
                {person.title}
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ViewDetails;
