// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import functions from productController.js
const {getAllProducts} = require("./Controller/productController");
const {getProductById} = require("./Controller/productController");
const {createProduct} = require("./Controller/productController");
const {updateProduct} = require("./Controller/productController");
const {deleteProduct} = require("./Controller/productController");

// Load environment variables from .env file
require ("dotenv").config();

// Create an instance of the Express.js server
const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())

//Routes for the APIs
app.use("/api/get", getAllProducts);
app.use("/api/search/:id", getProductById);
app.use("/api/save", createProduct);
app.use("/api/update/:id", updateProduct);
app.use("/api/delete/:id", deleteProduct);

// assigning the port and mongodb url
const PORT = 8000;
const URL = process.env.MONGODB_URL;

//mongodb connection establishement
mongoose.connect(URL).then(()=> {
    console.log('DB Connected Successfully');
})
.catch((err) => console.log('DB Connection Error',err));

app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`);
});