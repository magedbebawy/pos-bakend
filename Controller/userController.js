const Validate = require('../utils/validate');
const Errors = require('../utils/errors');
const pool = require('../db/db');
const {insertNewAdmin, getAdminInfoByUserId} = require('../db/queries');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// create a Validate instance
const validate = new Validate();

// create Errors instance
const errorsMessage = new Errors(); 

// API to create an admin (new customer/store owner)
const adminSignUp = async (req, res) => {

    try {
        // validate data
        const errors = [];
        if(!req.body) return res.send(errorsMessage.validationError(["Invalid request"]));
        const data = req.body;
        const validateInput = validateSignUp(data);
        if(validateInput && validateInput.length > 0) {
            return res.send(errorsMessage.validationError(validateInput));
        }

        // hash password
        const password = await bcrypt.hash(data.password, 10);
    
        // add admin to db
        await pool.query(insertNewAdmin, [data.name, data.userid, password, data.email]);
        return res.send(errorsMessage.success('Admin created successfully'));
        
    } catch (error) {
        console.log('error:', error);
        return res.send(errorsMessage.serverError(error));
    }
};

// API to signin an admin (customer/store owner)
const adminSignIn = async (req, res) => {

    try {
        // validate data
        if(!req.body) return res.send(errorsMessage.validationError(['Invalid request']));
        const data = req.body;
        const validateInput = validateSignIn(data);
        if(validateInput && validateInput.length > 0) {
            return res.send(errorsMessage.validationError(validateInput));
        };

        // get password from db
        const dbRes = await pool.query(getAdminInfoByUserId, [data.userid]);
        const dbPassword = dbRes.rows[0].password;

        // compare passwords
        const compareRes = await bcrypt.compare(data.password, dbPassword);
        if(!compareRes) return res.send(errorsMessage.authorizationError(['Invalid password']));

        // generate jwt
        const payload = {
            id: data.userid,
            name: dbRes.rows[0].fullname,
            role: 'Admin'
        };

        const options = {
            expiresIn: '1m'
        }

        const token = jwt.sign(payload, process.env.SECRETKEY, options);

        return res.send(errorsMessage.success('Admin signed in successfully', {token}));
    } catch (error) {
        console.log('error:', error);
        return res.send(errorsMessage.serverError(error));
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

// verify token and generate a new one
const verify = async (req, res) => {
    try {
        if(!req.body || !req.body.token)return res.send(errorsMessage.validationError(['Missing token']));
        jwt.verify(req.body.token, process.env.SECRETKEY, (err, decoded) => {
            if(err) {
                return res.send(errorsMessage.authorizationError(err));
            }

            const payload = {
                id: decoded.id,
                name: decoded.name,
                role: 'Admin'
            };
    
            const options = {
                expiresIn: '32d'
            }

            const token = jwt.sign(payload, process.env.SECRETKEY, options);
            return res.send(errorsMessage.success('Token verified successfully', {token}));
        })
    } catch (error) {
        console.log('error:', error);
        return res.send(errorsMessage.serverError('Error verifing token'));
    }
};

const validateSignUp = (data) => {
    const errors = [];
    if(!data.name || data.name.length < 4) errors.push('A valid name is required');
    if(!data.email || !validate.isEmail(data.email)) errors.push('A valid email is required');
    if(!data.userid || data.userid < 5) errors.push('A valid user ID is required');
    if(!data.password || data.password.length < 10) errors.push('A valid password is required');
    if(errors.length > 0) {
        return errors;
    } else {
        return null;
    }
}

const validateSignIn = (data) => {
    const errors = [];
    if(!data.userid || data.userid < 5) errors.push('A valid user ID is required');
    if(!data.password || data.password.length < 10) errors.push('A valid password is required');
    if(errors.length > 0) {
        return errors;
    } else {
        return null;
    }
}

module.exports = {
    adminSignUp,
    adminSignIn,
    userSignup,
    userSignIn,
    verify
}