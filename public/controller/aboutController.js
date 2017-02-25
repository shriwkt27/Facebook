var app = angular.module('myApp', []);
app.controller('AppCtrl', function($scope, $http) {
	console.log("Hi i am in about Controller");
	$scope.overviewShow = true;
	$scope.workAndEducationShow = false;
	$scope.contactInfoShow = false;
	$scope.lifeEventsShow = false;
	
	$scope.overview = function(){
		$scope.overviewShow = true;
		$scope.workAndEducationShow = false;
		$scope.contactInfoShow = false;
		$scope.lifeEventsShow = false;
	};
	
	$scope.workAndEducation = function(){
		$scope.overviewShow = false;
		$scope.workAndEducationShow = true;
		$scope.contactInfoShow = false;
		$scope.lifeEventsShow = false;
	};
	
	$scope.contactInfo = function(){
		$scope.overviewShow = false;
		$scope.workAndEducationShow = false;
		$scope.contactInfoShow = true;
		$scope.lifeEventsShow = false;
	}; 
	
	$scope.lifeEvents = function(){
		$scope.lifeEventsShow = true;
		$scope.overviewShow = false;
		$scope.workAndEducationShow = false;
		$scope.contactInfoShow = false;
		
		$http.get('/showlifeevents').success(function(response){
			$scope.allEvents = response;
		});
	};
	
	function refresh(){
		$http.get('/showlifeevents').success(function(response){
			$scope.allEvents = response;
		});
	}
		
	$scope.addLifeEvent = function(){
		console.log($scope.lifeEvent + " Occured on " + $scope.eventdate);
		$http.post('/addlifeevent',{event : $scope.lifeEvent, date : $scope.eventdate}).success(function(response){
			console.log(response);
		});
		refresh();
		$scope.lifeEvent="";
		$scope.eventdate ="";
	};
		
});




function addLifeEvent(req,res){
	if(req.session.emailId){
		var event = req.body.event;
		var date = req.body.date;
		var emailId = req.session.emailId;
		console.log(event + "Occurred on " + date);
		var addevent = "insert into lifeevents(emailId, lifeEvent, Date) values(" + "'" + emailId +
		"'" + "," + "'" + event + "'" + "," + "'" + date + "'" + ");";
		mysql.fetchData(function(err,result){
			if(err){
				res.send(err);
			}
			else{
				console.log(result);
				res.send(result);
			}
		},addevent);
	}
	else{
		ejs.renderFile('./views/home.ejs',function(err,result){
			if(!err){
				res.end(result);
			}
			else{
				res.end("An error occured in");
				console.log(err);
			}
		});
	}
}


