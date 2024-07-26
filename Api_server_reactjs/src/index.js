const express = require("express");
const dotenv = require("dotenv");
const mongoose =require('mongoose'); 
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//cung cấp các cấu hình cho router API

const app = express();

const port = process.env.PORT || 5001;
app.use(cors())
dotenv.config();

//nhận api mặc định khi kết nối server
app.get("/", (req, res) => {
  return res.send("Cussess connect with Port");
});

const URL = process.env.DATABASE_URL;

//kiểm tra xem cso kết nối thành công hay không
mongoose.connect(`${URL}`)  
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });


app.use(bodyParser.json())
app.use(cookieParser())

routes(app);

app.listen(port, () => {
    console.log("Server is running on ",port);
});




