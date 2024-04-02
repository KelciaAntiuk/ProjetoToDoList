const express = require('express');
const tasksController = require('./controllers/taskController');
const tasksMiddleware = require('./middlewares/tasksMiddleware');
const teamController = require('./controllers/teamController');
const teamModels = require('./models/teamModels')

const router = express.Router();

router.get('/tasks', tasksController.getAll);
router.post('/tasks', tasksMiddleware.validateBody, tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id', tasksController.updateTask);
router.get('/team', teamController.getAll);
router.post('/team', teamController.createTeam);
router.delete('/team/:id', teamController.deleteTeam);
router.put('/team/:id', teamController.updateTeam);



module.exports = router;