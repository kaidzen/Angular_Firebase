'use strict';
angular.module('myApp.home', ['ngRoute', 'firebase'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])
    .controller('HomeCtrl', ['$scope', '$location', '$firebaseAuth', function($scope, $location, $firebaseAuth){

        var firebaseObj = new Firebase("https://blistering-fire-43.firebaseio.com");
        var loginObj = $firebaseAuth(firebaseObj);

        $scope.user = {};
        $scope.SignIn = function(e) {
            e.preventDefault();
            var username = $scope.user.email;
            var password = $scope.user.password;
            loginObj.$authWithPassword({
                    email: username,
                    password: password
                })
                .then(function(user) {
                    //Success callback
                    console.log('Authentication successful');
                }, function(error) {
                    //Failure callback
                    console.log('Authentication failure');
                });
        }

    }]);
