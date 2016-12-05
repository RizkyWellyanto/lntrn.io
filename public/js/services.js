var lntrnioServices = angular.module('lntrnioServices', []);

lntrnioServices.factory("User", function($http) {
	return {
		signup : function(email, password, retype) {
			var postData = {
				"email": email,
				"password": password,
				"password2": retype
			};
			return $http({
			    method: 'POST',
			    url: "./api/register",
			    data: $.param(postData),
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
		},
		login : function(email, password) {
			var postData = {
				"email": email,
				"password": password
			};
			return $http({
			    method: 'POST',
			    url: "./api/login",
			    data: $.param(postData),
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
		}
	};
});

lntrnioServices.factory("Posts", function($http) {
	return {
		get : function() {
			return $http.get("./api/posts");
		},
      // post: function(postText, UserId) {
    post: function(postText) {
        return $http({
            // method: 'POST',
            // url: "./api/",
        }); //.post("./api/posts");
    }
	};
});
