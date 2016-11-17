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

	child_process.exec('test.bat', function(error, stdout, stderr) {
		console.log('Deploying to the cloud');
		console.log(stdout);
	});

};