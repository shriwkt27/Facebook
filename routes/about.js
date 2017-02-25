/**
 * New node file
 */
var mysql = require("./mysql");
var ejs = require("ejs");

function about(req,res){
	if(req.session.emailId){
	var emailId = req.session.emailId; 
	var overview = "select * from overview where emailId =" +
	"'" + emailId + "'" + ";";
	mysql.fetchData(function(err,result){
		if(err){
			res.end(err);
		}
		else{
			ejs.renderFile("./views/about.ejs",{"emailId":result[0].emailId,
				"company": result[0].company,
				"college": result[0].college,
				"city": result[0].city,
				"country": result[0].country,
				"dob": result[0].dob,
				"mobile": result[0].mobile},
					function(err,result){
				if(!err){
					res.end(result);
				}
				else{
					res.end("An error occured");
					console.log(err);
				}
			});
		}
	},overview);
	
	}
	else{
		res.redirect('/');
	}
}


function showLifeEvents(req,res){
	if(req.session.emailId){
	console.log("I will fetch Life events");
	var emailId = req.session.emailId;
	var allLifeEvents = "select * from lifeevents where emailId =" + "'" + emailId + "'" + ";"; 
	mysql.fetchData(function(err,result){
		if(err){
			res.send(err);
		}
		else{
			console.log(result);
			res.send(result);
		}
	},allLifeEvents);
	}
	else{
		res.redirect('/');
	}
}


function addLifeEvent(req,res){
	if(req.session.emailId){
		var event = req.body.event;
		var date = req.body.date;
		date = date.slice(0, 10);
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
		res.redirect('/');
	}
}


exports.addLifeEvent = addLifeEvent;
exports.showLifeEvents = showLifeEvents;
exports.about = about;
