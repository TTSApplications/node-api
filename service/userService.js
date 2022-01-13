const User = require('../database/models/userModel');
const constants = require('../constants');
const { formatMongoData } = require('../helper/dbHelper');
const bcrypt = require('bcrypt');

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