const app= require('./app');
require('dotenv');

const PORT = process.env.PORT || 3333;


app.listen(PORT, () => console.log(`Server Runnning in the port: ${PORT}`));