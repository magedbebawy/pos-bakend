const Validate = require('../utils/validate');
const Errors = require('../utils/errors');

// create a Validate instance
const validate = new Validate();

// create Errors instance
const errorsMessage = new Errors(); 

// API to create an admin (new customer/store owner)
const adminSignUp = async (req, res) => {

    try {
        // validate data
        const errors = [];
        console.log(req.body);
        if(!req.body) return res.send(errorsMessage.validationError("Request body is empty"));
        const data = req.body;
        console.log(data);
        // add admin to db

        return res.send(errorsMessage.success('Admin created successfully'));
    } catch (error) {
        console.log('error:', error);
        return res.send(errorsMessage.serverError(error));
    }
};

// API to signin an admin (customer/store owner)
const adminSignIn = async (req, res) => {

    try {
        
    } catch (error) {
        console.log('error:', error);
    }
};

// API to create cashier
const userSignup = async (req, res) => {

    try {
        
    } catch (error) {
        console.log('error:', error);
    }
};

// API to signin cashier
const userSignIn = async (req, res) => {

    try {
        
    } catch (error) {
        console.log('error:', error);
    }
};

module.exports = {
    adminSignUp,
    adminSignIn,
    userSignup,
    userSignIn
}