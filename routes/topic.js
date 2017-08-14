const express = require('express');
var router = express.Router();
var topicCtrl = require("../controller/topicController");
var userCheck = require("../config/userCheck.js");

router.get('/create', userCheck, topicCtrl.create);
router.post('/docreate', userCheck, topicCtrl.docreate);
router.get('/show/:_id', userCheck, topicCtrl.show);

router.post('/reply', userCheck, topicCtrl.reply);



module.exports = router;
