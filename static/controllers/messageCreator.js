//监听消息输入区域
nodeApp.controller('MessageCreatorCtrl', function($scope, socket) {
    $scope.createMessages = function () {
        socket.emit('mgs.create', $scope.newMessage)
        $scope.newMessage = ''
    }
})
