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