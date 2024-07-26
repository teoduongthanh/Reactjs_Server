const UserSevice = require("../services/UserSevice");

const JwtUserSevice = require("../services/jwtService");

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword} = req.body;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isCheckEmail = re.test(email);

    if (!name || !email || !password || !confirmPassword ) {
      return res.status(400).json({
        status: "Error",
        message: "the input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        status: "Error",
        message: "the input is not email",
      });
    } else if (password !== confirmPassword) {
      return res.status(400).json({
        status: "Error",
        message: "the input is not equal password",
      });
    }

    const resp = await UserSevice.createUser(req.body);
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const logginUser = async (req, res) => {
  try {

    const { email, password } = req.body;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isCheckEmail = re.test(email);

    if (!email || !password) {
      return res.status(400).json({
        status: "Error",
        message: "the input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        status: "Error",
        message: "the input is not email",
      });
    }

    const resp = await UserSevice.logginUser(req.body);
    //lấy các property còn lại ngoại trù refersh token
    const { refresh_token, ...newReponse } = resp;
    //res.cookie(tên, giá trị [, tùy chọn])
    //Tham số: Tham số tên giữ tên của cookie và tham số giá trị là giá trị được gán cho tên cookie. Tham số tùy chọn chứa các thuộc tính khác nhau như mã hóa, hết hạn, tên miền, v.v.
    // Giá trị trả về: Nó trả về một đối tượng.
    res.cookie("refresh_token", refresh_token,{
      //giúp tăng tính bảo mật cho client, đảm bảo rằng cookie không thể được truy cập thông qua JavaScript trong trình duyệt
      httpOnly: true,
      //hiết lập này đảm bảo rằng cookie chỉ được gửi qua các kết nối HTTPS, giúp ngăn chặn việc cookie bị đánh cắp khi truyền qua các kết nối HTTP không an toàn.
      Secure: false,
      samsite: 'strict'
    })
    return res.status(200).json(newReponse);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie('refresh_token');
    return res.status(200).json({
      status: "OK",
      message:'logout  '
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.params._id;
    const data = req.body;
    if (!userId) {
      return res.status(400).json({
        status: "Error",
        message: "the userID is required",
      });
    }
    
    const resp = await UserSevice.updateUser(userId, data);
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params._id;
    const token = req.headers;
    console.log("token is ", token);
    if (!userId) {
      return res.status(400).json({
        status: "Error",
        message: "the userID is required",
      });
    }
    const resp = await UserSevice.deleteUser(userId);
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const resp = await UserSevice.getAllUser();
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailUser = async (req, res) => {
  try {
    const userId = req.params._id;
    const resp = await UserSevice.getDetailUser(userId);
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  console.log("req.cookies.refresh_token",req.cookies.refresh_token);

  try {
    const token = req.cookies.refresh_token
    console.log("token refresh", token);
    if (!token) {
      return res.status(200).json({
        status: "Error",
        message: "the the is requied",
      });
    }
    const resp = await JwtUserSevice.refreshTokenJWTService(token);
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
module.exports = {
  createUser,
  logginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  refreshToken,
  logoutUser
};
