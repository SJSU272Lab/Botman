var app = angular.module('home', ['ngRoute']);
app.config(function($routeProvider) {
	console.log("in route provider");
	$routeProvider
	
	.when("/home", {
		templateUrl : "templates/home.html",
		controller : "homecontroller"
	})
	.when("/python", {
		templateUrl : "templates/python.html",
		controller : "pythoncontroller"
	})
		
});
app.controller('homecontroller',function($scope,$http){
	console.log("inside home controller");
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
app.controller('pythoncontroller',function($scope,$http){
	console.log("inside python controller");
	

});