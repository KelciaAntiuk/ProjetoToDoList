const connection = require('./connection');

const getAll = async () => {
  const [people] = await connection.execute('SELECT * FROM people');
  return people;

};  

const createPeople = async (people) => { //Recebemos uma people e vamos 'pegar ela

  const  { title, team_id, user } = people; 
  //Aqui 'abrimos' a people e ent 'pegamos' o title, 
  //porque não recebo o status? porque toda people já começará com Status:pendente

  const code = 'INSERT INTO people(title,team_id, user) VALUES (?, ?, ?)';

  const [ createdPeople] = await connection.execute(code , [title, team_id, user]);

  //no banco de dados datas devem ser salvas em UTC:
  //const dateUTC = new Date(Date.now()).toUTCstring();

  return {insertId: createdPeople.insertId};

};

const deletePeople = async (id) => {

  const code = 'DELETE FROM people WHERE id = ? '

  const removedPeople = await connection.execute(code, [id]);
  return removedPeople;

};

const updatePeople = async (id, people) => {
  const {title} = people;

  const code = 'UPDATE people SET title = ? WHERE id = ? '
  const [updatedPeople] = await connection.execute(code, [title, id]);
  return updatedPeople

}

module.exports = {
  getAll,
  createPeople,
  deletePeople,
  updatePeople

};