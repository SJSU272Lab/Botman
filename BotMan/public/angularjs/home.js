var app = angular.module('home', [ 'ngRoute' ]);

app.config(function($routeProvider) {
	console.log("IN ROUTE PROVIDER");
	$routeProvider

	.when("/home", {
		templateUrl : "templates/home.html"
	})
	
	.when("/steps", {
		templateUrl : "templates/steps.html",
		controller : "stepsController"
	})
	
	.when("/upload", {
		templateUrl : "templates/upload.html",
		controller : "homecontroller"
	});

});

app.controller('homecontroller', function($scope, $http) {
	console.log("INSIDE HOME CONTROLLER");
	$scope.upload = function(req, res) {
		console.log($scope.modules);
		console.log($scope.code);
		$http({
			method : 'post',
			url : '/nodeBot',
			data : {
				"modules" : $scope.modules,
				"code" : $scope.code
			}
		}).success(function(data) {
			console.log("success");
		});
	};
});


app.controller('stepsController', function($scope, $http) {
	
	console.log("INSIDE stepsController");
	
	$scope.createHerokuDirectory = function(req, res) {

		$http({
			method : 'post',
			url : '/createHerokuDirectory'
		}).success(function(data) {
			console.log("SUCCESSFULLY CREATE A HEROKU DIRECTORY");
		});
	};
});