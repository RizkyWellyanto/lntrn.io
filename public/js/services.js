var lntrnioServices = angular.module('lntrnioServices', []);

lntrnioServices.factory("User", function($http) {
	return {
		login : function(email, password) {
			return $http.post("./api/login",
				{
					"email": email,
					"password": password	
				});
		},
		signup : function(email, password, retype) {
			return $http.post("./api/register",
				{
					"email": email,
					"password": password,
					"password2": retype
				});
		}
	}
});

lntrnioServices.factory("Posts", function($http) {
	return {
		get : function() {
			return $http.get("./api/posts");
		}
	}
});