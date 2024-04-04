const express = require('express');
const teamController = require('./controllers/teamController');
const peopleController = require('./controllers/peopleController');
const taskController = require('./controllers/taskController');

const router = express.Router();

router.get('/team', teamController.getAll);
router.post('/team', teamController.createTeam);
router.delete('/team/:id', teamController.deleteTeam);
router.put('/team/:id', teamController.updateTeam);

router.get('/people', peopleController.getAll);
router.post('/people', peopleController.createPeople);
router.delete('/people/:id', peopleController.deletePeople);
router.put('/people/:id', peopleController.updatePeople);

router.get('/tasks', taskController.getAll);
router.post('/tasks', taskController.createTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.put('/tasks/:id', taskController.updateTask);

module.exports = router;
