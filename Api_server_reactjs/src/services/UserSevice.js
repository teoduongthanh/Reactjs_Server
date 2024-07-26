const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./jwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password} = newUser;
    console.log("newUser",newUser)
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({
          status: "Error",
          message: "The email is already",
        });
      }
      //mã hóa dữ liệu mật khẩu User
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        email,
        password: hash
      });
      
      if (createdUser) {
        resolve({
          status: "Ok",
          message: "SUCCESS",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const logginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password} = userLogin;
    console.log("userLogin",userLogin)
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      console.log("checkUser",checkUser)
      if (checkUser == null) {
        resolve({
          status: "Error",
          message: "The user is not defined",
        });
      }
      //kiểm tra xem passwork người nhập với password trong data có đúng hay không
      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      console.log("comparePassword",comparePassword)

      if (!comparePassword) {
        resolve({
          status: "Error",
          message: "The password or user is incorrect",
        });
      }
      //sau khi kieermt ra pasword tành công

      const access_token = await genneralAccessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await genneralRefreshToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });
      resolve({
        status: "Ok",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (_id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: _id,
      });

      console.log("Checkk user", checkUser);

      if (checkUser === null) {
        resolve({
          status: "Ok",
          message: "The user is not defined",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(_id, data, {
        new: true,
      });

      resolve({
        status: "Ok",
        message: "SUCCESS",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: _id,
      });

      console.log("Checkk user", checkUser);

      if (checkUser === null) {
        resolve({
          status: "Ok",
          message: "The user is not defined",
        });
      }

      await User.findOneAndDelete(_id);
      resolve({
        status: "Ok",
        message: "delete is SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();
      resolve({
        status: "Ok",
        message: "Get All USer to data",
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailUser = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userDetail = await User.find({
        _id: _id,
      });
      if (userDetail === null) {
        resolve({
          status: "Ok",
          message: "The user is not defined",
        });
      }
      resolve({
        status: "Ok",
        message: "Get cussess user",
        data: userDetail,
      });
    } catch (e) {
      reject(e);
    }
  });
};


module.exports = {
  createUser,
  logginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser
};
