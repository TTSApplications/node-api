const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const dbConnection = require('./database/connection');

dotEnv.config();

const app = express();

//Creating our own middleware (can check payload, or validate token, or any operation we want to perfor before moving on)
/*const myMiddleware = (req, res, next) => { //Application Level Middleware
    console.log('Hey Wassup');
    next(); //Move on to the next function
}

app.get('/', myMiddleware, (req, res, next) => {
    res.send('Hello from Node API Server');
}); */

//Db Connectivity
dbConnection();

//CORS Enable Server (third party middleware)
app.use(cors());

//Request payLoad Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); //helps in parsing form url encoded data

//Create the route
app.use('/api/v1/product', require('./routes/productRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));

app.get('/', (req, res, next) => {
    res.send('Hello from Node API Server');
}); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

//Error Handler Middleware (Global)
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({
        status: 500,
        message: err.message,
        body: {}
    })
})