const express = require('express');
const router = express.Router();

const keysRouter = require("./keys.js");

router.use("/keys", keysRouter);

module.exports = router;