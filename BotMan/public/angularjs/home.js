var app = angular.module('home', ['ngRoute']);

app.config(function($routeProvider) {
	console.log("IN ROUTE PROVIDER");
	$routeProvider
	
	.when("/home", {
		templateUrl : "templates/home.html"
		
		
	})
	.when("/upload", {
		templateUrl : "templates/upload.html",
		controller : "homecontroller"
		
	});
		
});

app.controller('homecontroller',function($scope,$http){
	console.log("INSIDE HOME CONTROLLER");
	$scope.upload=function(req,res){
		console.log($scope.modules);
		console.log($scope.code);
		$http({
			method:'post',
			url:'/nodeBot',
			data:{
				"modules":$scope.modules,
				"code":$scope.code
			}
		}).success(function(data){
			console.log("success");
		});
	};
});
