var ejs				= require("ejs");
var fs 				= require('fs');
var child_process 	= require('child_process');
var cmd 			= require('node-cmd');

exports.loadhome=function(req,res){
	ejs.renderFile('./views/home.ejs', function(err, result) {
		
		if (!err) {
			res.end(result);
			console.log("Home rendered successfully");
		}
		
		else {
			res.end('An error occurred while rendering home');
			console.log(err);
		}
	});
};

exports.nodeBot=function(req,res){
	console.log("inside nodeBot");
	
	var modules=req.param("modules");
	console.log("Required Modules:");
	//console.log(modules);
	
	fs.writeFile("app/package.json", modules, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The package.json was saved!");
	}); 
	
	var code=req.param("code");
	console.log("Editor:");
	//console.log(code);
	
	fs.writeFile("app/app.js", code, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The app.js was saved!");
	}); 
	
	
	child_process.exec('test.bat', function(error, stdout, stderr) {
		console.log('Deploying to the cloud');
		console.log(stdout);
	});

};