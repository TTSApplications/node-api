const constants = require('../constants');
const jwt = require('jsonwebtoken');

module.exports.validateToken = (req, res, next) => { //Going to have access to the request object, response object, and the next function

    let response = { ...constants.defaultServerResponse };

    try {

        if (!req.headers.authorization){ //Check if authorization (token) is present in the header
            throw new Error(constants.requestValidationMessage.TOKEN_MISSING);
        }

        const token = req.headers.authorization.split('Bearer')[1].trim(); //Seperating Key from 'authorization:' and trim the whitespace before the token in the first index
        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'my-secret-key'); //Verifying Token
        console.log('decoded', decoded);

        return next();

    } catch (error) {
        console.log('Error' , error);
        response.message = error.message; 
        response.status = 401; //Sending 401 instead of 400, as 401 is standard db error code for unauthorized access
    }

    return res.status(response.status).send(response); //Returning Response

}