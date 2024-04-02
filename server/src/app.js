
const express = require('express');
const cors = require('cors');
const router = require('./router');
console.log('Versão do Express:', express.version);

const app = express();

app.use(express.json());//precisa definiar antes de usar qauluqer rota

app.use(cors());

app.use('/', router);



module.exports = app;