var app = angular.module('myApp',[]);
app.controller('AppCtrl',function($scope, $http){
	
	$scope.showFriends = true;
	$scope.friendRespond = false;
	$scope.potentialFriends = false;
	
	$scope.findFriends = function(){
		console.log("I will find friends");
		$http.get('/findfriends').success(function(response){
			console.log(response);
			$scope.allPeople = response;
		});
		$scope.potentialFriends = true;
		$scope.showFriends = false;
		$scope.friendRespond = false;
	};
	
	
	$scope.addFriend = function(personEmailId){
		 //var elem = document.getElementById("addButton");
		   // if (elem.value=="add Friend") elem.value = "Friend Request Sent";
		 console.log("Add Friend Id " + personEmailId);
		 $http.post('/friendrequest',{personEmailId : personEmailId}).success(function(response){
			 console.log(response);
		 });   
	};
	
	
	$scope.showFriendRequests = function(){
		$http.get('/showrequests').success(function(response){
			$scope.allRequests = response;
		});
		
		$scope.friendRespond = true;
		$scope.showFriends = false;
		$scope.potentialFriends = false;
	};
	
	
	$scope.confirm = function(requesterEmailId){
		console.log(" I will confirm a friend");
		console.log("email Id of requester is " + requesterEmailId);
		$http.post('/confirm',{requesterEmailId : requesterEmailId}).success(function(response){
			console.log(response);
		});
	};
	
	
	$scope.deleteRequest = function(requesterEmailId){
		console.log("I will delete a friend Request");
		$http.post('/deletefriendrequest',{requesterEmailId : requesterEmailId}).success(function(response){
			
		});
	};
	
});