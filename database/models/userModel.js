const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: String,
    password: String

}, {
    timestamps: true, //will automatically add the created at date, and automatically update

    toObject: {
        transform: function(doc, ret, options){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password; //Don't want to send the password back to the user
            delete ret.__v;
            return ret;
        }
    }

});

module.exports = mongoose.model('User', userSchema);