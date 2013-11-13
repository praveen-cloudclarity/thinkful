//Provide background color animation capability based on how close the guessed number is
//Module scope variables
var hotOrCold = (function($) {
	var configMap={ randomVal:98,
					inputVal:30, prevDiff:100, coolValue1:"#a9e4f7", coolValue2:"#0fb4e7",
					hotValue1:"#ffaf4b", hotValue2:"#ff920a"},
				    getRandomNumber, onClickAnimate, initModule; 

	
	getRandomNumber = function(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}
	//Event handler onClickAnimate
	onClickAnimate = function() {
		console.log("randomVal=" + configMap.randomVal + "inputVal=" + configMap.inputVal);
		var diff = Math.abs(configMap.randomVal - configMap.inputVal);
		
		var opacityCalc = 1.0 - (diff/100.0); 
		console.log("opacity " + opacityCalc);
		$("#horc").css({opacity:opacityCalc});
		if (! diff)
			alert("You guessed it right!");
		else if (diff < 10 && diff < configMap.prevDiff) {
			alert("You are getting close");
		}
	};
	onClickReveal = function() {
		alert("My number is " + configMap.randomVal);
	}
	onClickReset = function() {
		configMap.randomVal = getRandomNumber(1, 100);
		$('#number').val("");
		$("#horc").css({opacity:0.1});
	}
	
	//Initialization, set initial states and HTML functionality
	initModule = function() {
		configMap.randomVal = getRandomNumber(1, 100);
		$('#submit').click(function() {
			configMap.inputVal = parseInt($('#number').val());
			onClickAnimate();
			return false;
		});
		$('#reveal').click(function() {
			onClickReveal();
			return false;
		});
		$('#reset').click(function() {
			onClickReset();
			return false;
		});
	};
	return {initModule : initModule};
}(jQuery ));


jQuery(document).ready(function() {
	$("#horc").css({opacity:0.1});
	hotOrCold.initModule();
});