//Purpose of this service is to input data into the database

const Product = require('../database/models/productModel');
const {formatMongoData, checkObjectID} = require('..//helper/dbHelper');
const constants = require('../constants');

module.exports.createProduct = async (serviceData) => {

    try{

        let product = new Product({...serviceData}); //Note: Spread
        let result = await product.save();
        return formatMongoData(result);

    }catch (error){
        console.log('Something went wrong: Service: createProduct', error);
        throw new Error(error);
    }

}

module.exports.getAllProducts = async ({ skip = 0, limit = 10}) => { //default values

    try{

        let products = await Product.find({}).skip(parseInt(skip)).limit(parseInt(limit)); //Note: Spread
        return formatMongoData(products);

    }catch (error){
        console.log('Something went wrong: Service: getAllProducts', error);
        throw new Error(error);
    }

}

module.exports.getProductById = async ({ id }) => { //default values

    try{

        checkObjectID(id);

        let product = await Product.findById(id);

        if (!product){
            throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
        }

        return formatMongoData(product);

    }catch (error){
        console.log('Something went wrong: Service: getProductById', error);
        throw new Error(error);
    }

}

module.exports.updateProduct = async ({ id, updateInfo }) => { //default values

    try{

        checkObjectID(id);

        let product = await Product.findOneAndUpdate(
            { _id: id },
            updateInfo,
            { new: true } //Pass this to return the UPDATED document
        )

        if (!product){
            throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
        }

        return formatMongoData(product);

    }catch (error){
        console.log('Something went wrong: Service: updateProduct', error);
        throw new Error(error);
    }

}