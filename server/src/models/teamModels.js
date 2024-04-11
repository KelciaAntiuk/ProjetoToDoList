const connection = require('./connection');

const getAll = async () => {
  const [team] = await connection.execute('SELECT * FROM team');
  return team;

};  

const createTeam = async (team) => { //Recebemos uma team e vamos 'pegar ela

  const  { title } = team; 
  //Aqui 'abrimos' a team e ent 'pegamos' o title, 
  //porque não recebo o status? porque toda team já começará com Status:pendente

  const code = 'INSERT INTO team(title) VALUES (?)';

  const [ createdTeam] = await connection.execute(code , [title]);

  //no banco de dados datas devem ser salvas em UTC:
  //const dateUTC = new Date(Date.now()).toUTCstring();

  return {insertId: createdTeam.insertId};

};

const deleteTeam = async (id) => {

  const code = 'DELETE FROM team WHERE id = ? '

  const removedTeam = await connection.execute(code, [id]);
  return removedTeam;

};

const updateTeam = async (id, team) => {
  const {title} = team;

  const code = 'UPDATE team SET title = ? WHERE id = ? '
  const [updatedTeam] = await connection.execute(code, [title, id]);
  return updatedTeam

}

module.exports = {
  getAll,
  createTeam,
  deleteTeam,
  updateTeam

};