import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'



const app = express();



//CONEXION A BASE DE DATOS
const mongoose = require('mongoose');
    // IMPORTACION VARIABLES .ENV
const dotenv = require('dotenv').config();
const URL = process.env.DB_URL;
mongoose.Promise = global.Promise;

// mongoose.connect(URL, options).then(
//     () => {
//         console.log('conectado a DB')
//     },
//     err => {consolo.log(err)}
// );

mongoose.connect(URL)
.then(mongoose => console.log("conectado a DB"))
.catch(err => console.log(err))


// MIDDLEWARE
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));// aplication/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')));


//Rutas
// app.get('/',s function(req, res){

//     res.send('Hola mundo');

// });

// const apiRouter = ; //Agregar /api a la ruta

app.use('/api', require('./routes/index'));
// app.use('/api/', require('./routes/D_productos'))

// MIDDLEWARE PARA VUE.JS ROUTER MODO HISTORY
const history = require('connect-history-api-fallback');
app.use(history())
app.use(express.static(path.join(__dirname, 'public')))

// Puerto

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function(){
    console.log('Example app listening on port ' + app.get('puerto'))
})