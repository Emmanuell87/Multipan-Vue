const express = require('express');
const router = express.Router();//Este es un metodo que nos devuelve el objeto router

const KeysController = require('../controllers/KeysController')

//metodos privados

router.post('/add', KeysController.add);
router.get('/list', KeysController.list);
router.put('/update', KeysController.update);
router.put('/enabled', KeysController.enabled);
router.put('/disabled', KeysController.disabled);



//metodos publicos
router.post("/login", KeysController.login);

module.exports = router;