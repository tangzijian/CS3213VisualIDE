function allowDrop(ev) {
	ev.preventDefault();
}

function dragFromToolbar(ev) {
	ev.dataTransfer.setData("text/html", ev.target.id);
}

function dropIntoWorkspace(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text/html");
	var obj = document.getElementById(data);
	var isInWorkspace = $.contains(ev.target, obj);
	console.log(isInWorkspace);
	var cloneObj = obj.cloneNode(true);
	$(cloneObj).css({'margin-top': '-10px'});
	ev.target.getElementsByClassName('workspace-list')[0].appendChild(cloneObj);
}
