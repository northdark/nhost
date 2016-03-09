function focusContentEnd(node){
	node.focus();
	var s = window.getSelection(),
	r = document.createRange();
	r.setStart(node, node.childNodes.length);
	r.setEnd(node, node.childNodes.length);
	s.removeAllRanges();
	s.addRange(r);
}


module.exports = {
	bindEvent:function(window){
		var document = window.document;
		var ele = document.getElementById("J_hosts");
		document.getElementById("J_hosts").addEventListener("keydown",function(e) {
			if(e.target && e.target.nodeName.toUpperCase() == "P") {
				/*
					监听回车换行
					本行文字需要折断
				 */
				if(e.keyCode === 13){
					var cursorPos = window.getSelection().extentOffset;
					var head_word = e.target.innerText.slice(0,cursorPos);
					var tail_word = e.target.innerText.substring(cursorPos);
					var p_node = document.createElement("p");
					p_node.setAttribute("contenteditable",true);
					p_node.innerText = tail_word;
				 	ele.insertBefore(p_node,e.target.nextSibling);
					e.preventDefault();
					e.target.innerText = head_word;
					p_node.focus();
				}
				/*
					监听橡皮键删除本行
					如果还有上一行的话，光标应该上移至其行尾
				 */
				if(e.keyCode === 8){
					if( e.target.innerText === '' ){						
						var _previousSibling = e.target.previousSibling;
						if( e.target.previousSibling ){
							e.target.parentNode.removeChild(e.target);
							// _previousSibling.focus();
							// var s = window.getSelection(),
							// r = document.createRange();
							// r.setStart(_previousSibling, _previousSibling.childNodes.length);
							// r.setEnd(_previousSibling, _previousSibling.childNodes.length);
							// s.removeAllRanges();
							// s.addRange(r);
							focusContentEnd(_previousSibling);
						}						
					}
				}
			}
		});
	}
};