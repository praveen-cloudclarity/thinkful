var quizApp = (function($) {
	var questionIndex = 0, correctAnswer="", categoryName="", numberOfQuestions = 0;;
	var answered = {question:"", status:0};
	var scored = 0;

	
	var movie_questions = {"questions":
		[{"question":"Which two actors directed themselves in movies and won Oscars for Best Actor?", 
			"options":["Al Pacino and Timothy Hutton","Jack Nicholson and Kevin Spacey","Laurence Oliver and Roberto Benigini", 'Tom Hankd and Paul Newman'], 
			"Answer":"Laurence Oliver and Roberto Benigini"},
		{"question":"After all, tomorrow is another day!\" was the last line in which Oscar-winning Best Picture?", 
		"options":["Gone With the Wind","Great Expectations","Harold and Maude", "The Matrix"], "Answer":"Gone With the Wind"}]
	};

	var capitals_questions = {"questions":
		[{"question":"Capital city of Jamaica?", "options":["Kingston","Nassau","Lisbon", "San Juan"], "Answer":"Nassau"},
		{"question":"Capital city of Estonia?", "options":["Riga","Vilnius","St Petersburg", "Tallinn"], "Answer":"Tallinn"}]
	};

	var history_questions = {"questions":
		[{"question":"12:30pm, November 22nd 1963: At the date and time stated, the first shots rang" + 
		   "out to claim the life of the 35th President of the US. In which city was John F. Kennedy assassinated?",
		 "options":["Baltimore","Las Vegas","Chicago", "Dallas"], "Answer":"Dallas"},
		{"question":"8:15am, August 6th 1945: At the date and time stated, the world entered the nuclear" + 
		"age with the dropping of the first atom bomb. Which city was the target??", 
		"options":["Nagasaki","Sapporo","Tokyo", "Hiroshimo"], "Answer":"Hiroshimo"}]
	};

	var images = [{"name":"movies.png", value:movie_questions}, 
					{"name":"capitals.png", value:capitals_questions},
					{"name":"history.png", value:history_questions}];

	function prepareWelcomePage() {
		questionIndex = 0; correctAnswer=""; categoryName=""; scored = 0;

		answered.status = 0;
		var rowtext = '<div class="row category-row"> </div>' +
						'<div class="row start-row"> <div class="col-md-8">' +
					'<p align="center" style="font-size:30px" class="lead" id="category-title">Please select a category to play</p></div></div>';
		$('.container').append(rowtext);

		images.forEach(function(entry) {

			var rowtext = '<div class="col-md-4"><input type="image" src="' + "images/" + entry.name + '"' + 
							'class="img-rounded" height="200" width="250" type="submit" id="cat-images"></div>';
			$('.category-row').hide();
			$('#category-title').hide();
			$('.category-row').append(rowtext).fadeIn(100);
			$('#category-title').fadeIn(100);
		})
		 $('.category-row').on('click', '#cat-images', function() {
		 	prepareSelections(this);
		 })
		$('#quiztable').bind('click', function(e) {
			answerResponse(e);
		});
	};

	function prepareQuestions(catName) {
		
		for (var item in images) {
			if (catName.localeCompare(images[item].name) == 0) {
				question = images[item].value;
				break;
			}
		}
		var q = question.questions[questionIndex].question;
		var options = question.questions[questionIndex].options;
		correctAnswer = question.questions[questionIndex].Answer;
		categoryName = catName;
		numberOfQuestions = question.questions.length;

		answered.question = q;
		answered.status = 0;
		rowtext = '<div class="row qtable-row"> <div class="col-md-10">' +
				'<table class="table table-bordered table-hover" id="quizTable">' +
		'<thead> <tr class="table-heading">	<th id="col1"><p class="lead">' + q + '</p></th></tr>  </thead><tbody>';	
	
		for (item in options) {
			rowtext += '<tr class="table-row" style="cursor:pointer" id="row1"><th id="options"><p class="lead">' + options[item] + '</p></th></tr>';
		}

		rowtext += '</tbody> </table> </div> </div>';
		$('.container').append(rowtext);
		$('.qtable-row').hide();
		$('.qtable-row').show('slow');
		
		$('#quizTable').on('click', '.table-row', function() {
			answerResponse(this);
		});
	};
	
	function prepareSelections(rowelem) {
		var name = $(rowelem).attr('src');
		var selected;
		$('.category-row').children().each(function() {
			var left = $(this).position().left;
			var windowWidth = $(window).width();
			console.log("position left=" + left + "Window width=" + windowWidth);
			var moveX = (windowWidth/4 - left); 
			var imageName = $(this).find('#cat-images').attr('src');
			if (imageName.localeCompare(name) != 0) {
				$(this).fadeTo("fast", 0.5);
				$(this).animate({top:1200 + 'px'}, 'slow');
			}
			else {
				selected = $(this); 
				$(this).animate({left:moveX + 'px'}, 'slow');
			}
		})
		$(selected).fadeOut();
		setTimeout(function() {
			$('.category-row').remove();
			$('#category-title').remove();
			$('.start-row').remove();
			name = name.replace('images/', '');
			prepareQuestions(name);
			var rowtext = '<div class="row score-pct"> <div class="col-md-10">' +
							'<p style="font-size:50px;color:#699b00" opacity:"0.3" id="score">0%</p></div></div>';
			$('.container').append(rowtext);
		}, 1000);
		

	};
	function playAgain() {
		
		var rowtext = '<div class="row buttons"><div class="col-md-10">' +
						'<button class="btn btn-primary btn-block submit-btn" id="play-btn" type="submit">Play Again</button></div></div>';
		$('.container').append(rowtext);

		$('#play-btn').bind('click', function(e) {
			$('.qtable-row').remove();
			$('.score-pct').remove();
			$('.buttons').remove();
			prepareWelcomePage();
		});
	};
	function updateScore() {
		scored++;
		var pct = (scored * 100.0) / numberOfQuestions;
		$('#score').text(pct + "%");
	};
	function answerResponse(rowelem) {
		selectedText = $(rowelem).find('p:first').text();
		
		if (answered.status) {
			console.log("Question already answered");
			return;
		}
		answered.status = 1;
		
		if (selectedText.localeCompare(correctAnswer) == 0) {
			$(rowelem).css('background-color', "#138900");
			updateScore();
		}
		else {
			$(rowelem).css('background-color', "#bf3030");
		}
		
		if (++questionIndex >= question.questions.length) {
			playAgain();
		}
		else {
			setTimeout(function() {
				$('.qtable-row').remove();
				prepareQuestions(categoryName);
			}, 1000);
		}
	}
	function initModule() {
		 prepareWelcomePage();
	};

	return {initModule : initModule};
}(jQuery));

jQuery(document).ready(function() {
	quizApp.initModule();
})
