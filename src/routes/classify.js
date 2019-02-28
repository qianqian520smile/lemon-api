/**
 * 操作分类接口
 */
var express = require('express');
var router = express.Router();
var classifyAPI = require('./classify_api') //载入业务逻辑模块

/**查询自定义分类接口 */
// console.log(classifyAPI)
router.get('/api/getcustom', classifyAPI.getcustom);

/**添加自定义分类接口 */
router.post('/api/addcustorn', classifyAPI.addcustom);

/**查询个人用户分类接口 */
router.get('/api/getclassify', classifyAPI.getclassify);
module.exports = router;