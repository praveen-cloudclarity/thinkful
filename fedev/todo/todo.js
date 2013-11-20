var toDo = (function($) {
		var rowid = localStorage.getItem('rowid');
		if (! rowid) {
			rowid = 0;
			localStorage.setItem('rowid', rowid);
		}
		var onClickCheckbox = function(event) {
		var row = event.target.parentNode.parentNode;
		key = $(row).attr('id');
		var storedObject = JSON.parse(localStorage[key]);
		storedObject.checked = 1;
		localStorage.removeItem(key);
		localStorage.setItem(key, JSON.stringify(storedObject));		
		$(event.target).removeClass('glyphicon glyphicon-unchecked');
		$(event.target).addClass('glyphicon glyphicon-check');
		
	}
	var onClickUnCheckbox = function(event) {
		$(event.target).removeClass('glyphicon glyphicon-check');
		$(event.target).addClass('glyphicon glyphicon-unchecked');
		var row = event.target.parentNode.parentNode;
		key = $(row).attr('id');
		var storedObject = JSON.parse(localStorage[key]);
		
		localStorage.removeItem(key);
		storedObject.checked = 0;
	
		localStorage.setItem(key, JSON.stringify(storedObject));
	}
	var addHTMLTableRow = function(text, rowidIn, rowtextid, checked) {
			
		if (checked) {
			var rowtext = '<tr id=' + '\"' + rowtextid + '"' + '>' + ' <th id=\"col1\"><span class=\"glyphicon glyphicon-check\"></span></th>' + ' <th id=\"col2-content\"><p>' + text + '</p></th>' + ' <th id=\"col3\"><span class=\"glyphicon glyphicon-trash\" id=\"trash\" ></span></th></tr>';
			$('#toDoTable tr:last').after(rowtext);
		}
		else {
			var rowtext = '<tr id=' + '\"' + rowtextid + '"' + '>' + ' <th id=\"col1\"><span class=\"glyphicon glyphicon-unchecked\"></span></th>' + ' <th id=\"col2-content\"><p>' + text + '</p></th>' + ' <th id=\"col3\"><span class=\"glyphicon glyphicon-trash\" id=\"trash\" ></span></th></tr>';
			$('#toDoTable tr:last').after(rowtext);
		}
		
	}
	var onClickRemove = function(event) {
		var row = event.target.parentNode.parentNode;
		var rowkey = $(row).attr('id');
		localStorage.removeItem(rowkey);
		$(row).remove();
		
	}
	var addLocalStorageEntry = function(textval, rowidin) {
		var key = "todorow" + rowidin;
		localStorage.setItem(key, JSON.stringify(textval));
	}
	var onClickAdd = function(event, text) {
		var row = event.target.parentNode.parentNode;
		var rowtextid = "todorow" + rowid;
		var textval = {text:"", checked:0};
		textval.text = text;
		textval.checked = 0;	
		addHTMLTableRow(text, rowid, rowtextid);
		addLocalStorageEntry(textval, rowid);
		rowid++;
		localStorage['rowid'] = rowid;
		
	}
	var loadData = function() {
		for (var i = 0; i < localStorage.length; i++) {
			var rowname = localStorage.key(i);
			if (rowname != "rowid") {
				var textval = JSON.parse(localStorage.getItem(rowname)); 	
				addHTMLTableRow(textval.text, rowname, rowname, textval.checked);
			}
		}
	}
	var initModule = function() {
		loadData();
		$('#toDoTable').on('click', 'span.glyphicon-unchecked', function() {
			onClickCheckbox(event);
		})
		$('#toDoTable').on('click', 'span.glyphicon-check', function() {
			onClickUnCheckbox(event);
		})
		$('#toDoTable').on('click', 'span.glyphicon-trash', function() {
			onClickRemove(event);
		})
		$('#todoText').bind('keypress', function(event) {
			var code = event.keyCode || event.which;
			if (code == 13) {
				event.preventDefault();
				var text = $('#todoText').val();
				if (text) {
					onClickAdd(event, text);
					$('#todoText').val("");
				}
			}
		})
	};
	return {initModule : initModule};
}(jQuery));


jQuery(document).ready(function() {
	toDo.initModule();
})