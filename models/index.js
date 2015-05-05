/**
 * Created by new on 2015/5/4.
 */
//获取mongodb服务
var mongoose = require('mongoose');
//连接mangodb
mongoose.connect('mongodb://localhost/technode');
//把models/user.js中的数据表注入mongodb
exports.User = mongoose.model('User',require('./user'));
exports.Message = mongoose.model('Message', require('./message'))