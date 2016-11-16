var ejs=require("ejs");

exports.loadindex=function(req,res){
	ejs.renderFile('./views/index.ejs', function(err, result) {
		
		if (!err) {
			res.end(result);
			console.log("Index rendered successfully");
		}
		
		else {
			res.end('An error occurred while rendering Index page');
			console.log(err);
		}
	});
	
};