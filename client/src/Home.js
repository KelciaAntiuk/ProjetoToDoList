
import TaskImportante from './components/TaskImportante';
import NewPeopleModal from './components/NewPeopleModal';
import NewTaskModal from './components/NewTaskModal';
import NewTeamModal from './components/NewTeamModal';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ViewTeams from './components/ViewTeams';
import TaskCard from './components/TaskCard';
import Time from './components/Time';


function Home() {
  const [showNewPeopleModal, setShowNewPeopleModal] = useState(false);
  const [showNewTeamModal, setShowNewTeamModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showViewTeams, setShowViewTeams] = useState(false);
  const [importante, setImportante] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [people, setPeople] = useState([]);
  const [time, setTime] = useState(false);
  const [teams, setTeams] = useState([]);
  const [card, setCard] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state && location.state.userName;


  useEffect(() => {
    fetchTeam();
    fetchUsers();

  }, []);



  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3333/users');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const usersData = await response.json();
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  const verifyColor = (card) => {
    switch (card) {
      case true:
        return '1px solid black';
      case 'false':
        return ' ';
      default:
        return 'black';
    }
  };

  const fetchTeam = async () => {
    try {
      const response = await fetch('http://localhost:3333/team');
      const teams = await response.json();
      setTeams(teams);
      console.log('pessoaHomeee', userName)
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  };

  const redirect = () => {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3333/tasks');
      const tasks = await response.json();
      setTasks(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleAddTeam = (teamName) => {
    setShowNewTeamModal(false);
  };

  const handleAddPeople = (personName) => {
    setShowNewPeopleModal(false);
  };

  const handleAddTask = (taskName) => {
    setShowNewTaskModal(false);
    fetchTasks();
  };

  const handleViewTeams = () => {
    setShowViewTeams(true);
  };

  const clickCard = () => {
    setCard(false);
    setImportante(true);
    setTime(false);
  };

  const clickTudo = () => {
    setCard(true);
    setImportante(false);
    setTime(false);
  };

  const clickTime = () => {
    setCard(false);
    setTime(true);
    setImportante(false);
  };

  return (
    <div className="Home">
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
        <ul
          style={{
            listStyle: "none",
            padding: 0
          }}
        >
          <li
            style={{
              borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'border-color 0.3s ease'
            }}
          >
            <a
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '10px',
                display: 'block',
                transition: 'color 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => setShowNewTeamModal(true)}
            >
              Adicionar Time
            </a>
          </li>
          <li
            style={{
              borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'border-color 0.3s ease'
            }}
          >
            <a
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '10px',
                display: 'block',
                transition: 'color 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => setShowNewPeopleModal(true)}
            >
              Adicionar Pessoa
            </a>
          </li>
          <li
            style={{
              transition: 'border-color 0.3s ease'
            }}
          >
            <a
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '10px',
                display: 'block',
                transition: 'color 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={handleViewTeams}
            >
              Ver Times
            </a>
          </li>
        </ul>
      </div>

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
            ToDo List {users
              .filter(user => user.id === userName)
              .map(user => (
                <div key={user.id}
                style={{
                  marginTop:'-0.6em'
                }}>
                  <a
                    style={{
                      fontSize: '12px',
                     
                    }}
                  >
                    Bem vindo(a), {user.title}
                  </a>
                </div>
              ))
            }




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
              cursor: 'pointer',
              marginRight: '10px'
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
              onClick={() => setShowNewTaskModal(true)}
            >
              Adicionar Task
            </p>


          </div>
          <div
            className="perfil"
            style={{
              position: 'relative',
              height: '50px',
              width: '120px',
              backgroundColor: 'white',
              borderRadius: '30px',
              marginLeft: '10px',
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
              onClick={() => redirect()}
            >
              Logout
            </p>


          </div>
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




        <NewTeamModal
          showModal={showNewTeamModal}
          onClose={() => setShowNewTeamModal(false)}
          onAddTeam={handleAddTeam}
          userName={userName}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999
          }}
        />
        <NewPeopleModal
          showModal={showNewPeopleModal}
          onClose={() => setShowNewPeopleModal(false)}
          onAddPerson={handleAddPeople}
          teams={teams}
          userName={userName}
        />
        <NewTaskModal
          showModal={showNewTaskModal}
          onClose={() => setShowNewTaskModal(false)}
          onAddTask={handleAddTask}
          people={people}
          userName={userName}
        />
        {showViewTeams &&
          <ViewTeams
            onClose={() => setShowViewTeams(false)}
            userName={userName}
          />
        }
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
            color: 'purple',
            borderBottom: verifyColor(card),
            cursor: 'pointer'
          }}
          onClick={() => clickTudo()}
        >
          Tudo
        </p>
        <p
          style={{
            color: 'purple',
            borderBottom: verifyColor(importante),
            cursor: 'pointer'
          }}
          onClick={() => clickCard()}
        >
          Importante
        </p>

        <p
          style={{
            color: 'purple',
            borderBottom: verifyColor(time),
            cursor: 'pointer',
            marginLeft: '27px'
          }}
          onClick={() => clickTime()}
        >
          Times
        </p>

      </div>
      {card &&
        <TaskCard userName={userName} />
      }
      {importante &&
        <TaskImportante userName={userName} />
      }
      {time &&
        <Time userName={userName} />
      }

    </div >
  );
}

export default Home;