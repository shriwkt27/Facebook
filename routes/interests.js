var mysql = require("./mysql");
var ejs = require("ejs");

function showInterests(req,res){
	if(req.session.emailId){
		var firstName = req.session.firstName;
		console.log(firstName);
		res.render('interests');
	}
	else{
		res.redirect('/');
	}
}

function loadData(req,res){
	if(req.session.emailId){
		var firstName = req.session.firstName;
		console.log("i am sending first Name " + firstName);
		res.send(firstName);
	}
	else{
		res.redirect('/');
	}
}


function addMusic(req,res){
	if(req.session.emailId){
		var music = req.body.favmusic;
		var emailId = req.session.emailId;
		console.log(music);
		var favMusic = "insert into favmusic(emailId, music) values" + "(" + "'" + emailId + "'" + "," + "'" + music + "'" + ")" + ";";
		mysql.fetchData(function(err,result){
			if(!err){
				console.log(result);
				res.send(result);
			}
			else{
				res.send("An error occured");
				console.log(err);
			}
		},favMusic);
	}
	else{
		res.redirect('/');
	}
}

function addShows(req,res){
	if(req.session.emailId){
		var shows = req.body.favshow;
		var emailId = req.session.emailId;
		console.log(shows);
		var favShow = "insert into favshow(emailId, shows) values(" + "'" + emailId + "'" + "," + "'" + shows + "'" + ");";
		mysql.fetchData(function(err,result){
			if(!err){
				console.log(result);
				res.send(result);
			}
			else{
				res.send("An error occured");
				console.log(err);
			}
		},favShow);
	}
	else{
		res.redirect('/');
	}
}

function addSport(req,res){
	if(req.session.emailId){
		var sport = req.body.favsport;
		var emailId = req.session.emailId;
		console.log(sport);
		var favSport = "insert into favsport(emailId, sport) values(" + "'" + emailId + "'" + "," + "'" + sport + "'" + ");";
		mysql.fetchData(function(err,result){
			if(!err){
				console.log(result);
				res.send(result);
			}
			else{
				res.send("An error occured");
				console.log(err);
			}
		},favSport);
	}
	else{
		res.redirect('/');
	}
}

function displayMusic(req,res){
	if(req.session.emailId){
		var emailId = req.session.emailId;
		var fetchMusic = "select * from favmusic where emailId =" + "'" + emailId + "'" + ";";
		mysql.fetchData(function(err,result){
			if(!err){
				console.log(result);
				res.send(result);
			}
			else{
				res.send("An error occured");
				console.log(err);
			}
		},fetchMusic);
	}
	else{
		res.redirect('/');
	}
}


function displayShow(req,res){
	if(req.session.emailId){
		var emailId = req.session.emailId;
		var fetchShow = "select * from favshow where emailId =" + "'" + emailId + "'" + ";";
		mysql.fetchData(function(err,result){
			if(!err){
				console.log(result);
				res.send(result);
			}
			else{
				res.send("An error occured");
				console.log(err);
			}
		},fetchShow);
	}
	else{
		res.redirect('/');
	}
	
}

function displaySport(req,res){
	if(req.session.emailId){
		var emailId = req.session.emailId;
		var fetchSport = "select * from favsport where emailId =" + "'" + emailId + "'" + ";";
		mysql.fetchData(function(err,result){
			if(!err){
				console.log(result);
				res.send(result);
			}
			else{
				res.send("An error occured");
				console.log(err);
			}
		},fetchSport);
	}
	else{
		res.redirect('/');
	}
}

exports.displaySport = displaySport;
exports.displayShow = displayShow;
exports.displayMusic = displayMusic;
exports.addSport = addSport;
exports.addShows = addShows;
exports.addMusic = addMusic;
exports.loadData = loadData;
exports.showInterests = showInterests;