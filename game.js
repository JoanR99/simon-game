const buttons = document.querySelectorAll('.btn');

const buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
	var randomNumber = Math.round(Math.random() * 3);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

	playSound(randomChosenColour);

	level++;
	$('#level-title').text(`Level ${level}`);
}

$('.btn').click(function (e) {
	e.preventDefault();
	var userChosenColour = $(this).attr('id');
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
	var audio = new Audio(`sounds/${name}.mp3`);
	audio.play();
}

function animatePress(currentColour) {
	$(`.${currentColour}`).addClass('pressed');
	setTimeout(() => {
		$(`.${currentColour}`).removeClass('pressed');
	}, 100);
}

function startOver() {
	level = 0;
	gamePattern = [];
	userClickedPattern = [];
}

function wrongAnswer() {
	playSound('wrong');
	$('body').addClass('game-over');
	setTimeout(() => {
		$('body').removeClass('game-over');
	}, 200);
	$('#level-title').text('Game Over, Press Any Key to Restart');
}

$(window).keypress(function () {
	nextSequence();
});

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(nextSequence, 1000);
			userClickedPattern = [];
		}
	} else {
		wrongAnswer();
		startOver();
	}
}
