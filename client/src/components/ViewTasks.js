import React, { useState, useEffect } from 'react';

function ViewTasks({ tasks, onClose }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate(); // Retorna o dia do mês (1 a 31)
    const month = date.toLocaleString('default', { month: 'short' }); // Retorna o mês abreviado
    return `${day} ${month}`;
  };

  const handleEdit = () => {
    // Lógica para editar a tarefa
    console.log('Editar tarefa:', tasks.id);
  };

  const handleDelete = () => {
    // Lógica para excluir a tarefa
    console.log('Excluir tarefa:', tasks.id);
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>Task</h2>
        <p
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            margin: '10px 0',
            fontFamily: 'Arial, sans-serif',
            color: '#555',
          }}
        >
          {tasks.title}
        </p>
        <p
          style={{
            textAlign: 'center',
            //fontWeight: 'bold',
            margin: '10px 0',
            fontFamily: 'Arial, sans-serif',
            color: '#555',
          }}
        >
          Descrição:
        </p>
        <p
          style={{
            textAlign: 'center',
            //fontWeight: 'bold',
            margin: '10px 0',
            fontFamily: 'Arial, sans-serif',
            color: '#555',
          }}
        >
          {tasks.description}
        </p>
        <hr></hr>
        <p
          style={{
            //textAlign: 'center',
            //fontWeight: 'bold',
            //margin: '10px 0',
            fontFamily: 'Arial, sans-serif',
            color: '#555',
            marginLeft:'-30em'
          }}
        >
          Data Final: {formatDate(tasks.date)}
        </p>
        <p
          style={{
            // textAlign: 'center',
            // fontWeight: 'bold',
           // margin: '10px 0',
            fontFamily: 'Arial, sans-serif',
            color: '#555',
            marginLeft:'-30.7em'
          }}
        >
          Status: {tasks.status}
        </p>
        <p
          style={{
            // textAlign: 'center',
            // fontWeight: 'bold',
           // margin: '10px 0',
            fontFamily: 'Arial, sans-serif',
            color: '#555',
            marginLeft:'-31.2em'
          }}
        >
          Prioridade: {tasks.priority}
        </p>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={handleEdit} style={{ marginRight: '10px', fontFamily: 'Arial, sans-serif', backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Editar</button>
          <button onClick={handleDelete} style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f44336', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Excluir</button>
        </div>
      </div>
    </div>
  );
}

export default ViewTasks;
