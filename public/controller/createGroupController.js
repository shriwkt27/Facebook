var app = angular.module('myApp', []);
app.controller('AppCtrl', function($scope, $http) {
	
	$scope.addmemberpanel = false;
	var groupId;
	$scope.createGroup =function(){
		$scope.addmemberpanel = true;  // Show add member to group panel
		console.log($scope.groupName);
		$http.post('/createnewgroup',{groupName : $scope.groupName}).success(function(response){
			groupId = response.insertId;
			console.log(groupId);
		});
	};
	
	$scope.addmember = function(){
		console.log("From addmember groupId " + groupId + "emailId is " + $scope.emailId);
		$http.post('/addmember',{groupId : groupId, emailId : $scope.emailId}).success(function(response){
			console.log(response);
		});
	};
	
	/*
	 function refresh(){
	 $http.get('/contactlist').success(function(response){
		 console.log("i got the data i requested");
		 $scope.contactList = response;
		 $scope.contact = " ";
	 });
	 }
	refresh();
	 
	 $scope.addContact=function(){
		console.log($scope.contact);
		$http.post('/contactlist',$scope.contact);
		refresh();
	 };

	 $scope.remove=function(contactId){
		 console.log(contactId);
		 $http.get('/contactlist/delete', {contactId : contactId});
	 };
	 */
});