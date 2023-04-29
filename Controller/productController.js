const Product = require("../model/productModel");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product
const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a product
const createProduct = async (req, res) => {
  const { sku, name, description, price, image } = req.body;
  if (!sku || !name || !description || !price || !image) {
    return res
      .status(400)
      .json({ message: "Please provide sku, name, description, and price" });
  }
  const product = new Product({
    sku,
    name,
    description,
    price,
    image,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update a product
const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { sku, name, description, price, image } = req.body;
  console.log(id);
  console.log(req.params);
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.sku = sku || product.sku;
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.image = image || product.image;

    // Check if user has authorization to update product
    if (product.user && product.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Delete a prodcut
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
      const product = await Product.findById(id);

      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      if (product.user && product.user.toString() !== req.user._id.toString()) {
          return res.status(401).json({ message: "Unauthorized" });
      }

      await product.deleteOne();
      res.json({ message: 'Product removed' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}


//exports all the modules
  module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
