
import React, { useState, useEffect } from 'react';
import './App.css';
 import NewTeamModal from './components/NewTeamModal';
 import NewPeopleModal from './components/NewPeopleModal';
// import ViewTeams from './components/ViewTeams';
// import TaskMap from './components/TaskMap';
// import NewTaskModal from './components/NewTaskModal'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [profileMenuOpen, setProfileMenuOpen] = useState(false);
   const [showNewTeamModal, setShowNewTeamModal] = useState(false);
  const [showNewPeopleModal, setShowNewPeopleModal] = useState(false);
  // const [showNewTaskModal, setShowNewTaskModal] = useState(false);
   const [teams, setTeams] = useState([]);
   const [showViewTeams, setShowViewTeams] = useState(false);
   const [people, setPeople] = useState([]);

  useEffect(() => {
    fetchTeam();
    // fetchPeople();
     console.log('APP', teams);
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await fetch('http://localhost:3333/team');
      const teams = await response.json();
      setTeams(teams);
      console.log(teams);
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  }

  // const fetchPeople = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3333/people');
  //     const people = await response.json();
  //     setPeople(people);
  //     console.log(people);
  //   } catch (error) {
  //     console.error('Error fetching team:', error);
  //   }
  // }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const handleAddTeam = (teamName) => {
    console.log('Novo time adicionado:', teamName);
    setShowNewTeamModal(false);
  };

  const handleAddPeople = (personName) => {
    console.log('Novo time adicionado:', personName);
    setShowNewPeopleModal(false);
  };
  // const handleAddTask = (taskName) => {
  //   console.log('Nova tarefa adicionada:', taskName); // Corrigido para "Nova tarefa adicionada"
  //   setShowNewTaskModal(false);
  // };
  

  const handleViewTeams = () => {
    setShowViewTeams(true);
  }

  return (
    <div className="App" >
      <div
        className={`sidebar ${menuOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: "250px",
          backgroundColor: "rgb(81 23 74)",
          color: "#fff",
          transition: "transform 0.3s ease-in-out",
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {/* Conteúdo do menu */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <a style={{
              color: 'white'
            }}
              onClick={() => setShowNewTeamModal(true)}
              >Add new team</a>
          </li>
          <li>
            <a style={{
              color: 'white'
            }}
              onClick={() => setShowNewPeopleModal(true)}
              >Add new people</a>
          </li>
          <li>
            <a style={{
              color: 'white'
            }}
              //onClick={handleViewTeams}
              >View Teams</a>
          </li>
        </ul>
      </div>

      {/* Conteúdo principal */}
      <div
        style={{
          marginLeft: menuOpen ? "250px" : "0",
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        <div
          className="nav"
          style={{
            backgroundColor: "rgb(81 23 74)",
            display: "flex",
            padding: "10px",
            color: "#fff",
            borderBottom: "2px solid #fff",
          }}
        >
          <button
            onClick={toggleMenu}
            style={{
              backgroundColor: "transparent",
              color: 'white',
              border: "none",
              fontSize: "34px",
              cursor: "pointer",
              marginTop: '-5px'
            }}
          >
            {menuOpen ? "✕" : "≡"}
          </button>
          <div
            className="logo"
            style={{
              fontWeight: "bold",
              fontSize: "40px",
              fontFamily: "Abril Fatface",
              marginLeft: "10px",
            }}
          >
            ToDo List
          </div>

          <div
            className="button-container"
            style={{
              display: 'flex',
              marginLeft: 'auto',
              marginRight: '20px',
            }}
          >

          </div>

          <div
            className="perfil"
            style={{
              position: 'relative',
              height: '50px',
              width: '200px',
              backgroundColor: 'white',
              borderRadius: '30px',
              marginLeft: '20px',
              cursor: 'pointer',
              fontFamily: 'Rajdhani, sans-serif', // Adicionando a fonte fornecida
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          // onClick={()}
          >
            <p
              style={{
                color: 'black',
                fontSize: '16px',
                fontWeight: '500',
                margin: 0,
                color: 'purple' // Removendo margem padrão do parágrafo
              }}
              //onClick={() => setShowNewTaskModal(true)}
            >
              Adicionar Task
            </p>
          </div>
        </div>

        <NewTeamModal
          showModal={showNewTeamModal}
          onClose={() => setShowNewTeamModal(false)}
          onAddTeam={handleAddTeam}
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}
        />
        <NewPeopleModal
          showModal={showNewPeopleModal}
          onClose={() => setShowNewPeopleModal(false)}
          onAddPerson={handleAddPeople}
          teams={teams}
        />
          {/* <NewTaskModal
          showModal={showNewTaskModal}
          onClose={() => setShowNewTaskModal(false)}
          onAddTask={handleAddTask}
          people={people}
        /> */}
        {/* {showViewTeams && <ViewTeams />}  */}
      </div>
      <div
        className='taskBoard'
        style={{
          display: 'flex',
        }}
      >
        <p
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            display: 'flex',
            marginLeft: '20px',
            fontSize: '29px',
            marginTop: '7px',
            color: 'purple'
          }}
        >
          TaskBoard
        </p>
        <p
          style={{
            marginLeft: '27px',
            marginRight: '27px',
            color: 'purple'
          }}
        >
          Tudo
        </p>
        <p
          style={{
            color: 'purple'
          }}
        >
          Importante
        </p>
      </div>
      {/* <TaskMap /> */}
    </div >
  );
}

export default App;