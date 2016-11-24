var ejs = require("ejs");
var fs = require('fs');
var child_process = require('child_process');
var cmd = require('node-cmd');

// Redirects to the homepage
exports.loadhome = function(req, res) {
	// Checks before redirecting whether the session is valid

	if (req.session.username) {
		// Set these headers to notify the browser not to maintain any cache for
		// the page being loaded
		res
				.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("home", {
			username : req.session.username
		});
	} else {
		res.redirect('/');
	}
};

exports.logout = function(req, res) {
	console.log("in destroy session function");
	req.logout();
	req.session.destroy();
	res.redirect('/');
};

exports.nodeBot = function(req, res) {
	console.log("inside nodeBot");
	console.log(req.url);

	var modules = req.param("modules");
	console.log("Required Modules:");
	// console.log(modules);

	fs.writeFile("app/package.json", modules, function(err) {
		if (err) {
			return console.log(err);
		}
		console.log("The package.json was saved!");
	});

	var code = req.param("code");
	console.log("Editor:");
	// console.log(code);

	fs.writeFile("app/app.js", code, function(err) {
		if (err) {
			return console.log(err);
		}
		console.log("The app.js was saved!");
	});

	child_process.exec('createYourBot.bat', function(error, stdout, stderr) {
		console.log('Deploying to the cloud');
		console.log(stdout);
	});

};

exports.createHerokuDirectory = function(req, res) {
	console.log("INSIDE createHerokuDirectory");
	var json_responses = {};
	
	child_process.exec('createHerokuDirectory.bat', function(error, stdout, stderr) {
		console.log("CREATING A HEROKU DIRECTORY");
		console.log(stdout);
		json_responses = {
				"statusCode" : 200,
				"directory" : stdout
		};
		console.log(json_responses);
		res.send(json_responses);
	});
};

exports.viewHerokuDirectory = function(req, res) {
	console.log("INSIDE viewHerokuDirectory");
	var json_responses = {};
	
	child_process.exec('viewHerokuDirectory.bat', function(error, stdout, stderr) {
		console.log("LISTING ALL HEROKU DIRECTORIES");
		console.log(stdout);
		json_responses = {
				"statusCode" : 200,
				"directory" : stdout
		};
		console.log(json_responses);
		res.send(json_responses);
	});
};

exports.makeHerokuDirectoryMaster = function(req, res) {

	var json_responses = {};
	
	console.log("INSIDE makeHerokuDirectoryMaster");

	var directoryName = req.param("directoryName");
	
	var makeBatchCommand = "cd app\n";
		makeBatchCommand += "heroku git:remote -a " + directoryName;
	
	console.log(makeBatchCommand);
	
	fs.writeFile("makeHerokuDirectoryMaster.bat", makeBatchCommand, function(err) {
		if (err) {
			return console.log(err);
		}
		console.log("The makeHerokuDirectoryMaster.bat was generated!");
	});
	
	
	child_process.exec('makeHerokuDirectoryMaster.bat', function(error, stdout, stderr) {
		console.log("ASSIGNING INPUTED HEROKU DIRECTORY AS MASTER");
		console.log(stdout);
		json_responses = {
				"statusCode" : 200,
				"directory" : stdout
		};
		console.log(json_responses);
		res.send(json_responses);
	});
};

exports.deleteHerokuDirectory = function(req, res) {

	var json_responses = {};
	
	console.log("INSIDE deleteHerokuDirectory");

	var directoryName = req.param("directoryName");
	
	var makeBatchCommand = "heroku apps:destroy --app " + directoryName + " --confirm " + directoryName;
	
	console.log(makeBatchCommand);
	
	fs.writeFile("deleteHerokuDirectory.bat", makeBatchCommand, function(err) {
		if (err) {
			return console.log(err);
		}
		console.log("The deleteHerokuDirectory.bat was generated!");
	});
	
	
	child_process.exec('deleteHerokuDirectory.bat', function(error, stdout, stderr) {
		console.log("DELETING YOUR SELECTED HEROKU APP");
		console.log(stdout);
		json_responses = {
				"statusCode" : 200,
				"directory" : stdout
		};
		console.log(json_responses);
		res.send(json_responses);
	});
};