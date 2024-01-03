const Errors = require('../utils/errors');
const pool = require('../db/db');
const { insertNewStore } = require('../db/queries');

// create errors instance
const errorMessages = new Errors();

// API to create store
const createStore = async (req, res) => {
    
    try {
        const { name, address, phone, tax } = req.body;
        const { id } = req.user;

        await pool.query(insertNewStore, [id, name, address, phone, tax]);

        return res.send(errorMessages.success('Store created successfully'));
    } catch (err) {
        console.log(err);
        return res.send(errorMessages.serverError('Error creating store'));
    }
}

// API to delete store
const deleteStore = async () => {

}

// API to update store
const updateStore = async () => {

}

// API to get stores
const getAllStores = async () => {
    
}

module.exports = {
    createStore,
    deleteStore,
    updateStore
}