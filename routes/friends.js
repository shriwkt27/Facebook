var mysql = require("./mysql");
var ejs = require("ejs");

var potentialFriends;

function friendList(req,res){
	if(req.session.emailId){
	var emailId = req.session.emailId;
	var fetchFriends = "select userinfo.firstname from userinfo join friendList on userinfo.emailId = friendList.emailId where friendsMail ="
                    + "'" + emailId + "'" + "and flag =" + "'" + 2 + "'" +";";
    mysql.fetchData(function(err,result){
			if(err){
				res.end(err);
			}    	
			else{
				var allFriends = result;
				console.log(allFriends);
				console.log(allFriends[0].firstname);
				console.log(allFriends[1].firstname);
				ejs.renderFile('./views/friends.ejs', {"allFriends" : allFriends} ,function(err,result){
					if(!err){
						res.end(result);
					}
					else{
						res.end("An error occured");
						console.log(err);
					}
				});
			}
    	},fetchFriends);
	} 
	else{
		res.redirect('/');
	}
}

function findFriend(req,res){
	if(req.session.emailId){
		var listOfAll = "select emailId, firstName from userinfo;";
		mysql.fetchData(function(err,result){
			if(err){
				res.end(err);
			}
			else{
				potentialFriends = result;
				console.log(potentialFriends);
				res.send(result);
			}
		},listOfAll);	
	}
	else{
		res.redirect('/');
	}
}

function friendRequest(req,res){			// This function will make a friend requests
	if(req.session.emailId){
		var userEmailId = req.session.emailId;
		console.log("User's mail id is " + userEmailId);
		var personEmailId = req.body.personEmailId;
		console.log(personEmailId);
		var friendReq = "insert into friendlist(emailId,friendsMail,flag) values(" +
		"'" + personEmailId + "'" + "," + "'" + userEmailId + "'" + "," + "'" + 1 + "'" + ");";
		mysql.fetchData(function(err,result){
			if(err){
				res.send(err);
			}
			else{
				res.send(result);
			}
		},friendReq);
	}
	else{
		res.redirect('/');
	}
}

function showFriendRequests(req,res){				//This function will show all friend requests pending
	if(req.session.emailId){
		var userEmailId =req.session.emailId;
		var showReq = "select userinfo.firstName, userinfo.emailId from userinfo join friendlist on userinfo.emailId = friendlist.friendsMail where friendlist.emailId =" +
		 "'" + userEmailId + "'" + "and flag =" + "'" + 1 + "'" + ";";
		mysql.fetchData(function(err,result){
			if(err){
				res.end(err);
			}
			else{
				console.log(result);
				res.send(result);
			}
		},showReq);
	}
	else{
		res.redirect('/');
	}
}


function confirmFriendRequest(req,res){
	if(req.session.emailId){
		var userEmailId = req.session.emailId;
		var requesterEmailId = req.body.requesterEmailId;
		console.log(userEmailId + " will confrim friend req of " + requesterEmailId);
		var confirmFriend1 = "update friendlist set flag = '2' where emailId =" +
		"'" + userEmailId + "'" + "and friendsMail" + "=" + "'" + requesterEmailId + "'" + ";";
		var confirmFriend2 = "insert into friendlist(emailId,friendsMail,flag) values (" +
		"'"+ requesterEmailId + "'" + "," + "'" + userEmailId + "'" + "," + "'" + 2 + "'" + ");";
		
		mysql.fetchData(function(err,result){
			if(err){
				res.send(err);
			}
			else{
				console.log(result);
				//res.send(result);
			}
		},confirmFriend1);
		
		mysql.fetchData(function(err,result){
			if(err){
				res.send(err);
			}
			else{
				console.log(result);
				//res.send(result);
			}
		},confirmFriend2);
	}
	else{
		res.redirect('/');
	}
}

function deleteFriendRequest(req,res){
	if(req.session.emailId){
		var userEmailId = req.session.emailId;
		var requesterEmailId = req.body.requesterEmailId;
		console.log(userEmailId + " will delete friend request of " + requesterEmailId);
		var deleteRequest = "delete from friendlist where emailId =" + "'" + userEmailId +
		"'" + "and friendsMail =" + "'" + requesterEmailId + "'" + "and flag =" + "'" + 1 + "'" + ";";
		mysql.fetchData(function(err,result){
			if(err){
				res.send(err);
			}
			else{
				console.log(result);
				res.send(result);
			}
		},deleteRequest);
	}	
	else{
		res.redirect('/');
	}
}

exports.deleteFriendRequest = deleteFriendRequest;
exports.confirmFriendRequest = confirmFriendRequest;
exports.showFriendRequests = showFriendRequests;
exports.friendRequest = friendRequest;
exports.findFriend = findFriend;
exports.friendList = friendList;