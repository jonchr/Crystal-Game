
/////////////
// VARIABLES
// ================================================================================

	//Stored image locations of crystals
	var imageLocations = ["./assets/images/1.jpg", "./assets/images/2.png", "./assets/images/3.jpg", "./assets/images/4.png"];

	//Array containing scores for each crystal image
	var crystalScores = [0,0,0,0];

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
		$("#gameRules").text("Rules");
		$("#gameRules").append($("<div>").text("\n\n You will be given a random number at the start of the game."));
		$("#gameRules").append($("<div>").text("\n\n There are four crystals below. By clicking on a crystal you will add a specific amount of points to your total score."));
		$("#gameRules").append($("<p>").text("\n\n You win the game by matching your total score to the random number; you lose the game if your total score goes above the random number."));
		$("#gameRules").append($("<p>").text("\n\n The value of each crystal is hidden form you until you click on it."));
		$("#gameRules").append($("<p>").text("\n\n Each time the game starts, the game will change the values of each crystal."));

		//Goal score is loaded in newGame
		//Record is loaded after a game is finished

		//Creates a crystal for each location in array
		$.each(imageLocations, function(index, element) {
			$("#crystals").append("<img src=" + element + " class=\"crystalImage img-circle\" alt=\"Crystal" + index + "\" data-position=\"" + index + "\"data-points\"=\"3\" text=" + index + "></img>");
		});
		

		var apple = $("<img>");
		apple.attr("src", "./assets/images/2.png");
		apple.attr("class", "crystalImage img-circle");
		apple.attr("alt", "Crystal0");
		apple.attr("data-position", 4);
		apple.attr("data-points", 4);
		$("#crystals").append(apple);
		//$("#crystals").append("<img src=\"./assets/images/2.png\"" + " class=\"crystalImage img-circle\" alt=\"Crystal" + 0 + "\" position=\"" + 1 + "\ndata-score\n=0></img>");

		//Player's score is loaded in newGame
	}
	
	//Assigns actions to the crystalImages when clicked
	$("body").on("click", ".crystalImage", function() {
	//$(".crystalImage").on("click", function() {

		//Adds the crystal value to the player's score
		//playerScore += parseInt($(this).attr("data-points"));
		playerScore += crystalScores[1];

		//If the player's score equals the goal score, they win
		if(playerScore === goalScore) {
			//Adds a win to the record and calls endGame
			winlossrecord[0]++; 
			endGame();

		}
		//If the player's goal score exceeds the goal score, they lose
		else if(playerScore > goalScore) {
			//Adds a loss to the record and calls endGame
			winlossrecord[1]++; 
			endGame();
		}

		//Updates the displayed score
		updateScore(playerScore);

	});

	function newGame() {

		//Resets player's score
		playerScore = 0;
		updateScore(playerScore);

		//Generates a new random goal score between 19 and 120
		goalScore = Math.floor(Math.random() * 102) + 19;
		updateGoal(goalScore);

		//Generates new random crystal scores between 1 and 12
		for (var i = 0; i < crystalScores.length; i++) {
			crystalScores[i] = Math.floor(Math.random() * 12) + 1; 
			$(".crystalImage").filter("[data-position=0]").attr("data-points", Math.floor(Math.random() * 12) + 1);
		}


		alert(crystalScores[1]);
	}

	function endGame() {

		//Updates the win loss record displayed
		updateWinLoss(winlossrecord[0], winlossrecord[1]);

		//Waits a few seconds, then calls a newGame
		setTimeout(function() {
			newGame();
		}, 3000);

	}


	///////////////////////////////////////////////
	// Functions to update HTML text on the page //
	///////////////////////////////////////////////

	function updateWinLoss(wintally, losstally) {

		$("#record").text("Wins: " + wintally + "\n" + "Loss: " + losstally);

	}

	function updateScore(score) {

		$("#score").text("Your current score is \n" + playerScore);
	}

	function updateGoal(goal) {

		$("goal").text("goal");
	}

	////////////////////////////
	// Math/Logical Functions //
	////////////////////////////



//////////////////////
// FUNCTION EXECUTION
// ================================================================================
	
	//Loads items on the page
	loadPage();
	//Creates variables for a new game
	newGame();
	


