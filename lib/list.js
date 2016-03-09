var fs = require('fs');
var host_sys = require('./host.js');

module.exports = {
	bindEvent:function(window){
		var document = window.document;
		var ele = document.getElementById('J_list');
		//双击选中该组host配置
		ele.addEventListener('dblclick',function(e){
			//select or cancel choose this group
			var target_cls = e.target.className || '';
			if( target_cls.match('active') ){
				//cancel it
				e.target.className = target_cls.replace('active',' ');
			}
			else if( target_cls.match('current') ){
				//dbclick on the first li:current host,read only
				return ;
			}
			else{
				//select it
				e.target.className += ' active';
			}
		});

		/** [click-event:show host on the right] */
		ele.addEventListener('click',function(e){
			//show the host-content of this group
			if(e.target && e.target.nodeName.toUpperCase() === 'LI'){
				/*
					避免双击选中的过程中的实际调用两次该函数方法
				 */
				if( e.target.className.match('selected') ){
					return ;
				}
				var file_id = e.target.getAttribute('data-id') || '';
				var file_name = '';
				var file_editable = file_id!=='current' ;
				/*
					current host: read from system host-file
				*/
				if(file_id==='current'){
					file_name = host_sys.getHostFilePath();
				}
				else{
					file_name = ['./data/', file_id, '.host'].join('') ;
				}
				/*
					read host-file from pc
				 */
				fs.readFile(file_name ,'utf-8' ,function(err,data){
					if(!err){
						var hosts = [];
						var i = 0,templates = [];
						if(!err){
							hosts = data===''?[]:data.split('\n');
							for(i;i<hosts.length;i++){
								if(hosts[i].charAt(0)==='#'){
									templates.push('<p class="note" contenteditable='+file_editable+'>'+hosts[i]+'</p>');
								}
								else{
									templates.push('<p contenteditable='+file_editable+'>'+hosts[i]+'</p>');
								}
							}
							console.log(hosts.length,file_id);
							if( hosts.length===0 && file_id==='current'){
								templates.push('<p class="note">#no records</p>')
							}
							/*左侧条目样式变化*/
							var cur_li = document.querySelector('#J_list li.selected');
							if(cur_li){
								cur_li.className = cur_li.className.replace('selected','');
							}
							e.target.className += ' selected';
							/*字符串插入*/
							document.getElementById('J_hosts').innerHTML = templates.join('');
						}
					}
					else{
						//file-read exception
						console.log(err);
						debugger;
					}
				});
			}
		});
	}
}