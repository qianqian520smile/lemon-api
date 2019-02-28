var express = require('express');
var router = express.Router();
var userAPI = require("./user");
/* 添加用户接口 */
router.post('/api/addUser', userAPI.addUser);

module.exports = router;