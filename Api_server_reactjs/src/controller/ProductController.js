const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    const { name, image, type,color, price, countInStock, rating, description } = req.body;
    console.log("req.body", req.body);

    if (!name ||!color ||!image ||!type ||!price ||!countInStock ||!rating ||!description) {
      return res.status(400).json({
        status: "ERR",
        message: "the input is required",
      });
    } 
    const resp = await ProductService.createProduct(req.body);
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params._id;
    const data = req.body;
    if(!productId){
      return res.status(400).json({
        status: "ERR",
        message: "the productId is required",
      });
    }
    console.log("user id", productId);

    const resp = await ProductService.updateProduct(productId, data);
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getDetailProduct = async (req, res) => {
  try {
    const productId = req.params._id;
    const resp = await ProductService.getDetailProduct(productId);
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params._id;
    if(!productId){
      return res.status(400).json({
        status: "ERR",
        message: "the productId is required",
      });
    }
    const resp = await ProductService.deleteProduct(productId);
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getAllProduct = async (req, res) => {
  try {
    const {limit, page,sort, filter} = req.query;
    const resp = await ProductService.getAllProduct(Number( limit) || 8,Number( page)||0,sort,filter);
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailProduct,
  deleteProduct,
  getAllProduct
};
