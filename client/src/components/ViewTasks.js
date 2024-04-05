import React, { useState, useEffect } from 'react';

function ViewTasks({ tasks, onClose }) {
  //const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log('tasks', tasks)
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate(); // Retorna o dia do mês (1 a 31)
    const month = date.toLocaleString('default', { month: 'short' }); // Retorna o mês abreviado
    return `${day} ${month}`;
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Task</h2>
        <p
          style={{
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          {tasks.title}
        </p>
        <p
          style={{
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          {tasks.description}
        </p>
        <p
          style={{
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Data Final: {formatDate(tasks.date)}
        </p>
        <p
          style={{
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Status: {tasks.status}
        </p>
        <p
          style={{
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Prioridade: {tasks.priority}
        </p>
        

      </div>
    </div>
  );
}

export default ViewTasks;
