var app = angular.module("lntrnio", ["ngRoute", "lntrnioControllers", "lntrnioServices", "pathgather.popeye"]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.
	when('/login', {
		templateUrl: 'partials/login.html',
		controller: "loginController"
	}).
	otherwise({
		redirectTo: '/login'
	});
}]);