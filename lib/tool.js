var fs = require('fs');
var host_sys = require('./host.js');
var path_datafile = host_sys.getDataFilePath();

module.exports = {
	bindEvent:function(window){
		var document = window.document;
		document.getElementById('J_tool_add').addEventListener('click',function(){
			console.log(new Date());
			fs.writeFile(path_datafile+'\delete.txt','1234567890',{mode:0666,encoding:'utf-8'},function(err){
			    console.log(err);
			});
		});
	}
};