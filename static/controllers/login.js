/**
 * Created by new on 2015/5/4.
 */
//用户登陆的时候触发
nodeApp.controller('LoginCtrel',function($scope,$http,$location){
    $scope.login = function(){
        $http({
            url : '/api/login',
            method : 'POST',
            data : {
                email : $scope.email
            }
        }).success(function(user){
            $scope.$emit('login',user);
            $location.path('/')
        }).error(function(){
            $location.path('/login');
        })
    }
})