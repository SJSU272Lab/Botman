var Botkit 			= require('botkit');
var express 		= require('express');
var bodyParser 		= require('body-parser');
var weather 		= require('openweather-apis');


var app 			= express();
var port 			= process.env.PORT || 1732;

weather.setLang('en');
weather.setUnits('metric');
weather.setAPPID('e0e2f438f3c2a9fadb88413cecd1d8ff');


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
	token : 'xoxb-112482091298-xZDd7Q1SJTIyezwfdoRLoiG2'
}).startRTM();

controller.hears('.*',[ 'direct_message', 'direct_mention', 'mention' ],
    function(bot, message) {
		var country;
		var city;
		var temp;
		var temp_min;
		var temp_max;
		var humidity;
		if(message.match[0].toUpperCase().indexOf('WEATHER')>-1) {
			weather.setCity(message.match[0].substr('Weather'.length).trim());
			weather.getAllWeather(function(err, JSONObj){
				console.log((((JSONObj.main.temp*9)/5)+32)+'F : '
				+JSONObj.main.pressure+':'+JSONObj.main.humidity);
				city = 'Weather for city: '+JSONObj.name+', '+JSONObj.sys.country+'\r';
				temp =     ':sunny: Current temperature: '+(((JSONObj.main.temp*9)/5)+32)+'F \r';
				temp_min = ':low_brightness:   Minimum temperature: '+(((JSONObj.main.temp_min*9)/5)+32)+'F :small_red_triangle_down: \r';
				temp_max = ':high_brightness:  Maximum temperature: '+(((JSONObj.main.temp_max*9)/5)+32)+'F :small_red_triangle:\r';
				humidity = ':sweat_drops: Humidity           : '+JSONObj.main.humidity+'%';
				var reply_with_attachments = {
					'username' : 'Sunny',
					'text' : city,
					'attachments' : [ {
								'fallback' : 'To be useful, I need you to invite me in a channel.',
								'text' : (temp+temp_max+temp_min+humidity),
								'color' : '#7CD197'
							} ],
					'mrkdwn': true,
					'icon_url' : 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTvJBPdSX9-5_Zb9lv9zFYqnQWICB4aGn3M9R9koRM-4uoKZYQq'
				};
				bot.reply(message, reply_with_attachments);
			});
	}
});