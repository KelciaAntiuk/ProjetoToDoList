const connection = require('./connection');

const getAll = async () => {
  const [tasks] = await connection.execute('SELECT * FROM tasks');
  return tasks;
};

const createTask = async (task) => {
  const { title, description, priority, people_id, team_id, date } = task;
  const status = 'pendente'; // Defina o status como "pendente"
  const code = 'INSERT INTO tasks (title, description, priority, people_id, team_id, date, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const [createdTask] = await connection.execute(code, [title, description, priority, people_id, team_id, date, status]);
  return { insertId: createdTask.insertId };
};

const deleteTask = async (id) => {
  const code = 'DELETE FROM tasks WHERE id = ?';
  await connection.execute(code, [id]);
};
 
const updateTask = async (id, task) => {
  const { title, description, priority, people_id, team_id, date, status } = task;
  const code = 'UPDATE tasks SET title = ?, description = ?, priority = ?, people_id = ?, team_id = ?, date = ?, status = ? WHERE id = ?';
  await connection.execute(code, [title, description, priority, people_id, team_id, date, status, id]);
};


module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask
};
