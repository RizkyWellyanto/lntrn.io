var lntrnioControllers = angular.module("lntrnioControllers", []);
var SVG_lantern = '\
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style="visibility: visible; position: absolute; width:62px; height:68px;">\
        <defs>\
            <filter id="brightness">\
            <feComponentTransfer>\
                <feFuncR type="linear" slope="0.3"/>\
                <feFuncG type="linear" slope="0.3"/>\
                <feFuncB type="linear" slope="0.3"/>\
            </feComponentTransfer>\
            </filter>\
            <radialGradient id="lanternGrad" cx="33.4551" cy="63.1367" r="59.6359" gradientUnits="userSpaceOnUse">\
                <stop offset="0"            style="stop-color:#FCFFDD"/>\
                <stop offset="0.1218"       style="stop-color:#FFFEB8"/>\
                <stop class="lanternMid"    offset="0.2386" style="stop-color:#FCF954"/>\
                <stop class="flicker"       offset="0.5838" style="stop-color:#FF510F"/>\
                <stop class="flicker"       offset="0.9036" style="stop-color:#501004"/>\
                <stop class="flicker"       offset="0.9492" style="stop-color:#3D0A06"/>\
                <stop class="lanternTop"    offset="1"      style="stop-color:#501004"/>\
            </radialGradient>\
            <filter id="darken">\
                <feComponentTransfer>\
                <feFuncR type="linear" slope="0.5"/>\
                <feFuncG type="linear" slope="0.5"/>\
                <feFuncB type="linear" slope="0.5"/>\
                </feComponentTransfer>\
            </filter>\
        </defs>\
        <path id="lantern" fill="url(#lanternGrad)" d="M47.7,61.6c0,2.6-6.3,5.6-14.7,5.6s-14.7-2.9-14.7-5.6c0-2.6,6.3-5.6,14.7-5.6S47.7,58.9,47.7,61.6z\
        M26.4,0C19.2,0-1.5,15.1,0.1,21.4C1.6,27.7,15.4,62,15.4,62s0.1,0.1,0.2,0.3c-0.1-0.3-0.1-0.5-0.1-0.8c0-4.7,7.5-8.3,17.4-8.3\
        c9.9,0,17.4,3.6,17.4,8.3c0,0.1,0,0.2,0,0.2c2-3.6,10.9-33.1,11.9-42.7C63.3,9.3,34.2,0,26.4,0z"/>\
    </svg>';

lntrnioControllers.controller("loginController", ['$scope', 'Popeye', function($scope, Popeye) {
	$scope.load_login_modal = function() {
		console.log("loading Modal");
		var modal = Popeye.openModal({
			templateUrl: "./partials/login_modal.html",
			controller: "loginModalController",
			modalClass: "demo-modal small"
		});
	}
}]);

lntrnioControllers.controller("loginModalController", ["$scope", "User", "AuthServices", function($scope, User, AuthServices) {
	$scope.isLogin = true;
	$scope.email = "";
	$scope.password = "";
	$scope.password_retype = "";
	$scope.login_selected = "ls_lightened";
	$scope.signup_selected = "ls_darkened";
	$scope.email_error_msg = "";
	$scope.pw_error_msg = "";
	$scope.error_msg = "";

	$scope.setLogin = function(val) {
		$scope.isLogin = val;
		$scope.email = "";
		$scope.password = "";
		$scope.password_retype = "";
		$scope.error_msg = "";
		if (!val) {
			$scope.login_selected = "ls_darkened";
			$scope.signup_selected = "ls_lightened";
		}
		else {
			$scope.login_selected = "ls_lightened";
			$scope.signup_selected = "ls_darkened";
		}
	};

	$scope.doLogin = function() {
		if ($scope.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/) == null) {
			$scope.error_msg = "Invalid email";
			return;
		}
		User.login($scope.email, $scope.password).success(function(res) {
			console.log("login result", res);
			$scope.error_msg = "";
			AuthServices.setUserId(res.data._id);
		}).error(function(res) {
			$scope.error_msg = res.message || "Couldn't validate user";
		});
	};

	$scope.doSignup = function() {
		if ($scope.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/) == null) {
			$scope.error_msg = "Invalid email";
			return;
		}
		if ($scope.password != $scope.password_retype) {
			$scope.error_msg = "Passwords don't match";
			return;
		}
		User.signup($scope.email, $scope.password, $scope.password_retype)
			.success(function(res) {
				console.log("signup result", res);
				$scope.error_msg = "";
			}).error(function(res) {
			$scope.error_msg = res.message;
		});
	}
}]);

