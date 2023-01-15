//  SERVER (implemented in node.js)

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const routes = require('./routes/index');
const cors = require('cors');
const PORT = process.env.port||4000;
require('dotenv-flow').config();
//connexion to MongoDb
console.log('database host:', process.env.DATABASE_HOST);
mongoose.connect(process.env.DATABASE_HOST,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('SUCCESS !'))
  .catch(() => console.log('ERROR !'));

//use express.js
const app = express();

app.use(morgan('dev'));
app.use(express.json());

//use cors
app.use(cors());

app.use('/',routes);

app.listen(PORT,()=>{
    console.log(`started on port ${PORT}`);
})

