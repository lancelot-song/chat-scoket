/**
 * Created by new on 2015/4/29.
 */
var nodeApp = angular.module('techNodeApp', ['ng-route']);

//创建socket服务
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


