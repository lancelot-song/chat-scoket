/**
 * Created by new on 2015/5/4.
 */
//***这里是登陆验证逻辑 配置好给app.js拿来执行获取数据***//

//先通过models中的配置拿到配置好的数据表
var db = require('../models');
var async = require('async');
var gravatar = require('gravatar');

//通过用户ID查找数据
exports.findUserById = function(_userId,callback){
    db.User.findOne({
        _id : _userId
    },callback);
};

//通过用户邮箱查找数据，如果没有找到则使用此邮箱创建一个用户并使用gravatar的Node模块生成头像
exports.findUserEmailOrCreate = function(_email,callback){
    db.User.findOne({
        email : _email
    },function(err,user){
        if(user){
            callback(null,user)
        }else{
            user = new db.User;
            user.name = _email.split('@')[0];
            user.email = _email;
            user.avatar = gravatar.url(_email);
            user.save(callback);
        }
    });
};

