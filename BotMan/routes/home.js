var ejs=require("ejs");

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
	var code=req.param("code");
	console.log(modules);
	console.log(code);
	
}