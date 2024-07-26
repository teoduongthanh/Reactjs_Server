const express = require("express");
const router = express.Router();
const userController = require('../controller/UserController');
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

router.post('/sign-up',userController.createUser)

router.post('/logout-user',userController.logoutUser)
router.post('/loggin-user',userController.logginUser)

router.put('/update-user/:_id',authUserMiddleware,userController.updateUser)
//khi chạy pua api delete sẽ chạy qua một midleware để xác nhận các điều kiện cần ddeeer xóa user
router.delete('/delete-user/:_id',authMiddleware,userController.deleteUser)

router.get('/getall-user',authMiddleware,userController.getAllUser)

router.get('/get-detail-user/:_id' ,authUserMiddleware,userController.getDetailUser)

router.post('/refresh-token',userController.refreshToken)

module.exports = router;