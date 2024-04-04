import React, { useState, useEffect } from 'react';

function ViewTeams({ onClose }) {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await fetch('http://localhost:3333/team');
      const teams = await response.json();
      setTeams(teams);
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
        zIndex: '9998', // Z-index menor que o modal para ficar por trás
        backdropFilter: 'blur(8px)', // Aplica um efeito de desfoque ao fundo
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="modal"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          maxHeight: '400px', // Defina a altura máxima desejada
          overflowY: 'auto', // Adicione rolagem vertical quando necessário
          width: '50%',
        }}
      >
        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
          <span
            className="close"
            onClick={onClose} // Adicionando evento onClick
            style={{ cursor: 'pointer', fontSize: '24px' }}
          >
            &times;
          </span>
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Times</h2>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          {teams.map((team) => (
            <li
              key={team.id}
              style={{
                padding: '10px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                marginBottom: '10px',
              }}
            >
              {team.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ViewTeams;
