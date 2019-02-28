/**
 * 
 */
var Mongo = require('mongodb-curd');
var batabaseName = 'lemon';
var collcationName = 'bill'; //账单集合


/**
 * 添加账单
 */
function addbill(req, res, next) {
    var pamas = req.body;
    if (!pamas.uID || !pamas.ctime || !pamas.money || !pamas.icon || !pamas.type) {
        res.send({
            code: 3,
            msg: "无参数"
        })
        return;
    }
    Mongo.insert(batabaseName, collcationName, pamas, function(result) {
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


/**
 * 获取账单
 */
function getbill(req, res, next) {
    var pamas = req.body;
    var query = null;
    var reg = pamas.ctime && new RegExp('^' + pamas.ctime);
    //判断是否缺少参数
    if (!pamas.uID || !pamas.ctime) {
        res.send({
            code: 3,
            msg: "缺少参数"
        })
        return;
    }
    if (!pamas.classify) {
        query = { //查询条件
            "uID": pamas.uID,
            "ctime": reg
        };
    } else {
        query = { //查询条件
            "uID": pamas.uID,
            "ctime": reg,
            "cName": { "$in": pamas.classify.split(',') }
        };
    }
    Mongo.find(batabaseName, collcationName, query, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            if (result.length) {
                res.send({
                    code: 1,
                    mes: "success",
                    data: result
                })
            } else {
                res.send({
                    code: 2,
                    mes: "没有查询到相关数据",
                    data: result
                })
            }
        }
    })
}

function delbill(req, res, next) {
    //根据id进行删除
    var id = req.query.id;
    if (!id) {
        res.end({
            code: 3,
            msg: "缺少参数"
        })
        return;
    }
    //删除
    Mongo.remove(batabaseName, collcationName, { "_id": id }, function(result) {
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
module.exports = {
    addbill: addbill,
    getbill: getbill,
    delbill: delbill
}