import React, { useState, useEffect } from 'react';

function NewTaskModal({ showModal, onClose, onAddTask }) {
  const [selectedPeople, setSelectedPeople] = useState(0);
  const [selectedTeamId, setSelectedTeamId] = useState(0);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [people, setPeople] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPeople, setFilteredPeople] = useState([]);

  useEffect(() => {
    fetchPeople();
  }, []);

  useEffect(() => {
    // Filtro de pessoas com base na consulta de pesquisa
    const filtered = people.filter(person =>
      person.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPeople(filtered);
  }, [searchQuery, people]);

  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:3333/people');
      const peopleData = await response.json();
      setPeople(peopleData);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  const selectPersons = (e) => {
    const selectedPersonId = parseInt(e.target.value, 10);
    setSelectedPeople(selectedPersonId);

    const selectedPerson = people.find(person => person.id === selectedPersonId);
    if (selectedPerson) {
      setSelectedTeamId(selectedPerson.team_id);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const createTask = async (event) => {
    event.preventDefault();

    try {
      const task = {
        title: title,
        team_id: selectedTeamId,
        people_id: selectedPeople,
        date: date,
        description: description,
        priority: priority
      };

      const response = await fetch('http://localhost:3333/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        onAddTask(task);
        // Limpar os campos do formulário
        setTitle('');
        setSelectedPeople(0);
        setSelectedTeamId(0);
        setDate('');
        setDescription('');
        setPriority('');

      } else {
        console.error('Failed to create task');
      }
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
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
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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
            Nova Tarefa
          </h2>
          <form
            onSubmit={createTask}
          >
            <label
              className="title"
              style={{
                marginBottom: '10px'
              }}
            >
              Título:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              className="peopleSelect"
              style={{
                marginBottom: '10px'
              }}
            >
              Pesquisar Pessoa:
            </label>
            <input
              type="text"
              id="peopleSearch"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Digite o nome da pessoa"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginBottom: '20px',
                boxSizing: 'border-box',
              }}
            />
            <select
              id="peopleSelect"
              value={selectedPeople}
              onChange={selectPersons}
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
              {filteredPeople.map((person) => (
                <option
                  key={person.id}
                  value={person.id}
                >
                  {person.title}
                </option>
              ))}
            </select>
            <label
              className="date"
              style={{
                marginBottom: '10px'
              }}
            >
              Data:
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
              className="description"
              style={{
                marginBottom: '10px'
              }}
            >
              Descrição:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginBottom: '20px',
                boxSizing: 'border-box',
                resize: 'vertical',
              }}
            ></textarea>
            <label
              className="priority"
              style={{
                marginBottom: '10px'
              }}
            >
              Prioridade:
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
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
              <option value="">Selecione...</option>
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
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
              Criar Tarefa
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default NewTaskModal;
