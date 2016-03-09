var fs = require('fs');
var os = require('os');
var sys_type = os.type();

module.exports = {
	getHostFilePath:function(){
		var path_obj = {
			'Windows_NT':'C:/\Windows/\System32/\drivers/\etc/\hosts',
			'Linux':'',
			'Darwin':''		//mac-os
		}
		return path_obj[sys_type] || '';
	},
	getDataFilePath:function(){
		var path_obj = {
			'Windows_NT':'C://Windows//System32//drivers//etc//nw_host',
			'Linux':'',
			'Darwin':''		//mac-os
		}
		return path_obj[sys_type] || '';
	}
}