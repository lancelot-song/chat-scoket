//监听消息输入区域
nodeApp.controller('MessageCreatorCtrl', function($scope, socket) {
    $scope.createMessage = function () {
        socket.emit('messages.create', {
            message: $scope.newMessage,
            creator: $scope.me
        })
        $scope.newMessage = ''
    }
})
