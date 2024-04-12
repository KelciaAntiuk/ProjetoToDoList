import React, { useState, useEffect } from 'react';

function AddNewPeopleModal({ showModal, onClose, onAddPeople, teams }) {
  
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [peopleName, setPeopleName] = useState('');
  

  useEffect(() => {
    console.log('peoplemodal', teams);
  }, []);

  const addPeople = async (event) => {
    event.preventDefault();
    console.log('NewPeople', peopleName, selectedTeam);

    try {
      // Converte selectedTeam para um número inteiro
      const teamId = parseInt(selectedTeam, 10);
      const people = { title: peopleName, team_id: teamId };

      await fetch('http://localhost:3333/people', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(people),
      });

      setPeopleName('');
      setSelectedTeam('');
      onAddPeople(peopleName);
      onClose();
    } catch (error) {
      console.error('Error adding people:', error);
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
            Adicionar Nova Pessoa
          </h2>
          <form
            onSubmit={addPeople}
          >
            <label
              className="peopleName"
              style={{
                marginBottom: '10px'
              }}
            >
              Nome da Pessoa:
            </label>
            <input
              type="text"
              id="peopleName"
              value={peopleName}
              onChange={(e) => setPeopleName(e.target.value)}
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
            <label
              className="teamSelect"
              style={{
                marginBottom: '10px'
              }}
            >
              Selecione o Time:
            </label>
            <select
              id="teamSelect"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(parseInt(e.target.value, 10))} // Converte para inteiro
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginBottom: '20px',
                boxSizing: 'border-box',
              }}
            >
              <option value={0}>Selecione um time</option> 
              {teams.map((team) => (
                <option key={team.id} value={team.id} >
                  {team.title}
                </option>
              ))}
            </select>
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
              Adicionar Pessoa
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default AddNewPeopleModal;
