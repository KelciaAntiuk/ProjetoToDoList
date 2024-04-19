const connection = require('./connection');

const getAll = async () => {
  const [cadastro] = await connection.execute('SELECT * FROM cadastro');
  return cadastro;

};  

const createCadastro = async (cadastro) => { //Recebemos uma cadastro e vamos 'pegar ela
  

  const  { title, email, empresa, password } = cadastro; 

  const titleParam = title !== undefined ? title : null;
const empresaParam = empresa !== undefined ? empresa : null;
const emailParam = email !== undefined ? email : null;
const passwordParam = password !== undefined ? password : null;

  //Aqui 'abrimos' a cadastro e ent 'pegamos' o title, 
  //porque não recebo o status? porque toda cadastro já começará com Status:pendente

  //const code = 'INSERT INTO cadastro(title, email, empresa, password) VALUES (?, ?, ?, ?)';

  const [createdCadastro] = await connection.execute('INSERT INTO users (title, empresa, email, password) VALUES (?, ?, ?, ?)', [titleParam, empresaParam, emailParam, passwordParam]);

  //no banco de dados datas devem ser salvas em UTC:
  //const dateUTC = new Date(Date.now()).toUTCstring();

  return {insertId: createdCadastro.insertId};

};

const deleteCadastro = async (id) => {

  const code = 'DELETE FROM cadastro WHERE id = ? '

  const removedCadastro = await connection.execute(code, [id]);
  return removedCadastro;

};

const updateCadastro = async (id, cadastro) => {
  const {title} = cadastro;

  const code = 'UPDATE cadastro SET title = ? WHERE id = ? '
  const [updatedCadastro] = await connection.execute(code, [title, id]);
  return updatedCadastro

}

module.exports = {
  getAll,
  createCadastro,
  deleteCadastro,
  updateCadastro

};