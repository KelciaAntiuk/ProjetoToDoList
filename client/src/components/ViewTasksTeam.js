import React, { useState, useEffect } from 'react';

function ViewDetails({ team, onClose }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []); 

  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:3333/tasks?team_id=${team.id}`);
      const tasks = await response.json();
      setTasks(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
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
        <div
          style={{
            textAlign: 'right',
            marginBottom: '10px'
          }}
        >
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
            marginBottom: '20px'
          }}
        >
          Tasks do Time
        </h2>
        <p
          style={{
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          {team.title}
        </p>
        <ul
          style={{
            listStyle: 'none',
            padding: '0'
          }}
        >
          {tasks.map((task) => (
            team.id === task.team_id && (
              <li
                key={task.id}
                style={{
                  textAlign: 'center',
                  marginBottom: '10px'
                }}
              >
                {task.title}
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ViewDetails;
