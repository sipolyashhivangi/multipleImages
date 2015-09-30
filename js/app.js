var crudApp = angular.module("crudApp", ['ngRoute','angularUtils.directives.dirPagination','LocalStorageModule']);
crudApp.config(function($routeProvider)
{
	$routeProvider
	.when('/listing',
	{
		templateUrl : 'templates/listing.html',
		controller : 'studentController'
	})
	.when('/add',
	{
		templateUrl : 'templates/form.html',
		controller : 'cntrl'
	})
	.when('/logout',
	{
		templateUrl : 'templates/logout.php',
		controller : 'logoutController'
	})
});

crudApp.controller("cntrl", function($scope, $http,filterFilter)
{
	   
       $scope.stepsModel = [];

    $scope.imageUpload = function(event){
         var files = event.target.files; //FileList object
         console.log(files);
		 $scope.file=[files[0],files[1]];
		 
         for (var i = 0; i < files.length; i++) {
             var file = files[i];
			  
                 var reader = new FileReader();
                 reader.onload = $scope.imageIsLoaded; 
                 var path=reader.readAsDataURL(file);
				  
         }
		
    }

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.stepsModel.push(e.target.result);
			$scope.path1 =e.target.result;
        });
    }
	
 $scope.countryNames = [
        {
            "id": 0,
            "displayName": "India"
        },
        {
            "id": 1,
            "displayName": "U.S.A."
        },
        {
            "id": 2,
            "displayName": "Canada"
        }
    ];
    $scope.selectedCountryNames = $scope.countryNames[0];

    $scope.statesNames = [
        {
            "id": 0,
            "displayName": "MP",
            "parentId": 0
        },
        {
            "id": 1,
            "displayName": "UP",
            "parentId": 0
        },
        {
            "id": 2,
            "displayName": "Delhi/NCR",
            "parentId": 0
        },
        {
            "id": 3,
            "displayName": "USA State 1",
            "parentId": 1
        },
        {
            "id": 4,
            "displayName": "USA State 2",
            "parentId": 1
        },
        {
            "id": 5,
            "displayName": "Canada State 1",
            "parentId": 2
        }
    ];
    $scope.filteredArray = [];
    $scope.$watch("parentId", function (newValue) {
        $scope.filteredArray = filterFilter($scope.statesNames, newValue);
        $scope.selectedStatesNames = $scope.filteredArray[0];
    },true);
    

    $scope.cityNames = [
        {
            "id": 0,
            "displayName": "Gwalior",
            "parentId": 0
        },
        {
            "id": 1,
            "displayName": "Bhopal",
            "parentId": 0
        },
        {
            "id": 2,
            "displayName": "Indore",
            "parentId": 0
        },
        {
            "id": 3,
            "displayName": "USA State 1 City 1",
            "parentId": 3
        },
        {
            "id": 4,
            "displayName": "USA State 1 City 2",
            "parentId": 3
        },
        {
            "id": 5,
            "displayName": "Canada State 1 City 1",
            "parentId": 5
        }
    ];
    $scope.selectedCityNames = $scope.cityNames[0];
	
	$scope.url = 'submit.php';
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

        $scope.formsubmit = function(isValid) {
    
            if (isValid) {
                $http.post($scope.url, {"name": $scope.user.name, 
										"userName":$scope.user.username,
										"password":$scope.user.password,
										"cpassword":$scope.user.cpassword,
										"email": $scope.user.email, 
										"contactno":$scope.user.contactno,
										"country":$scope.selectedCountryNames,
										"state":$scope.selectedStatesNames,
										"city":$scope.selectedCityNames,
										"file":$scope.file,
										"path":$scope.path1,
										"message": $scope.message}).
                        success(function(data, status) {
						
                            console.log(data);
                            $scope.status = status;
                            $scope.data = data;
                            $scope.result = data; 
	
							location.href = 'mindex.html#/listing';
                        });
						
						
            }else{
				alert("Data not inserted");
            }

        }
		
});


	  crudApp.controller('studentController', function($scope, $http, $filter) {
	  var orderBy = $filter('orderBy');
    $http.get("http://172.16.10.22/~ssipolya/Angular Js/programs/curdByShivangi/getListing.php")
    .success(function(response) {$scope.lists = response;});
	$scope.order = function(predicate, reverse) {
      $scope.lists = orderBy($scope.lists, predicate, reverse);
    };
    $scope.order('-name',false);
	
	 $scope.url = 'deleteUser.php';
	$scope.prod_delete = function(index) {  
	
     var x = confirm("Are you sure to delete the selected product");
     if(x){
      $http.post($scope.url,
            {
                'prod_index'     : index
            }
        )      
        .success(function (data, status, headers, config) {               
             $scope.get_product();
             alert("Product has been deleted Successfully");
        })

        .error(function(data, status, headers, config){
           
        });
      }else{

      }
    }
  });
	
crudApp.controller("logoutController",function ($scope,$window, $http,$location, localStorageService) {
		$http.post('templates/logout.php', {'token': $window.sessionStorage.token})
		.success(function(response) {
		console.log(response);
		location.href = 'index.html';
    })
	.error(function(data, status, headers, config){
		alert("Token is expired");;
	});
});
						

