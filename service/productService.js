//Purpose of this service is to input data into the database

const Product = require('../database/models/productModel');
const {formatMongoData} = require('..//helper/dbHelper');

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

        let product = await Product.findById(id);
        return formatMongoData(product);

    }catch (error){
        console.log('Something went wrong: Service: getProductById', error);
        throw new Error(error);
    }

}