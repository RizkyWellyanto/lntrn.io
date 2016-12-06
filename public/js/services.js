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
		},
		logout : function() {
			return $http.get("./api/logout");
		},
        getUser : function(id) {
            return $http.get("./api/user/" + id);
        },
        update : function(updatedUser) {
            console.log(updatedUser);
            return $http.put("./api/user/" + updatedUser._id, {history: updatedUser.history});
        }
	}
});

lntrnioServices.factory("Posts", function($http) {
	return {
		get : function(parameters) {
			return $http.get("./api/posts", {params: parameters});
		},
        addPost: function(text){
        var postData = {
            "text": text
        };
            return $http({
                method: 'POST',
                url: "./api/posts",
                data: $.param(postData),
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }
	}
});

lntrnioServices.factory("AuthServices", function($http) {
	var userId = null;

	return  {
		getUserId : function() {
			return userId;
		},
		setUserId : function(value) {
			userId = value;
		},
		checkServerLogin : function() {
			$http.get("./api/user/").success(function(res) {
				userId = res.data._id;
				return userId;
			});
		}
	}
});
