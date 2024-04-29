const connection = require('./connection');

const getAll = async () => {
  const [tasks] = await connection.execute('SELECT * FROM tasks');
  return tasks;
};

const createTask = async (task) => {
  const { title, description, priority, people_id, team_id, date, user } = task;
  const status = 'pendente'; // Defina o status como "pendente"
  const code = 'INSERT INTO tasks (title, description, priority, people_id, team_id, date, status, user) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
  const [createdTask] = await connection.execute(code, [title, description, priority, people_id, team_id, date, status, user]);
  return { insertId: createdTask.insertId };
};

const deleteTask = async (id) => {
  const code = 'DELETE FROM tasks WHERE id = ?';
  await connection.execute(code, [id]);
};
 
const updateTask = async (id, task) => {
  const { title, description, priority, people_id, team_id, date, status, user } = task;
  const code = 'UPDATE tasks SET title = ?, description = ?, priority = ?, people_id = ?, team_id = ?, date = ?, status = ?, user = ? WHERE id = ?';
  await connection.execute(code, [title, description, priority, people_id, team_id, date, status, user, id]);
};


module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask
};
