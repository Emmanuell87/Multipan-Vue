const express = require('express');
const router = express.Router();

const keysRouter = require("./keys.js"); // llamamos al manejador de rutas del usuario
// const articulosRouter = require("./articulos.js"); // llamamos al manejador de rutas del articulo
// const categoriasRouter = require("./categorias.js"); // llamamos al manejador de rutas del categorias

router.use("/keys", keysRouter); //usamos el manejador de rutas del usuario
// router.use("/articulos", articulosRouter); //usamos el manejador de rutas del articulo
// router.use("/categorias", categoriasRouter); //usamos el manejador de rutas del categorias

module.exports = router;