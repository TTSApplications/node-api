const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const productSchema = require('../apiSchema/productSchema');

//Creating post API
router.post('/', // /api/v1/product'[whatever is in this string param'
    joiSchemaValidation.validateBody(productSchema.createProductSchema),
    productController.createProduct
);
    
router.get('/:id', 
    productController.getProductById
)

router.put('/:id',
    joiSchemaValidation.validateBody(productSchema.updateProductSchema),
    productController.updateProduct
)

router.get('/', 
    joiSchemaValidation.validateQueryParams(productSchema.getAllProductSchema),
    productController.getAllProducts
);

router.delete('/:id',
    productController.deleteProduct
)

module.exports = router;