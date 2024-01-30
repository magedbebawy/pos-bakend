const { createStore, deleteStore, updateStore, getAllStores } = require("../Controller/storeController");
const { authenticateToken } = require("../Controller/userController");
const router = require('express').Router();

router.post('/create', authenticateToken, createStore);
router.delete('/delete', authenticateToken, deleteStore);
router.get('/allstores', authenticateToken, getAllStores);
router.put('/update', authenticateToken, updateStore);

module.exports = router;