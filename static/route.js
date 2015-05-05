/**
 * Created by new on 2015/4/30.
 */
nodeApp.config(function($routeProvider,$locationProvider){
    //采用HTML5的pushStatel来实现路由
    $locationProvider.html5Mode(true);
    //配置路由路径
    $routeProvider.
        when('/', {
            templateUrl: '/pages/room.html',
            controller: 'RoomCtrl'
        }).
        when('/login', {
            templateUrl: '/pages/login.html',
            controller: 'LoginCtrl'
        }).
        otherwise({
            redirectTo: '/login'
        })
})