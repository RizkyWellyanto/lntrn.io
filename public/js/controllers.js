var lntrnioControllers = angular.module("lntrnioControllers", []);

lntrnioControllers.controller("loginController", ['$scope', 'Popeye', function($scope, Popeye) {
	$scope.load_login_modal = function() {
		console.log("loading Modal");
		var modal = Popeye.openModal({
      		templateUrl: "./partials/login_modal.html",
      		controller: "loginModalController"
      	});
    }
}]);

lntrnioControllers.controller("loginModalController", ["$scope", function($scope) {
	$scope.isLogin = true;
	$scope.email = "";
	$scope.password = "";
	$scope.password_retype = "";
	$scope.login_selected = "ls_lightened";
	$scope.signup_selected = "ls_darkened";

	$scope.setLogin = function(val) {
		$scope.isLogin = val;
		if (!val) {
			$scope.login_selected = "ls_darkened";
			$scope.signup_selected = "ls_lightened";
		}
		else {
			$scope.login_selected = "ls_lightened";
			$scope.signup_selected = "ls_darkened";
		}
	};
}]);

lntrnioControllers.controller("createLanternController", ["$scope", function($scope) {
    console.log("createLanternController");
}]);

lntrnioControllers.controller("viewLanternController", ["$scope", function($scope) {
    console.log("viewLanternController");
}]);
