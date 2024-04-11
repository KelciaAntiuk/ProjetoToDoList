import React, { useState } from 'react';

function ViewTasks({ tasks, onClose }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(tasks.title);
  const [editedDescription, setEditedDescription] = useState(tasks.description);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'DELETE',
      });

      onClose();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  const updateTask = async () => {
    try {
      const statusN = isChecked ? 'concluido' : 'pendente';
      const formattedDate = new Date(tasks.date).toISOString().split('T')[0];
      await fetch(`http://localhost:3333/tasks/${tasks.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...tasks, date: formattedDate, status: statusN }),
      });
      onClose();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(tasks.title);
    setEditedDescription(tasks.description);
  };

  const handleSaveEdit = async () => {
    try {
      const formattedDate = new Date(tasks.date).toISOString().split('T')[0];
      await fetch(`http://localhost:3333/tasks/${tasks.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...tasks, title: editedTitle, description: editedDescription, date: formattedDate }),
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
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
        {isEditing ? (
          <form>
            <div style={{ marginBottom: '10px' }}>
              <label>Title:</label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                style={{ width: '100%', marginTop: '5px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Description:</label>
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                style={{ width: '100%', marginTop: '5px' }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handleSaveEdit}
                style={{
                  marginRight: '10px'
                }}
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <p style={{ textAlign: 'center', fontWeight: 'bold', margin: '10px 0', fontFamily: 'Arial, sans-serif', color: '#555' }}>
              {tasks.title}
            </p>
            <p
              style={{
                textAlign: 'center',
                margin: '10px 0',
                fontFamily: 'Arial, sans-serif',
                color: '#555'
              }}
            >
              Descrição: {tasks.description}
            </p>
            <hr />
            <p
              style={{
                fontFamily: 'Arial, sans-serif',
                color: '#555',
                marginLeft: '-30em'
              }}
            >
              Data Final: {formatDate(tasks.date)}
            </p>
            <label
              style={{
                fontFamily: 'Arial, sans-serif',
                color: '#555',
                marginRight: '10px'
              }}
            >
              Concluído:
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                style={{ marginLeft: '5px', cursor: 'pointer' }}
              />
            </label>
            <div
              style={{
                textAlign: 'center',
                marginTop: '20px'
              }}
            >
              <button
                onClick={updateTask}
                style={{
                  marginRight: '10px',
                  fontFamily: 'Arial, sans-serif',
                  backgroundColor: '#f44336',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Fechar
              </button>
              <button
                onClick={handleEditClick}
                style={{
                  marginRight: '10px',
                  fontFamily: 'Arial, sans-serif',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Editar
              </button>
            </div>
            <div>
              <p
                style={{
                  marginRight: '65em',
                  marginTop: '-1.2em',
                  fontFamily: 'Material Symbols Outlined',
                  fontSize: '30px',
                  cursor:'pointer'

                }}
                onClick={() => deleteTask(tasks.id)}
              >
                delete
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ViewTasks;
