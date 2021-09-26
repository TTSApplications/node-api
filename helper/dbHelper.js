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