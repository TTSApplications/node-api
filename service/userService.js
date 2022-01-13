const User = require('../database/models/userModel');
const constants = require('../constants');
const { formatMongoData } = require('../helper/dbHelper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signup = async ({ email, password }) => {

    try{

         //If your key and value are the same (ex. "email: email") you don't have to define both and just use one (ex. "email")
        const user = await User.findOne({ email });

        if (user) {
            throw new Error(constants.userMessage.DUPLICATE_EMAIL);
        }

        //Use bcrypt to encrypt password
        //10-12 is recommended for difficult hash to break for the Salt
        password = await bcrypt.hash(password, 12);

        const newUser = new User({ email, password }); //remember the es6 shortcut as mentioned above (email: email)

        let result = await newUser.save();

        return formatMongoData(result);

    }catch (error){

        console.log('Something went wrong: Service: signup', error);
        throw new Error(error);

    }

}

module.exports.login = async ({ email, password }) => {

    try{

         //If your key and value are the same (ex. "email: email") you don't have to define both and just use one (ex. "email")
        const user = await User.findOne({ email });

        if (!user) { //Check If user is not found
            throw new Error(constants.userMessage.USER_NOT_FOUND);
        }

        const isValid = await bcrypt.compare(password, user.password); //Using bycrypt compare to compare plain text password to encrypted password in db

        if (!isValid){ //If password is invalid
            throw new Error(constants.userMessage.INVALID_PASSWORD);
        }

        //If password is valid we will create token using jsonwebtoken (DO NOT Put Sensitive Data in the Payload, it can be decrypted)
        //This is used to authenticate the source/client from where the request is coming. IT IS NOT SECURE
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY || 'my-secret-key', {expiresIn: '1d'});

        return { token }; //{ token: token }

    }catch (error){

        console.log('Something went wrong: Service: login', error);
        throw new Error(error);

    }

}