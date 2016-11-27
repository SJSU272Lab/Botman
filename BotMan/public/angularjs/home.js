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
			url : '/nodeBot/2',
			data : {
				"modules" : $scope.modules,
				"code" : $scope.code
			}
		}).success(function(data) {
			console.log("success");
		});
	};
});


app.controller("stepsController", function($scope, $http) {
	
	console.log("INSIDE stepsController");
	$scope.directory_info = true;
	$scope.status_message = true;
	$scope.view_directories = true;
	$scope.delete_message = true;
	$scope.createHerokuDirectory = function(req, res) {

		$http({
			method : 'post',
			url : '/createHerokuDirectory'
		}).success(function(data) {
			console.log("SUCCESSFULLY CREATE A HEROKU DIRECTORY");
			$scope.results = data;
			$scope.directory_info = false;
			$scope.directory_name_new = data.directory.substring(data.directory.lastIndexOf("/")+1,data.directory.lastIndexOf("."));
			console.log(data.directory.substring(data.directory.lastIndexOf("/")+1,data.directory.lastIndexOf(".")));
		});
	};
	
	$scope.viewHerokuDirectory = function(req, res) {

		$http({
			method : 'post',
			url : '/viewHerokuDirectory'
		}).success(function(data) {
			console.log("SUCCESSFULLY LISTED ALL HEROKU DIRECTORY ASSOCIATED WITH A PARTICULAR EMAIL");
			$scope.results_directories = data;
			$scope.view_directories = false;
			$scope.directory_list = (data.directory.substring(data.directory.lastIndexOf("Apps")+5).trim()).replace(/[^a-zA-Z0-9-]/g, "..........");
			console.log((data.directory.substring(data.directory.lastIndexOf("Apps")+5).trim()).replace(/[^a-zA-Z0-9-]/g, '<br/>'));
		});
	};
});

app.controller("masterDirectory", function ($scope, $http) {
	console.log("INSIDE masterDirectory controller");
	
	$scope.makeHerokuDirectoryMaster = function(req, res) {
		$scope.status_message = true;
		var directoryName = {
				"directoryName" : $scope.directory_name
			};
		console.log(directoryName);
		
		$http({
			method : 'post',
			url : '/makeHerokuDirectoryMaster',
			data : directoryName
		}).success(function(data) {
			console.log("SUCCESSFULLY ASSIGNED ABOVE HEROKU DIRECTORY AS MASTER");
			$scope.results_master = data;
			$scope.status_message = false;
			console.log(data);
		});
	};
	
	$scope.deleteHerokuDirectory = function(req, res) {
		$scope.delete_message = true;
		var directoryName = {
				"directoryName" : $scope.delete_directory_name
			};
		console.log(directoryName);
		
		$http({
			method : 'post',
			url : '/deleteHerokuDirectory',
			data : directoryName
		}).success(function(data) {
			console.log("SUCCESSFULLY ASSIGNED ABOVE HEROKU DIRECTORY AS MASTER");
			$scope.results_deleted_master = data;
			$scope.delete_message = false;
			console.log(data);
		});
	};
	
});