const cadastroModels = require('../models/cadastroModels');

const getAll = async (_req,res) =>{
  const cadastro = await cadastroModels.getAll();
  return res.status(200).json(cadastro);
};

const createCadastro = async (req, res) =>{
  const createdCadastro = await cadastroModels.createCadastro(req.body);
  return res.status(201).json(createdCadastro)
}

const deleteCadastro = async (req, res) =>{
  const { id } = req.params;
  await cadastroModels.deleteCadastro(id);
  return res.status(204).json();
};

const updateCadastro = async (req, res) =>{
  const {id} = req.params;
  await cadastroModels.updateCadastro(id, req.body);
  return res.status(204).json();
};

module.exports = {
  getAll,
  createCadastro,
  deleteCadastro,
  updateCadastro

};