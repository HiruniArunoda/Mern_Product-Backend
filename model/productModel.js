const mongoose = require('mongoose');

//prodcut schema creation
const productSchema = new mongoose.Schema({

  sku:{
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;