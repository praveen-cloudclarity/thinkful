var toDo = (function($) {
	var rowid = 0;	
	var onClickCheckbox = function(event) {
		$(event.target).removeClass('glyphicon glyphicon-unchecked');
		$(event.target).addClass('glyphicon glyphicon-check');
		
	}
	var onClickUnCheckbox = function(event) {
		$(event.target).removeClass('glyphicon glyphicon-check');
		$(event.target).addClass('glyphicon glyphicon-unchecked');
		
	}
	var addHTMLTableRow = function(text, rowidIn, rowtextid) {
			
		var rowtext = '<tr id=' + '\"' + rowtextid + '"' + '>' + ' <th id=\"col1\"><span class=\"glyphicon glyphicon-unchecked\"></span></th>' + ' <th id=\"col2-content\"><p>' + text + '</p></th>' + ' <th id=\"col3\"><span class=\"glyphicon glyphicon-trash\" id=\"trash\" ></span></th></tr>';
		$('#toDoTable tr:last').after(rowtext);
		
	}
	var onClickRemove = function(event) {
		var row = event.target.parentNode.parentNode;
		var rowkey = $(row).attr('id');
		localStorage.removeItem(rowkey);
		$(row).remove();
		
	}
	var addLocalStorageEntry = function(text, rowid) {
		localStorage["todorow" + rowid] = text;
	}
	var onClickAdd = function(event, text) {
		var row = event.target.parentNode.parentNode;
		var rowtextid = "todorow" + rowid;	
		addHTMLTableRow(text, rowid, rowtextid);
		addLocalStorageEntry(text, rowid);
		rowid++;
	}
	var loadData = function() {
		for (var i = 0; i < localStorage.length; i++) {
			var rowname = localStorage.key(i);
			var text = localStorage.getItem(rowname);	
			addHTMLTableRow(text, rowname, rowname);
		}
	}
	var initModule = function() {
		loadData();
		$('#toDoTable').on('click', 'span.glyphicon-unchecked', function() {
			console.log("Checkbox trigger");
			onClickCheckbox(event);
		})
		$('#toDoTable').on('click', 'span.glyphicon-check', function() {
			console.log("Uncheckbox trigger");
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