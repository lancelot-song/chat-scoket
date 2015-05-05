var express = require('express');
var async = require('async');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var app = express();
var path = require('path')
var port = process.env.PORT || 3000;
var Controllers = require('./controllers');
var signedCookieParser = cookieParser('technode')
var MongoStore = require('connect-mongo')(session);
var sessionStore = new MongoStore({
    url : 'mongodb://localhost/technode'
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser())
app.use(session({
    secret : 'technode',
    cookie : {
        maxAge : 60 * 1000
    },
    //使用express自带的session组件会有一个问题，即session数据都是存储在内存中的，服务器重启，这些数据就消失了，会导致需要用户重新登录。
    // 所以我们使用MongoStore把session数据存储到MongoDB中，将session数据固化下来：
    store : sessionStore
}));


//配置静态文件路径
app.use(express.static(__dirname + '/static'));

//配置默认访问页面
app.use(function (req, res) {
    res.sendfile('./static/index.html')
})

//导入socket.io模块 并开启http服务监听3000端口
var io = require('socket.io').listen(app.listen(port));
//设置-授权，链接数据，接受
io.set('authorization', function(handshakeData, accept) {
    signedCookieParser(handshakeData, {}, function(err) {
        if (err) {
            accept(err, false)
        } else {
            sessionStore.get(handshakeData.signedCookies['connect.sid'], function(err, session) {
                if (err) {
                    accept(err.message, false)
                } else {
                    handshakeData.session = session
                    if (session._userId) {
                        accept(null, true)
                    } else {
                        accept('No login')
                    }
                }
            })
        }
    })
})

//验证帐号ID 使用express中的session管理用户的认证
app.get('/api/validate',function(req,res){
    _userId = req.session._userId;
    if(_userId){
        Controllers.User.findUserById(_userId,function(err,user){
            if(err){
                res.json(401,{msg:err})
            }else{
                res.json(user);
            }
        })
    }else{
        res.json(401,null);
    }
});

//登陆配置
app.post('/api/login',function(req,res){
    email = req.body.email;
    if(email){
        Controllers.User.findUserEmailOrCreate(email,function(err,user){
            if(err){
                res.json(500,{msg:err});
            }else{
                req.session._userId = user._id;
                res.json(user);
            }
        })
    }else{
        res.json(403);
    }
});

//退出登录
app.get('/api/logout',function(req,res) {
    req.session._userId = null;
    res.json(401)
});

var SYSTEM = {
    name: 'technode机器人',
    avatarUrl: 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Robot_icon.svg/220px-Robot_icon.svg.png'
}

//创建消息组
var msg = [];
//创建自己的socket方法
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