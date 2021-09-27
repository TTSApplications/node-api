module.exports = {
    defaultServerResponse: {
        status: 400,
        message: '',
        body: {}
    },
    productMessage: {
        PRODUCT_CREATED: 'Product Created Successfully',
        PRODUCT_FETCHED: 'Product Fetched Successfully',
        PRODUCT_UPDATED: 'Product Updated Successfully',
        PRODUCT_DELETED: 'Product Deleted Successfully',
        PRODUCT_NOT_FOUND: 'Product Not Found'
    },

    userMessage: {
        SIGNUP_SUCCESS: 'Signup Successful',
        DUPLICATE_EMAIL: 'User already exist with given email'
    },

    requestValidationMessage: {
        BAD_REQUEST: 'Invalid fields'
    },

    databaseMessage: {
        INVALID_ID: 'Invalid Id'
    }

}