var Botkit 			= require('botkit');
var express 		= require('express');
var bodyParser 		= require('body-parser');
var cmd 			= require('node-cmd');
var child_process 	= require('child_process');
var fs 				= require('fs');

var app 			= express();
var port 			= process.env.PORT || 3002;


//body parser middleware
app.use(bodyParser.urlencoded({
	extended : true
}));

// Test the app
app.get('/', function(req, res) {
	res.status(200).send('We welcome you on port number: ' + port);
});

app.listen(port, function() {
	console.log('Listening on port ' + port);
});

var controller = Botkit.slackbot({
	debug : false
});

controller.spawn({
	token : 'xoxb-101818355318-J8T9tGmYqCpbkYUSI2Pwg4ar'
}).startRTM();

controller
		.hears(
				'.*',
				[ 'direct_message', 'direct_mention', 'mention' ],
				function(bot, message) {
					console.log(message.match[0]);
					var reply = '';
					if (message.match[0] === 'hello') {
						reply = 'Hello to you too man';
					} else if (message.match[0].search('mama') > -1) {
						reply = 'Did u mention me?';
					} else if (message.match[0].search('bye') > -1) {
						reply = 'ok hmm :smiley: !';
					}
					if (reply !== '') {
						var reply_with_attachments = {
							'username' : 'COKE STUDIO',

							'attachments' : [ {
								'fallback' : 'To be useful, I need you to invite me in a channel.',
								'text' : reply,
								'color' : '#7CD197'
							} ],
							'icon_url' : 'http://lorempixel.com/400/200/'
						};
						bot.reply(message, reply_with_attachments);
						reply = '';
					}
				});