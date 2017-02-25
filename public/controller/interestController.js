var app = angular.module('myApp',[]);
app.controller('AppCtrl',function($scope, $http){
	console.log(" I am in interests controller");
	
	
	$scope.musicShow = true;
	$scope.tvShowsShow = false;
	$scope.sportsShow = false;
	$scope.addInterestsShow = false;
	$scope.showAddedMusic = false;
	$scope.showAddedShows = false;
	$scope.showAddedSports = false;
	
	$http.get('/interestsload').success(function(firstName){
		$scope.user = firstName;
		console.log($scope.user +"is equal to  ");
		$http.get('/displaymusic').success(function(response){
			$scope.displaymusic = response;
			console.log($scope.displaymusic);
		});
	});
	
	$scope.music = function(){
		$scope.tvShowsShow = false;
		$scope.musicShow = true;
		$scope.sportsShow = false;
		$scope.addInterestsShow = false;
		$scope.showAddedMusic = false;
		$scope.showAddedShows = false;
		$scope.showAddedSports = false;
		$http.get('/displaymusic').success(function(response){
			$scope.displaymusic = response;
			console.log($scope.displaymusic);
		});
	};
	
	$scope.tvShows = function(){
		$scope.tvShowsShow = true;
		$scope.musicShow = false;
		$scope.sportsShow = false;
		$scope.addInterestsShow = false;
		$scope.showAddedMusic = false;
		$scope.showAddedShows = false;
		$scope.showAddedSports = false;
		$http.get('/displaytvshow').success(function(response){
			$scope.displayshow = response;
			console.log($scope.displayshow);
		});
	};
	
	$scope.sports = function(){
		$scope.tvShowsShow = false;
		$scope.musicShow = false;
		$scope.sportsShow = true;
		$scope.addInterestsShow = false;
		$scope.showAddedMusic = false;
		$scope.showAddedShows = false;
		$scope.showAddedSports = false;
		$http.get('/displaysport').success(function(response){
			$scope.displaysport = response;
			console.log($scope.displaysport);
		});
	};
	
	$scope.addInterests = function(){
		$scope.tvShowsShow = false;
		$scope.musicShow = false;
		$scope.sportsShow = false;
		$scope.showAddedMusic = false;
		$scope.showAddedShows = false;
		$scope.showAddedSports = false;
		$scope.addInterestsShow = true;
	};
	
	$scope.addMusic = function(){
		console.log($scope.myMusic);
		$http.post('/addmusic',{favmusic : $scope.myMusic}).success(function(response){
			console.log(response);
		});
		$scope.showAddedMusic = true;
		$scope.showAddedShows = false;
		$scope.showAddedSports = false;
	};
	
	$scope.addShows = function(){
		console.log($scope.myShows);
		$http.post('/addshows',{favshow : $scope.myShows}).success(function(response){
			console.log(response);
		});
		$scope.showAddedMusic = false;
		$scope.showAddedShows = true;
		$scope.showAddedSports = false;
	};
	
	$scope.addSports = function(){
		console.log($scope.mySports);
		$http.post('/addsports',{favsport : $scope.mySports}).success(function(response){
			console.log(response);
		});
		$scope.showAddedMusic = false;
		$scope.showAddedShows = false;
		$scope.showAddedSports = true;
	};
});