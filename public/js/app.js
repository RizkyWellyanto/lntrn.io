var app = angular.module("lntrnio", ["ngRoute", "lntrnioControllers", "lntrnioServices", "pathgather.popeye"]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.
	when('/login', {
		templateUrl: 'partials/login.html',
		controller: "loginController"
	}).
	when('/main', {
		templateUrl: 'partials/main.html',
		controller: "mainController"
	}).
	when('/createLantern', {
	    templateUrl: 'partials/createLantern.html',
	    controller: "createLanternController"
	}).
	when('/viewLantern/:lanternId', {
		templateUrl: 'partials/viewLantern.html',
		controller: "viewLanternController"
	}).
	when('/previousLanterns', {
		templateUrl: 'partials/previousLanterns.html',
		controller: 'previousLanternsController'
	}).
	otherwise({
		redirectTo: '/login'
	});
}]);
