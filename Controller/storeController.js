const Errors = require('../utils/errors');
const pool = require('../db/db');
const { 
    create_store,
    delete_store,
    update_store,
    get_all_stores

} = require('../db/queries');

// create errors instance
const errorMessages = new Errors();

// API to create store
const createStore = async (req, res) => {
    
    try {
        const { name, address, phone, tax } = req.body;
        const { id } = req.user;

        await pool.query(create_store, [id, name, address, phone, tax]);

        return res.send(errorMessages.success('Store created successfully'));
    } catch (err) {
        console.log(err);
        return res.send(errorMessages.serverError('Error creating store'));
    }
}

// API to delete store
const deleteStore = async (req, res) => {
    try {

        const store_id = req.body.store_id;
        const user_id = req.user.id;
        await pool.query(delete_store, [user_id, store_id]);

        return res.send(errorMessages.success('Store deleted successfully'));

    } catch (err) {
        console.log(err);
        return res.send(errorMessages.serverError('Error deleting store'));
    }
}

// API to update store
const updateStore = async (req, res) => {
    try {
        const {store_id, name, phone, address, tax } = req.body;
        const { id } = req.user;

        await pool.query(update_store, [id, store_id, name, phone, address, tax]);

    } catch (err) {
        console.log(err);
        return res.send(errorMessages.serverError('Error updating store info'));
    }
}

// API to get stores
const getAllStores = async (req, res) => {
    try {
        console.log(req.user);
        const { id } = req.user;
        const dbRes = await pool.query(get_all_stores, [id]);
        console.log(dbRes);
        const stores = dbRes.rows;
        return res.status(200).send({stores});
    } catch (err) {
        console.log(err);
        const error = errorMessages.serverError('Error getting stores')
        return res.status(error.status).send(error);
    }
}

module.exports = {
    createStore,
    deleteStore,
    updateStore,
    getAllStores
}