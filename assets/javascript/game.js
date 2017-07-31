
/////////////
// VARIABLES
// ================================================================================

	//Stored image locations of crystals
	var imageLocations = ["./assets/images/1.jpg", "./assets/images/2.png", "./assets/images/3.jpg", "./assets/images/4.png"];

	//The player's current score in the current game
	var playerScore = 0;

	//The goal score for the player in the current game
	var goalScore = 0;

	//The player's win/loss record for current session. Win is index 0; loss index 1
	var winlossrecord = [0,0];

/////////////
// FUNCTIONS
// ================================================================================

	function loadPage() {

		
		//Sets the title of the game to Crystal Collector
		$("#gameTitle").text("Crystal Collector");
		
		//Displays the rules of the game
		//I'm curious if there is a more 'fun' way to add all of these; perhaps storing the text in an array and adding using $.each like the images below
		$("#rules").text("Rules");
		$("#gameRules").append($("<p>").html("You will be given a random goal score at the start of each game. You win the game by matching your total score to the goal score; you lose the game if your total score goes above the goal."));
		$("#gameRules").append($("<p>").html("There are four crystals below. Clicking on a crystal will add a specific amount of points to your total score. The value of each crystal is hidden; furthermore, the value of each crystal changes with each new game."));

		//Goal score is loaded in newGame
		//Record is loaded after a game is finished

		//Creates a crystal for each location in array
		$.each(imageLocations, function(index, element) {
			$("#crystals").append("<img src=" + element + " class=\"crystalImage img-circle\" alt=\"Crystal" + index + "\" data-position=\"" + index + "\" data-points=0></img>");
		});

		//Player's score is loaded in newGame
	}
	
	//Assigns actions to the crystalImages when clicked
	$("body").on("click", ".crystalImage", function() {

		//Adds the crystal value to the player's score
		playerScore += parseInt($(this).attr("data-points"));

		//Updates the displayed score
		updateScore(playerScore);

		//Adds a ten millisecond delay so that the score updates in time before the alert
		setTimeout(function(){

			//If the player's score equals the goal score, they win
			if(playerScore === goalScore) {
				//Adds a win to the record and calls endGame
				winlossrecord[0]++; 
				alert("You won!");
				endGame();

			}
			//If the player's goal score exceeds the goal score, they lose
			else if(playerScore > goalScore) {
				//Adds a loss to the record and calls endGame
				winlossrecord[1]++; 
				alert("You lost");
				endGame();
			}

		},10);

	});

	function newGame() {

		//Resets player's score and updates it on the screen
		updateScore(playerScore = 0);

		//Generates a new random goal score between 19 and 120 and updates it on the screen
		updateGoal(goalScore = Math.floor(Math.random() * 102) + 19);


		//Generates new random crystal scores between 1 and 12
		for (var i = 0; i < 4; i++) {
			$(".crystalImage").filter("[data-position=" + i + "]").attr("data-points", Math.floor(Math.random() * 12) + 1);
		}

	}

	function endGame() {

		//Updates the win loss record displayed
		updateWinLoss(winlossrecord[0], winlossrecord[1]);

		//Waits a few seconds, then calls a newGame
		newGame();
	

	}


	///////////////////////////////////////////////
	// Functions to update HTML text on the page //
	///////////////////////////////////////////////

	function updateWinLoss(wintally, losstally) {

		$("#record").html("<hr>Your record is: <br />Wins: " + wintally + "<br />Loss: " + losstally);

	}

	function updateScore(score) {

		$("#score").html("Your current score is: " + playerScore);
	}

	function updateGoal(goal) {

		$("#goal").html("Your goal is: " + goal + "<hr>");
	}


//////////////////////
// FUNCTION EXECUTION
// ================================================================================
	
	//Loads items on the page
	loadPage();
	//Creates variables for a new game
	newGame();
	


