$(document).ready(function() {
	$basec = $('#basecamp');
	$('#basecamp').hover(function() {
		$("div.first-heading h1").text("Basecamp is the product you wished you had on your last project.");
		$("div.first-heading h2").text('Are you still managing projects with e-mail');
		var img = '<img ' + 'class="arrow-basecamp "' + 'src="images/arrow-left.png "' + 'width="69 "' + 'height="50 "' + '/>';
		$basec.append(img);
		
		}, function() {
		$("div.first-heading h1").text('Making collaboration productive and enjoyable for people every day.');
		$("div.first-heading h2").text("Frustration-free web-based apps for collaboration, sharing information and making decisions.");	
		$(".arrow-basecamp").remove();
	});
	$highrise = $('#highrise');
	$('#highrise').hover(function() {
		$("div.first-heading h1").text("Highrise is the product you wished you had on your last project.");
		$("div.first-heading h2").text('Keep a permanent record of people you do business with. Know who you talked to, when you talked to them.');
		var img = '<img ' + 'class="arrow-basecamp "' + 'src="images/arrow-left.png "' + 'width="69 "' + 'height="50 "' + '/>';
		$highrise.append(img);
		
		}, function() {
		$("div.first-heading h1").text("Making collaboration productive and enjoyable for people every day.");
		$("div.first-heading h2").text("Frustration-free web-based apps for collaboration, sharing information and making decisions.");	
		$(".arrow-basecamp").remove();
	});	
	$campfire = $('#campfire');
	$('#campfire').hover(function() {
		$("div.first-heading h1").text("Campfire is the product you wished you had on your last project.");
		$("div.first-heading h2").text('Are you still managing projects with e-mail');
		var img = '<img ' + 'class="arrow-campfire"' + 'src="images/arrow-left.png "' + 'width="69 "' + 'height="50 "' + '/>';
		$campfire.append(img);
		
		}, function() {
		$("div.first-heading h1").text("Making collaboration productive and enjoyable for people every day.");
		$("div.first-heading h2").text("Frustration-free web-based apps for collaboration, sharing information and making decisions.");	
		$(".arrow-campfire").remove();
	});			
})