/*
 * @Author: 布淑倩 
 * @Date: 2019-02-27 14:06:28 
 * @Last Modified by: 布淑倩
 * @Last Modified time: 2019-02-28 10:38:47
 */

var express = require('express');
var router = express.Router();
var billApi = require('./bill_api') //载入业务逻辑模块

/**添加账单接口 */
router.post('/api/addbill', billApi.addbill);

/**查看账单接口 */
router.post('/api/getbill', billApi.getbill);

/**删除账单接口 */
router.get('/api/delbill', billApi.delbill);

module.exports = router;