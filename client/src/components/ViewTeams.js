import React, { useState, useEffect } from 'react';

function ViewTeams({ onClose }) {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [editPerson, setEditPerson] = useState("");

  useEffect(() => {
    fetchPeople();
  }, []);

  useEffect(() => {
    fetchTeam();
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      fetchPeople(selectedTeam.id);
    }
  }, [selectedTeam]);

  const updatePerson = async () => {
    try {
      await fetch(`http://localhost:3333/people/${selectedPerson.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editPerson }),
      });
      // Feche a modal ou faça outra ação após salvar
      setSelectedPerson(null); // Limpa a pessoa selecionada para edição
    } catch (error) {
      console.error('Error updating person:', error);
    }
  };

  const updateTeam = async () => {
    try {
      await fetch(`http://localhost:3333/team/${selectedTeam.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle }),
      });
      onClose();
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };

  const fetchPeople = async (teamId) => {
    try {
      const response = await fetch(`http://localhost:3333/people?team_id=${teamId}`);
      const people = await response.json();
      setPeople(people);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  const fetchTeam = async () => {
    try {
      const response = await fetch('http://localhost:3333/team');
      const teams = await response.json();
      setTeams(teams);
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  };

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  const handleEditClick = (team) => {
    setSelectedTeam(team);
    setEditTitle(team.title);
  };

  const handleEditClickPerson = (person) => {
    setSelectedPerson(person);
    setEditPerson(person.title);
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
        zIndex: '9998',
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        className="modal"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          maxHeight: '400px',
          overflowY: 'auto',
          width: '50%'
        }}
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
          Times
        </h2>
        <ul
          style={{
            listStyle: 'none',
            padding: '0'
          }}
        >
          {teams.map((team) => (
            <li
              key={team.id}
              style={{
                padding: '10px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                marginBottom: '10px',
                cursor: 'pointer'
              }}
             // onClick={() => handleTeamClick(team)}
            >
              {team.title}
              <p
                style={{
                  marginRight: '65em',
                  marginTop: '-1em',
                  fontFamily: 'Material Symbols Outlined',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
                onClick={() => handleEditClick(team)}
              >
                edit
              </p>
            </li>
          ))}
        </ul>
        {selectedTeam && (
          <div
            className="modal-container"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: '9999',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div
              className="modal"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                padding: '20px',
                width: '50%'
              }}
            >
              <h2
                style={{
                  textAlign: 'center',
                  marginBottom: '20px'
                }}
              >
                Editar Time
              </h2>
              <div
                style={{
                  marginBottom: '20px',
                  overflowY: 'auto',
                }}
              >
                <label
                  className="editTitle"
                >
                  Novo Título:
                </label>
                <input
                  type="text"
                  id="editTitle"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
              <h3
                style={{
                  textAlign: 'center',
                  marginBottom: '10px'
                }}
              >
                Pessoas do Time:
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: '0',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}
              >
                {people.map(person => (
                  selectedTeam && person.team_id === selectedTeam.id && (
                    <li
                      key={person.id}
                      style={{
                        padding: '10px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px',
                        marginBottom: '10px'
                      }}
                    >
                      {selectedPerson === person ? ( // Verifica se a pessoa está selecionada para edição
                        <div>
                          <input
                            type="text"
                            value={editPerson}
                            onChange={(e) => setEditPerson(e.target.value)}
                          />
                          <button onClick={updatePerson}>Salvar</button>
                        </div>
                      ) : (
                        <>
                          <span>{person.title}</span>
                          <p
                            style={{
                              marginRight: '65em',
                              marginTop: '-1em',
                              fontFamily: 'Material Symbols Outlined',
                              fontSize: '20px',
                              cursor: 'pointer'
                            }}
                          >
                            <span
                              onClick={(e) => {
                                e.stopPropagation(); // Evita que o evento se propague para o contêiner pai
                                handleEditClickPerson(person); // Chama handlePeopleClick apenas ao clicar no ícone
                              }}
                            >
                               edit
                            </span>
                           
                          </p>
                        </>
                      )}
                    </li>
                  )
                ))}
              </ul>
              <div style={{ textAlign: 'center' }}>
                <button
                  style={{
                    backgroundColor: 'rgb(81 23 74)',
                    color: 'white',
                    padding: '12px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%',
                    fontSize: '16px',
                    marginBottom: '10px'
                  }}
                  onClick={updateTeam}
                >
                  Salvar
                </button>
                <button
                  onClick={() => setSelectedTeam(null)}
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
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewTeams;
