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
	when('/viewLantern', {
		templateUrl: 'partials/viewLantern.html',
		controller: "viewLanternController"
	}).
	otherwise({
		redirectTo: '/login'
	});
}]);
