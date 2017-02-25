/**
 * New node file
 */
var mysql = require("./mysql");
var ejs = require("ejs");

var allGroups;

function home(req,res){
		ejs.renderFile('./views/home.ejs',function(err,result){
		if(!err){
			res.end(result);
		}
		else{
			res.end("An error occured");
			console.log(err);
		}
	});
}

function login(req,res){
	
	var emailId = req.param("emailId");
	var password = req.param("password");
	
	var loginReq = "select emailId, password, firstName from userinfo where emailId = "
		+ "'" + emailId + "'" + ";";
	var groupFetch = "select grpmid.groupId, groups.groupName from (userinfo join grpmid on userinfo.emailId = grpmid.emailId) join groups on grpmid.groupId = groups.groupId where userinfo.emailId =" 
		+ "'" + emailId + "'" + ";";
	
	
	mysql.fetchData(function(err,getresult){
		if(err){
			res.end(err);
		}
		else{
			allGroups = getresult;
			console.log(allGroups);
			console.log(allGroups.length);
			//////////////
			mysql.fetchData(function(err,result){
				if(err){
					res.end(err);
				}
				else{
					console.log(result[0].emailId);
					console.log(result[0].password);
					if(emailId == result[0].emailId && password == result[0].password){
						console.log("login successful");
						var length = allGroups.length;
						console.log("length of groups is " + length);
						req.session.firstName = result[0].firstName;
						req.session.emailId = emailId;// session code.
						var a = [{"firstName" : result[0].firstName
								, "emailId" : result[0].emailId
								,"allGroups" : allGroups
								,"length" : length}];
						ejs.renderFile('./views/landingPage.ejs',
								{"firstName" : result[0].firstName
								, "emailId" : result[0].emailId
								,"allGroups" : allGroups
								,"length" : length }, function(err,result){
							if(!err){
								res.end(result);
							}
							else{
								res.end("An error occured");
								console.log(err);
							}
						});
					}
				
				}
			},loginReq);
			
			//////////////////
		}
	},groupFetch);
	

}

function signUp(req,res){
	ejs.renderFile('./views/signUp.ejs',function(err,result){
		if(!err){
			res.end(result);
		}
		else{
			res.end("An error occured");
			console.log(err);
		}
	});
}	

function register(req,res){
	
	var firstName = req.param("firstName");
	var lastName = req.param("lastName");
	var emailId = req.param("emailId");
	var password = req.param("password");
	var registerUser = "insert into myfacebook.userinfo (firstName, lastName, emailId, password)"
		+ "values("
		+ "'" + firstName + "'" + "," 
		+ "'" + lastName + "'" + ","
		+ "'" + emailId + "'" + ","
		+ "'" + password + "'" + ");";

	
		mysql.fetchData(function(err,result){
			console.log("Are you coming up to here");//Comment to be removed later
			console.log(result); //to see log can be removed later
		if(err){
			res.end(err);
			
		}
		
		else{
			console.log("i am back in fetch data");  //Comment to be removed later
			ejs.renderFile('./views/signUpComplete.ejs',function(err,result){
				if(!err){
					res.end(result);
				}
				else{
					res.end("An error occred");
					console.log(err);
				}
				console.log("render file code has run");//Comment to be removed later
			});
		}
	},registerUser);
}

function signUpComplete(req,res){
	ejs.renderFile('./views/signUpComplete',function(err,result){
		if(!err){
			res.end(result);
		}
		else{
			res.end("An error occured");
			console.log(err);
		}
	});
}

function logout(req,res){
	req.session.destroy();
	res.redirect('/');
}

exports.logout = logout;
exports.home = home;
exports.login = login;
exports.signUp = signUp;
exports.register = register;
exports.signUpComplete = signUpComplete;