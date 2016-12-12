/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var home = require('./routes/home');
var cmd = require('node-cmd');
var app = express();
var index = require('./routes/index');

var session = require('express-session');

var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var GITHUB_CLIENT_ID = "c5265ca4b8cf14b6f38f";
var GITHUB_CLIENT_SECRET = "54d3afa60f952850381fe03fd38c8bdf1b0e5daf";

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new GitHubStrategy({
	clientID : GITHUB_CLIENT_ID,
	clientSecret : GITHUB_CLIENT_SECRET,
	callbackURL : "http://52.53.160.225/auth/github/callback"
}, function(accessToken, refreshToken, profile, done) {
	// asynchronous verification, for effect...
	process.nextTick(function() {

		// To keep the example simple, the user's GitHub profile is returned to
		// represent the logged-in user. In a typical application, you would
		// want
		// to associate the GitHub account with a user record in your database,
		// and return that user instead.
		return done(null, profile);
	});
}));

// all environments
app.set('port', process.env.PORT || 443);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(session({
	secret : 'keyboard cat',
	resave : false,
	saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', index.loadindex);
app.get('/home', ensureAuthenticated, home.loadhome);

app.get('/auth/github', passport.authenticate('github', {
	scope : [ 'user:email' ]
}), function(req, res) {
	// The request will be redirected to GitHub for authentication, so this
	// function will not be called.

});

app.get('/auth/github/callback', passport.authenticate('github', {
	failureRedirect : '/'
}), function(req, res) {
	res.redirect('/home');
});

app.post('/logout', home.logout);
app.post('/nodeBot/2', home.nodeBot);
app.post('/createHerokuDirectory', home.createHerokuDirectory);
app.post('/makeHerokuDirectoryMaster', home.makeHerokuDirectoryMaster);
app.post('/viewHerokuDirectory', home.viewHerokuDirectory);
app.post('/deleteHerokuDirectory', home.deleteHerokuDirectory);


http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

cmd.get('ls', function(data) {
	console.log("inside");
	console.log('I am at: \n', data);
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		console.log(req.user.username);
		req.session.username = req.user.username;
		return next();
	} else {
		console.log("not authenticated");
		res.redirect('/');
	}

}
