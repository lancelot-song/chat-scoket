/**
 * Created by new on 2015/4/29.
 */
var nodeApp = angular.module('techNodeApp', ['ngRoute']);

//注入启动模块，ajax查询用户信息，跳转相应的URL
nodeApp.run(function($window,$rootScope,$http,$location){
    $http({
        url : '/api/vlidate',
        method : 'GET'
    }).success(function(user){
        $rootScope.me = user;
        $location.path('/');
    }).error(function(){
        $location.path('/login');
    })
    $rootScope.logout = function(){
        $http({
            url: '/ajax/logout',
            method : 'get'
        }).success(function(user){
            $rootScope.me = null;
            $location.path('/login')
        })
    }
    $rootScope.$on('login',function(evt,me){
        $rootScope.me = me;
    })
});

//创建本地socket服务
nodeApp.factory('socket',function($rootScope){
    //在这里把nodejs的socket.io拿来
    var socket = io();
    return{
        //更新数据
        on : function(eventName,callback){
            //传入eventName调用app.js中定义好的socket.on(eventName)相应事件
            socket.on(eventName,function(){
                var args = arguments;
                //$rootScope检查数据状态 如果有变化就更新index.html的绑定
                $rootScope.$apply(function(){
                    callback.apply(socket,args);
                });
            })
        },
        //发送数据
        emit : function(eventName,data,callback){
            socket.emit(eventName,data,function(){
                var args = arguments;
                $rootScope.$apply(function(){
                    if(callback){
                        callback.apply(socket,args);
                    }
                })
            })
        }
    }
})


