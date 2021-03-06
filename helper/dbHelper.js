const mongoose = require('mongoose');
const constants = require('../constants');

module.exports.formatMongoData = (data) => {

    if(Array.isArray(data)) { //Checking if data that's sent is object or Array of Object

        let newDataList = []
        for(value of data) {

            newDataList.push(value.toObject());

        }
        return newDataList
    }
    return data.toObject();
}

module.exports.checkObjectID = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(constants.databaseMessage.INVALID_ID);
    }
}