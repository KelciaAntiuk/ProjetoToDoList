const teamModels = require('../models/teamModels');

const getAll = async (_req,res) =>{

  const team = await teamModels.getAll();

  return res.status(200).json(team);

};

const createTeam = async (req, res) =>{

  const createdTeam = await teamModels.createTeam(req.body);

  return res.status(201).json(createdTeam)

}

const deleteTeam = async (req, res) =>{

  const { id } = req.params;

  await teamModels.deleteTeam(id);
  return res.status(204).json();


};

const updateTeam = async (req, res) =>{
  const {id} = req.params;

  await teamModels.updateTeam(id, req.body);
  return res.status(204).json();

}

module.exports = {
  getAll,
  createTeam,
  deleteTeam,
  updateTeam

};