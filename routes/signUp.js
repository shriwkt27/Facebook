var ejs = require("ejs");
var mysql = require('./mysql');

function signUp(req, res) {

	ejs.renderFile('./views/signUp.ejs', function(err, result) {
		if (!err) {
			res.end(result);

		} else {
			res.end('An error occurred');
			console.log(err);
		}
	});
};

function register(req, res) {

	var inputFirstname = req.param("inputFirstname");
	var inputLastname = req.param("inputLastname");
	var inputUsername = req.param("inputEmail");
	var inputPassword = req.param("inputPassword");
	var getUser = "INSERT INTO test.users (firstName,lastName,emailId,password)"
			+ "VALUES " + "(" + "'" + req.param("inputFirstname") + "'" + ","
			+ "'" + req.param("inputEmail") + "'" + "," + "'"
			+ req.param("inputPassword") + "'" + "," + "'"
			+ req.param("inputLastname") + "'" + ");";

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
			res.end(err);

		}

		else {

			ejs.renderFile('./views/signUpComplete.ejs', function(err, result) {
				if (!err) {
					res.end(result);

				} else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
	}, getUser);
};