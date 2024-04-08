import React, { useState } from 'react';

function AddNewTeamModal({ showModal, onClose, onAddTeam }) {

  const [teamName, setTeamName] = useState('');

  const addTeam = async (event) => {
    event.preventDefault(); //evitar que a pagina seja recarregada apos o envio do formulário
    try {
      const team = { title: teamName };
      const response = await fetch('http://localhost:3333/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(team),
      });

      if (response.ok) {
        setTeamName('');
        onAddTeam(teamName); // Chamar a função onAddTeam com o nome do time
        onClose(); // Fechar o modal após adicionar o time
      } else {
        console.error('Failed to add team');
      }
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };

  return (
    showModal && (
      <div
        className="modal"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
        }}
      >
        <div
          className="modal-content"
          style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Sombra
            position: 'relative',
          }}
        >
          <button
            className="close-button"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              fontSize: '20px',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: '0',
            }}
          >
            &times;
          </button>
          <h2
            style={{
              textAlign: 'center',
              marginBottom: '20px',
              color: '#333',
            }}
          >
            Adicionar Novo Time
          </h2>
          <form
            onSubmit={addTeam}
          >
            <label
              className="teamName"
              style={{
                marginBottom: '10px'
              }}
            >
              Nome do Time:
            </label>
            <input
              type="text"
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginBottom: '20px',
                boxSizing: 'border-box',
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: 'rgb(81 23 74)',
                color: 'white',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%',
                fontSize: '16px',
              }}
            >
              Adicionar Time
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default AddNewTeamModal;
