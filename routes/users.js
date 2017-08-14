var express = require('express');
var router = express.Router();
const userCtrl = require('../controller/userController');
const userCheck = require('../config/userCheck');
/* GET users listing. */
router.get('/reg', userCtrl.reg);
router.post('/doreg', userCtrl.doreg);
router.get('/active', userCtrl.active);
//用户从邮箱发起的请求
router.get('/activeok:id', userCtrl.activeok);
router.get('/login', userCtrl.login);
router.post('/signin', userCtrl.dologin);

router.get("/setting", userCheck, userCtrl.setting);
router.post("/dosetting", userCheck, userCtrl.dosetting);

router.post("/dochange", userCheck, userCtrl.dochange);
router.get("/exit", userCtrl.exit);

module.exports = router;
