const { createStore, deleteStore, updateStore } = require("../Controller/storeController");
const { authenticateToken } = require("../Controller/userController");
const router = require('express').Router();

router.post('/create', authenticateToken, createStore);

module.exports = router;