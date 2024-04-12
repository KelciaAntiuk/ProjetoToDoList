const peopleModels = require('../models/peopleModels');

const getAll = async (_req,res) =>{
  const people = await peopleModels.getAll();
  return res.status(200).json(people);
};

const createPeople = async (req, res) =>{
  const createdPeople = await peopleModels.createPeople(req.body);
  return res.status(201).json(createdPeople)
}

const deletePeople = async (req, res) =>{
  const { id } = req.params;
  await peopleModels.deletePeople(id);
  return res.status(204).json();
};

const updatePeople = async (req, res) =>{
  const {id} = req.params;
  await peopleModels.updatePeople(id, req.body);
  return res.status(204).json();
}

module.exports = {
  getAll,
  createPeople,
  deletePeople,
  updatePeople

};