const express = require('express');
const router = express.Router();//Este es un metodo que nos devuelve el objeto router

const KeysController = require('../controllers/KeysController')

//metodos provados

console.log(KeysController.add)
router.post('/add', KeysController.add);



//metodos publicos
router.post("/login", KeysController.login);

module.exports = router;