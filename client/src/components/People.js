import React, { useState, useEffect } from 'react';

function People({ tasks, onClose }) {

  const [People, setPeople] = useState([]);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:3333/people');
      const people = await response.json();
      setPeople(people);
      console.log(people);
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  }

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
            style={{
              cursor: 'pointer',
              fontSize: '24px'
            }}
          >
            &times;
          </span>
        </div>
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            fontFamily: 'Arial, sans-serif',
            color: '#333'
          }}
        >
          Task
        </h2>
        <p
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            margin: '10px 0',
            fontFamily: 'Arial, sans-serif',
            color: '#555',
          }}
        >
          PEOPLE
        </p>
        <p
          style={{
            textAlign: 'center',
            margin: '10px 0',
            fontFamily: 'Arial, sans-serif',
            color: '#555',
          }}
        >
          {People.map(person => (
            <div
              key={person.id}
            >
              {person.id === tasks.people_id && (
                <p>{person.title}</p>
              )}
            </div>
          ))}
        </p>
      </div>
    </div>
  );
}

export default People;
