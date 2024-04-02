import React, { useState } from 'react';

function AddNewTeamModal({ showModal, onClose, onAddTeam }) {
  const [teamName, setTeamName] = useState('');

  const addTeam = async (event) => {
    event.preventDefault();

    try {
      const team = { title: teamName };

      await fetch('http://localhost:3333/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(team),
      });

      setTeamName('');
      onAddTeam(teamName); // Chamar a função onAddTeam com o nome do time
      onClose(); // Fechar o modal após adicionar o time
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };

  return (
    showModal && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Adicionar Novo Time</h2>
          <form onSubmit={addTeam}>
            <label htmlFor="teamName">Nome do Time:</label>
            <input
              type="text"
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
            <button type="submit">Adicionar Time</button>
          </form>
        </div>
      </div>
    )
  );
}

export default AddNewTeamModal;
