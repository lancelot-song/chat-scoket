/**
 * Created by new on 2015/4/29.
 */
var express = require('express')
var app = express()
var port = process.env.PORT || 3000

console.log(__dirname)
app.use(express.static(__dirname + '/static'))

app.use(function (req, res) {
    res.sendfile('./static/index.html')
})

//导入socket.io模块
var io = require('socket.io').listen(app.listen(port)),
    msg = [];//创建消息组

//监听
io.sockets.on('connection', function (socket) {
    //监听客户端发送的消息
    socket.on('mgs.read',function(){
        //给当前socket的客户端发送消息
        socket.emit('mgs.read',msg);
    });

    //监听客户端发送的消息
    socket.on('mgs.create',function(message){
        //添加消息至数组
        msg.push(message);
        //给所有客户端发送消息
        io.sockets.emit('mgs.add',message);
    });
});

console.log('TechNode is on port ' + port + '!')