lntrnioControllers.controller("mainController", ["$scope", "Posts", "User", "AuthServices", function($scope, Posts, User, AuthServices) {
	// TODO:
	// automatic GET request with updated parameters of list of lantern IDs to exclude
	// update request everytime a user reads a lantern to store it in their history (jsut append)

	$scope.desired = 5; // desired number of posts. may differ from 'recvd' number of posts
	$scope.history = []; // array of posts read so far. needs at least one element so it doesn't blow up.
	$scope.request = {read: $scope.history, qty: $scope.desired};

	// lantern create
	$scope.lantern = function(post) {
		var xpos = parseInt(Math.random() * ($(window).width() - 124) + 62);
		var ypos = parseInt(Math.random() * ($(window).height() - 136) + 68);

		// create the lantern div
		var lant = document.createElement("a");
		lant.innerHTML = SVG_lantern;
		lant.style.position = "absolute";
		lant.style.left = xpos + 'px';
		lant.style.top = ypos + 'px';
		lant.classList.add("box");
		lant.setAttribute("ng-click", "$(this).attr(filter, url(#darken)); " + "history.push(" + post._id + ")");


		// TweenMax flicker effect
		TweenMax.staggerTo('.flicker', 2.8, {
			stopColor:'#BF3A0B',
			repeat:-1,
			ease:RoughEase.ease.config({ template: Power0.easeNone, strength: 3, points: 10, taper: "none", randomize: true, clamp: false}),
			yoyo:true
		},0.1);
		TweenMax.to('.lanternTop', 0.6, {
			stopColor:'#000',
			repeat:-1,
			ease:RoughEase.ease.config({ template: Power0.easeNone, strength: 3, points: 10, taper: "none", randomize: true, clamp: false}),
			yoyo:true
		});
		TweenMax.to('.lanternMid', 0.6, {
			stopColor:'#FD9E2E',
			repeat:-1,
			ease:RoughEase.ease.config({ template: Power0.easeNone, strength: 3, points: 10, taper: "none", randomize: true, clamp: false}),
			yoyo:true
		});

		// append it
		$("#mainPage").append(lant);

		// lantern click -> dim and post display (change to view partial)
		lant.addEventListener("click", function(t) {
			// visual indication of being clicked
			$(this).find("#lantern").attr("filter", "url(#darken)");

			// send user to other URL
			// $(this).attr("href", "./api/post/" + post._id);

			// add to local history, PUT update user's history array
			if ($scope.history.indexOf(post._id) === -1) {
				$scope.history.push(post._id);

				console.log(AuthServices.getUserId());
				// User.update( ,$scope.history);

				// check if all lanterns have been clicked yet. if so, return more lanterns
				if ($scope.history.length === $scope.recvd) {
					console.log("ayy");

				}
			}
		});
	};

	// function that gets lanterns with a request object (string array of IDs, quantity desired)
	$scope.acquire = function (request) {
		Posts.get(request).success(function (res) {
			$scope.posts = res.data;
			$scope.recvd = $scope.posts.length;
			for (var i = 0; i < $scope.recvd; i++) {
				$scope.lantern($scope.posts[i]);
			}
		}).error(function (err) {
			console.log(err);
		});
	};



	// always call on first page load to populate with lanterns
	$scope.acquire($scope.request);

	// $scope.$watchCollection('history', function(newVal, oldVal) {
	// 	console.log("what");
	// 	console.log(newVal);
	// }, true);



}]);


lntrnioControllers.controller("createLanternController", ["$scope", function($scope) {
	console.log("createLanternController");
}]);

lntrnioControllers.controller("viewLanternController", ["$scope", function($scope) {
	console.log("viewLanternController");
}]);
