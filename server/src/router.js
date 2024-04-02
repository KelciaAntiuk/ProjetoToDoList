const express = require('express');

const teamController = require('./controllers/teamController');
const peopleController = require('./controllers/peopleController')
const teamModels = require('./models/teamModels')

const router = express.Router();


router.get('/team', teamController.getAll);
router.post('/team', teamController.createTeam);
router.delete('/team/:id', teamController.deleteTeam);
router.put('/team/:id', teamController.updateTeam);
router.get('/people', peopleController.getAll);
router.post('/people', peopleController.createPeople);
router.delete('/people/:id', peopleController.deletePeople);
router.put('/people/:id', peopleController.updatePeople);



module.exports = router;