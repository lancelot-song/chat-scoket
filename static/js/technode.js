/**
 * Created by new on 2015/4/29.
 */
var nodeApp = angular.module('techNodeApp', []);

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

//绑定更新数据控制器
nodeApp.controller('RoomCtrl',function($scope,socket){
    $scope.msg = [];
    socket.on('mgs.read',function(msg){
        $scope.msg = msg;
    })
    socket.on('mgs.add',function(msg){
        $scope.msg.push(msg);
    })
    socket.emit('mgs.read');
})

angular.module('techNodeApp').controller('MessageCreatorCtrl', function($scope, socket) {
    $scope.createMessage = function () {
        socket.emit('mgs.create', $scope.newMessage)
        $scope.newMessage = ''
    }
})

//创建自动滚动至底部的指令 tip：指令中'-'连接的命令需要用大写替代
nodeApp.directive('autoScrollToBottom',function(){
    return {
        link : function(scope,element,attrs){
            scope.$watch(
                function(){
                    return element.children().length;
                },
                function(){
                    element.animate({
                        scrollTop : element.prop('scrollHeight')
                    },1000);
                }
            )

        }
    }
})

//创建发送指令
nodeApp.directive('ctrlEnterBreakLine',function(){
    return function(scope,element,attrs){
        var ctrldown = false;
        element.bind('keydown',function(evt){
            if(evt.which == 17){
                ctrldown = true;
            }
            setTimeout(function(){
                ctrldown = false;
            },1000)
            if(evt.which == 13){
                if(ctrldown == true){
                    element.val(element.val()+'\n')
                }else{
                    scope.$apply(function(){
                        scope.$eval(attrs.ctrlEnterBreakLine);
                    })
                    evt.preventDefault();
                }
            }
        })
    }
})