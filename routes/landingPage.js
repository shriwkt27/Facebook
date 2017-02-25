var mysql = require("./mysql");
var ejs = require("ejs");

function displayGroup(req,res){
	var groupId = req.body.groupId;
	console.log(groupId);
	var groupmembers = "select userinfo.firstName, grpmid.groupId, grpmid.emailId from userinfo join grpmid on userinfo.emailId = grpmid.emailId where grpmid.groupId=" + 
	groupId + ";"; 
	mysql.fetchData(function(err,result){
		if(err){
			res.send(err);
		}
		else{
			console.log(result);
			res.send(result);
		}
	},groupmembers);
	
}


function postIt(req,res){       //This function adds data to postlog table as well as to newsfeed table to facilitate news feed functionality
	if(req.session.emailId){
		var myPost = req.body.myPost;
		var emailId = req.session.emailId;
		console.log(myPost);
		var postReq = "insert into postlog(emailId, postData) values (" + "'" + emailId + "'" + "," + "'" + myPost + "'" + ");";
		var newsFeedReq = "insert into newsfeed(emailId, news) values(" + "'" + emailId + "'" + "," + "'" + myPost + "'" + ");";
		mysql.fetchData(function(err,result){
			if(err){
				res.send(err);
			}
			else{
				console.log(result);
			}
		},postReq);
		mysql.fetchData(function(err,result){
			if(err){
				res.send(err);
			}
			else{
				console.log(result);
			}
		},newsFeedReq);
	}
	else{
		res.redirect('/');
	}
}

function fetchAllPosts(req,res){
	if(req.session.emailId){
		var emailId = req.session.emailId; 
		var fetchPosts = "SELECT postData FROM myfacebook.postlog where emailId =" + "'" + emailId + "'" + "order by posttime desc;";
		mysql.fetchData(function(err,result){
			if(err){
				res.send(err);
			}
			else{
				console.log(result);
				res.send(result);
			}
		},fetchPosts);
	}
	else{
		res.redirect('/');
	}
	
}


function getNewsFeed(req,res){
	if(req.session.emailId){
		var emailId = req.session.emailId; 
		//var newsFeedReq = "select news from newsfeed where emailId in(select emailId from friendlist where friendsMail =" +
		//"'" + emailId + "'" + "and flag =" + "'" + 2 + "'" + ");";
		var newsFeedReq = "select userinfo.firstName, newsfeed.news from userinfo join newsfeed on userinfo.emailId = newsfeed.emailId where newsfeed.emailId in(select emailId from friendlist where friendsMail =" +
		"'" + emailId + "'" + "and flag =" + "'" + 2 + "'" + ");";
		mysql.fetchData(function(err,result){
			if(err){
				res.send(err);
			}
			else{
				console.log(result);
				res.send(result);
			}
		},newsFeedReq);
		
	}
	else{
		res.redirect('/');
	}
}

exports.getNewsFeed = getNewsFeed;
exports.fetchAllPosts = fetchAllPosts;
exports.postIt = postIt;
exports.displayGroup = displayGroup;