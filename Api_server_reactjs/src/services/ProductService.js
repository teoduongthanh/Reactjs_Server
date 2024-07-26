const Product = require("../model/ProductModel");
const bcrypt = require("bcrypt");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image,color, type, price, countInStock, rating, description } = newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "Ok",
          message: "The name of product is already",
        });
      }
      const createdProduct = await Product.create({
        name, image, type,color, price, countInStock, rating, description
      });
      if (createdProduct) {
        resolve({
          status: "Ok",
          message: "SUCCESS",
          data: createdProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (_id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: _id,
      });

      console.log("checkProduct ", checkProduct);

      if (checkProduct === null) {
        resolve({
          status: "Ok",
          message: "The productions is not defined",
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(_id, data, {
        new: true,
      });

      resolve({
        status: "Ok",
        message: "SUCCESS",
        data: updatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailProduct = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productDetail = await Product.find({
        _id: _id,
      });
      if (productDetail === null) {
        resolve({
          status: "Ok",
          message: "The product is not defined",
        });
      }
      resolve({
        status: "Ok",
        message: "Get cussess product",
        data: productDetail,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: _id,
      });

      console.log("Checkk Product", checkProduct);

      if (checkProduct === null) {
        resolve({
          status: "Ok",
          message: "The Product is not defined",
        });
      }

      await Product.findOneAndDelete(_id);
      resolve({
        status: "Ok",
        message: "delete is SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllProduct = (limit , page, sort,filter) => {
  console.log(filter)
  //truyền vào 2 tham số limit là số lượng sản phẩm láy ra và page là số lượng sản phẩm được skip qua để lấy.
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments()
      if(filter){
        const objectFilter = {}
        objectFilter[filter[0]]= filter[1]
        console.log(objectFilter)
        const allProductFilter = await Product.find({
          name: {'$regex':objectFilter.name}
        }).limit(limit).skip(page * limit)
        console.log(allProductFilter)
        resolve({
          status: "Ok",
          message: "Get All Product to data",
          data: allProductFilter,
          totalProduct: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct/limit)
  
        });
      }
      //Sort các giá trị sản phẩm muôn tìm kiểm 
      if(sort){
        const objectSort = {}
        objectSort[sort[1]]= sort[0]
        console.log("objectSort",objectSort)
        const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort);
        resolve({
          status: "Ok",
          message: "Get All Product to data",
          data: allProductSort,
          totalProduct: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct/limit)
  
        });
      }
      const allProduct = await Product.find().limit(limit).skip(page * limit)
      resolve({
        status: "Ok",
        message: "Get All Product to data",
        data: allProduct,
        totalProduct: totalProduct,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProduct/limit)

      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createProduct,
  updateProduct,
  getDetailProduct,
  deleteProduct,
  getAllProduct
};
