	var base_url = 'http://172.16.10.22/~ssipolya/Angular%20Js/programs/curdByShivangi/';
	var app = angular.module('RoutingApp', ['ngRoute',]);
	app.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'templates/login.html',
				controller : 'loginpageController'
			})
			.when('/login', {
				templateUrl: 'templates/login.html',
				controller : 'loginpageController'
			})
			.otherwise({
				redirectTo: '/'
			});
			
  
	});
	
app.controller("loginpageController",function($scope,$http,, $cookieStore, authorization, api){
	  if(localStorageService.isSupported) {
        var storageType = localStorageService.getStorageType(); //e.g localStorage
        //alert(storageType)
    }

	$scope.username="admin";
	$scope.password="admin";
	$scope.url = 'doLogin.php';
	$scope.submitloginForm= function()
	{
		var responseData = $http.post($scope.url,{ 'username': $scope.username,'password':$scope.password });
		
		responseData.success(function(data, status, headers, config) {
		
			 var token = data;
			  api.init(token);

          $cookieStore.put('token', token);
          $location.path('/');
		  
			if(data=='tokenExpired') {
				alert('Token Expired');
			} 
			else if(data!= 'error')
				{
					
					location.href = 'mindex.html';
				}
			else {
				alert('Supplied Credentials are invalid.');
			}

		});
		responseData.error(function(data, status, headers, config) {
			alert('error');
		});
		 authorization.submitloginForm(credentials).success(success).error(error);
	};
});
