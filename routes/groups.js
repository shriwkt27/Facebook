var mysql = require("./mysql");
var ejs = require("ejs");

function createGroupPage(req,res){
	res.render('createGroup');
	
}

function createNewGroup(req,res){
	if(req.session.emailId){
		console.log("I will create new group");
		var groupName = req.body.groupName;
		var emailId = req.session.emailId;
		var newGroup = "insert into groups(groupname) values(" + "'" + groupName + "'" + ");";
		mysql.fetchData(function(err,result){
			if(err){
				res.send(err);
			}
			else{
				console.log(result);
				var groupId = result.insertId;
				var addYourself = "insert into grpmid(groupId,emailId) values(" + "'" + groupId + "'" + "," + "'" + emailId + "'" + ");";
				mysql.fetchData(function(error,result1){
					if(error){
						res.send(error);
					}
					else{
						res.send(result);
					}
				},addYourself);
			}
		},newGroup);
	}
	else{
		res.redirect('/');         
	}
}

function addMember(req,res){
	console.log("i will add a member to group");
	var groupId = req.body.groupId;
	var emailId = req.body.emailId;
	console.log("Id of group to be inserted into " +groupId + " mail " + emailId);
	var add = "insert into grpmid(groupId,emailId) values" + 
	"(" + "'" + groupId + "'" + "," + "'" + emailId + "'" + ");"; 
	mysql.fetchData(function(err,result){
		if(err){
			res.send(err);
		}
		else{
			console.log(result);
			res.send(result);
		}
	},add);
}

function removeMember(req,res){
		if(req.session.emailId){
		var groupId = req.body.groupId;
		var emailId = req.body.emailId;
		console.log("I will remove a"+ emailId+ "from group " + groupId);
		var deleteMember = "delete from grpmid where groupId =" + "'" + groupId +
		"'" + "and emailId =" + "'" + emailId + "'" + ";";
		mysql.fetchData(function(err,result){
			if(err){
				res.send(err);
			}
			else{
				console.log(result);
				res.send(result);
			}
		},deleteMember);
		
	}
		else{
			res.redirect('/');
		}
}

function deleteGroup(req,res){
	if(req.session.emailId){
		var groupId = req.body.groupId;
		console.log("I will delete group " + groupId);
		var delGroup = "delete from groups where groupId =" + "'" + groupId + "'" + ";";
		var delGroupMembers = "delete from grpmid where groupId =" + "'" + groupId + "'" + ";";
		mysql.fetchData(function(err,result){
			if(err){
				res.send(err);
			}
			else{
				mysql.fetchData(function(error,result1){
					if(err){
						res.send(error);
					}
					else{
						res.send(result1);
					}
				},delGroup);
			}
		},delGroupMembers);
	}
	else{
		res.redirect('/');       
	}
}

exports.deleteGroup = deleteGroup;
exports.removeMember = removeMember;
exports.addMember = addMember;
exports.createNewGroup = createNewGroup;
exports.createGroupPage = createGroupPage;