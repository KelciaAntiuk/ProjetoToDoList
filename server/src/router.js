const express = require('express');

const teamController = require('./controllers/teamController');
const teamModels = require('./models/teamModels')

const router = express.Router();


router.get('/team', teamController.getAll);
router.post('/team', teamController.createTeam);
router.delete('/team/:id', teamController.deleteTeam);
router.put('/team/:id', teamController.updateTeam);



module.exports = router;