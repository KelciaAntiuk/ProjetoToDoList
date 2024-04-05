import React, { useState, useEffect } from 'react';

function TaskCard() {
  const [tasks, setTasks] = useState([]);
  const [people, setPeople] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // Estado para armazenar a tarefa selecionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a abertura/fechamento do modal

  useEffect(() => {
    fetchTasks();
    fetchPeople();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3333/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const tasksData = await response.json();
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:3333/people');
      const peopleData = await response.json();
      setPeople(peopleData);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  // Função para encontrar o nome da pessoa com base no people_id da tarefa
  const findPersonName = (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      const person = people.find(person => person.id === task.people_id);
      return person ? person.name : 'Nome não encontrado';
    }
    return 'Tarefa não encontrada';
  };

  // Função para lidar com o clique na tarefa e abrir o modal
  const handleTaskClick = (taskId) => {
    const personName = findPersonName(taskId);
    setSelectedTask(personName);
    setIsModalOpen(true); // Abrir o modal
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="task-card">
      {tasks.map(task => (
        <div key={task.id} onClick={() => handleTaskClick(task.id)}>
          <p>{task.title}</p>
        </div>
      ))}
      {/* Renderizar o modal com o nome da pessoa selecionada se o modal estiver aberto */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>{selectedTask}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
