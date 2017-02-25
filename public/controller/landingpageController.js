var app = angular.module('myApp', []);

app.controller('AppCtrl', function($scope, $http) {
	 console.log("This is from Landing page controller");

	 $scope.postsShow = true;
	 $scope.groupMembersShow = false;
	 $scope.newsFeedShow = false;
	 $scope.postsBoxShow = true; 
	 
	 ///////////////////////////////////
	
	 $http.get('/')
	 
	 //////////////////////////////////
	 
	 $scope.group = function(event){
		 $scope.postsShow = false;
		 $scope.postsBoxShow = false;
		 $scope.groupMembersShow = true;
		 $scope.newsFeedShow = false;
		 var groupId = event.target.id;
		 console.log("id of group is " + groupId);
		 $http.post('/groupmembers',{groupId : groupId}).success(function(response){
			 console.log(response);
			 $scope.members = response;
		 });
	 };
	 
	 $scope.createGroup = function(){
		window.location.assign("/creategroup");
		 
	 };
	 
	 $scope.removeMember = function(groupId,emailId){
		 console.log("I will remove " + emailId + " from " + groupId);
		 $http.post('/removemember',{groupId : groupId, emailId : emailId}).success(function(response){
			 console.log(response);
			 refresh(groupId);
		 });
	 };
	 
	 function refresh(groupId){
		 $http.post('/groupmembers',{groupId : groupId}).success(function(response){
			 console.log(response);
			 $scope.members = response;
		 });
	 }
	 
	 $scope.deleteGroup = function(groupId){
		 console.log("I will delete group" + groupId);
		$http.post('/deletegroup', {groupId : groupId}).success(function(response){
			console.log(response);
		}); 
	 };
	 
	 $scope.post = function(){
		 $scope.postsShow = true;
		 $scope.postsBoxShow = true;
		 $scope.groupMembersShow = false;
		 $scope.newsFeedShow = false;
		 console.log($scope.myPost);
		 $http.post('/post',{myPost : $scope.myPost}).success(function(response){
			 
		 });
		 refreshPosts();
		 //$scope.myPost = "";
	 };
	 
	 $http.get('/fetchallposts').success(function(response){        //This function will fetch all previous posts and show them as page loads
		 $scope.allposts = response;
	 });
		 
	 function refreshPosts(){		// This function will refresh list of posts after a new post.
		 console.log("I will refresh list of posts after a new post");
		 $http.get('/fetchallposts').success(function(response){       
			 $scope.allposts = response;
		 });
	 }
		 
	 $scope.newsFeed = function(){
		 $scope.postsShow = false;
		 $scope.groupMembersShow = false;
		 $scope.newsFeedShow = true;
		 $http.get('/getnewsfeed').success(function(response){
			 $scope.allNewsFeed = response;
			 console.log($scope.allNewsFeed);
		 });
	 };
	
	 
});