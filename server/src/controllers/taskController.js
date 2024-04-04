const taskModels = require('../models/taskModels');

const getAll = async (_req, res) => {
  const tasks = await taskModels.getAll();
  return res.status(200).json(tasks);
};

const createTask = async (req, res) => {
  const createdTask = await taskModels.createTask(req.body);
  return res.status(201).json(createdTask);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  await tasksModels.deleteTask(id);
  return res.status(204).json();
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  await taskModels.updateTask(id, req.body);
  return res.status(204).json();
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask
};
