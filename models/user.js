/**
 * Created by new on 2015/5/4.
 */
//创建数据表
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema({
    name : String,
    email : String,
    avatarUrl : String
})
//导出User对象
module.exports = User;