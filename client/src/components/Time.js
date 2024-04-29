import React, { useState, useEffect } from 'react';
import ViewTasksTeam from './ViewTasksTeam';

function Time({userName}) {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);


  useEffect(() => {
    fetchTeams();
  }, []);

  const handleViewTeam = (team) => {
    setSelectedTeam(team);
  };

  const fetchTeams = async () => {
    try {
      const response = await fetch('http://localhost:3333/team');
      if (!response.ok) {
        throw new Error('Failed to fetch teams');
      }
      const teamData = await response.json();
      setTeams(teamData);
    } catch (error) {
      console.error('Error fetching teams:', error.message);
    }
  };

  return (
    <div className="task-card">
      <div style={{
        borderRadius: '5px',
        margin: '1rem',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '-20px',
      }}>
        <p>Titulo</p>
      
      </div>

      {teams
      .filter(team => team.user === userName)
      .map(team => (

        <div
          key={team.id}
          style={{
            border: '1px solid black',
            borderRadius: '5px',
            margin: '1rem',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer'
          }}
          //onClick={() => handleTaskClick(task)}
        >
          <p>{team.title}</p>
          <button
                style={{
                  marginRight: '26px',
                 backgroundColor: 'rgb(81 23 74)',
                 color: 'white',
                 padding: '12px 20px',
                 border: 'none',
                 borderRadius: '4px',
                 cursor: 'pointer',
                 width: '10em',
                 fontSize: '16px',
                  cursor: 'pointer'
                }}
                
              >
                 <span
                onClick={(e) => {
                  e.stopPropagation(); // Evita que o evento se propague para o contêiner pai
                  handleViewTeam(team); // Chama handlePeopleClick apenas ao clicar no ícone
                }}
              >
                Ver Tasks
              </span>
                </button>
      
        </div>
      ))}
       {selectedTeam &&
        <ViewTasksTeam
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
        />}
    </div>
  );
}

export default Time;
