import asyncHandler from 'express-async-handler';
import Product from '../models/productModel';

// @desc Fetch all products
// @route GET /api/plants
// @access public
const getProducts = asyncHandler(async (req, res) => {
  // const keyword = req.query.keyword
  //   ? {
  //       name: {
  //         $regex: req.query.keyword,
  //         $options: 'i',
  //       },
  //     }
  //   : {};

  const products = await Product.find({});

  res.json(products);
});

// @desc Fetch one product
// @route GET /api/plants/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

export { getProducts, getProductById };
