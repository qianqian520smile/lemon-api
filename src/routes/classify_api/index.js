/***
 * 分类业务模块
 */
var Mongo = require('mongodb-curd');
var batabaseName = 'lemon';
var collcationName = 'icon'; //自定义分类集合
var collcationName2 = 'classify'; //分类集合

/**
 * 查询自定义分类
 */
function getcustom(req, res, next) {
    Mongo.find(batabaseName, collcationName, {}, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            res.send({
                code: 1,
                mes: "success",
                data: result
            })
        }
    }, {
        skip: 0,
        limit: 0
    })
}


/**
 * 添加自定义分类
 */
function addcustom(req, res, next) {
    var params = req.body;
    //判断参数是否齐全
    if (!params.icon || !params.cName || !params.uID || !params.type) {
        res.send({
            code: 3,
            mes: "缺少参数"
        })
        return;
    }

    //判断是否有该分类   查询分类  条件  分类名    all    个人用户
    ishasclassify();

    function ishasclassify() {
        Mongo.find(batabaseName, collcationName2, {
            'cName': params.cName,
            'uID': { "$in": ['all', params.uID] }
        }, function(result) {
            if (result.length) {
                res.send({
                    code: 4,
                    mes: "该分类已经存在"
                })
                return;
            } else { //添加分类
                addclassify();
            }
        })
    }

    //添加分类
    function addclassify() {
        Mongo.insert(batabaseName, collcationName2, params, function(result) {
            if (!result) {
                res.send({
                    code: 0,
                    mes: "error"
                })
            } else {
                res.send({
                    code: 1,
                    mes: "success",
                    data: result
                })
            }
        })
    }
}



/**
 * 查询所有的分类：条件:uID:{"$in":['all',"个人ID"]}
 */

function getclassify(req, res, next) {
    var params = req.query;
    //是否缺少参数
    if (!params.uID) {
        res.send({
            code: 3,
            msg: "缺少参数"
        })
        return;
    }

    Mongo.find(batabaseName, collcationName2, {
            'uID': { "$in": ['all', params.uID] }
        }, function(result) {
            if (!result) {
                res.send({
                    code: 0,
                    mes: "error"
                })
            } else {
                res.send({
                    code: 1,
                    mes: "success",
                    data: result
                })
            }
        }, {
            skip: 0,
            limit: 0
        })
        //查询个人用户下所有的分类：条件uID：{"$in":["all","个人ID"]}
}





module.exports = {
    getcustom: getcustom,
    addcustom: addcustom,
    getclassify: getclassify
}