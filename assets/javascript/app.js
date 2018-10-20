$(document).ready(function() {
    //console.log("ready!");

    //Game variables:
    //keep track of quesitons
    var questionCounter = 0;
    //timer starts at 20 seconds for each question
    var time = 15;
    //score for correct guesses
    var correctGuesses = 0;
    //score for incorrect guesses
    var incorrectGuesses = 0;

    //Questions and answers:
    var questions = [
        {
            question: "What causes rainbows?",
            choices: ["Unicorn farts", "Leprechauns/pots of gold", "A misalignment between the ozone later and the atmosphere", "Light passing through raindrops and refracting at different angles"],
            correctAnswer: "Light passing through raindrops and refracting at different angles",
			image: "<img src='assets/images/rainbow-1622730_1920.jpg' class='picture'>"
	
            },
            {
            question: "Why do cats always land on their feet?",
            choices: ["Their insides are made of Jell-O", "They have a unique skeletal structure that allows them to bend and rotate during a fall", "Their paws are balanced so their weight gets redistributed based on gravitational pull", "Their kitty ancestors sold their souls to the devil"],
            correctAnswer: "They have a unique skeletal structure that allows them to bend and rotate during a fall",
            image: "<img src='assets/images/cat-1508613_1920.jpg' class='picture'>"

            },
            {
            question: "What causes leaves to change color in the fall?",
            choices: ["Chlorophyll is pigmented green, and during the fall there is not enough light of water to maintain photosynthesis so the green fades away and other colors emerge", "Witches change the color of the leaves to indicate the beginning of October and the Halloween celebration", "The cold air causes the leaves to slowly freeze", "The trees are sad the kids have to go back to school"],
            correctAnswer: "Chlorophyll is pigmented green, and during the fall there is not enough light of water to maintain photosynthesis so the green fades away and other colors emerge",
            image: "<img src='assets/images/maple-leaves-2895335_1920.jpg' class='picture'>"
            },
            {
            question: "What causes thunder?",
            choices: ["The giant from Jack and the Beanstalk is bowling", "Wind causes the clouds to crash into each other", "Global warming", "A bolt of lightening heating the air to 50,000 degrees F in a fraction of a second, causing shock waves"],
            correctAnswer: "A bolt of lightening heating the air to 50,000 degrees F in a fraction of a second, causing shock waves",
            image: "<img src='assets/images/lightning-1056419_1920.jpg' class='picture'>"
            },
            {
            question: "How does a plane take off?",
            choices: ["Huge gusts of wind (haven't you seen the huge fans at the airport?)", "Fairies", "Magic", "The engine pushes the plane forward, causing air to flow around the wings and lift the plane, increasing as the plane gathers speed. The plane takes off once there is enough lift to overtake gravity"],
            correctAnswer: "The engine pushes the plane forward, causing air to flow around the wings and lift the plane, increasing as the plane gathers speed. The plane takes off once there is enough lift to overtake gravity",
            image: "<img src='assets/images/sunset-clouds-1149792_1920.jpg' class='picture'>"
            }];

            //fill in questions based on the question count
            function questionContent() {
            
            $("#gameScreen").append("<p><strong>" +
                questions[questionCounter].question + "</p><p class= 'choices'>" +
                questions[questionCounter].choices[0] + "</p><p class='choices'>" + 
    		    questions[questionCounter].choices[1] + "</p><p class='choices'>" + 
    		    questions[questionCounter].choices[2] + "</p><p class='choices'>" + 
    		    questions[questionCounter].choices[3] + "</strong></p>");
            
            }
            // user guessed correctl
            function userWin() {
                $("#gameScreen").html("<p>You're correct!</p>");
                correctGuesses++;
                var correctAnswer = questions[questionCounter].correctAnswer;
                $("#gameScreen").append("<p>The answer is <span class='answer'>" + correctAnswer + "</span></p>" + 
                questions[questionCounter].image);
                setTimeout(nextQuestion, 4000);
                questionCounter++;
            }

            // user guessed incorrectly
	        function userLoss() {
		        $("#gameScreen").html("<p>Incorrect!</p>");
		        incorrectGuesses++;
		        var correctAnswer = questions[questionCounter].correctAnswer;
		        $("#gameScreen").append("<p>The correct answer is <span class='answer'>" + correctAnswer + "</span></p>" + 
			    questions[questionCounter].image);
		        setTimeout(nextQuestion, 4000);
		        questionCounter++;
	        }

            // user ran out of time
	        function userTimeout() {
		        if (time === 0) {
			    $("#gameScreen").html("<p>You ran out of time!</p>");
			    incorrectGuesses++;
			    var correctAnswer = questions[questionCounter].correctAnswer;
			    $("#gameScreen").append("<p>The answer was <span class='answer'>" + correctAnswer + "</span></p>" + 
				questions[questionCounter].image);
			    setTimeout(nextQuestion, 4000);
			    questionCounter++;
		        }   
            }

    // screen that shows final score and message
	function resultsScreen() {
		if (correctGuesses === questions.length) {
			var endMessage = "You must be a scientist!";
			var bottomText = "Wow!";
		}
		else if (correctGuesses > incorrectGuesses) {
			var endMessage = "Good job!";
			var bottomText = "Science!";
		}
		else {
			var endMessage = "Oh man, you better hit the books...";
			var bottomText = "Come back after you read some books";
		}
		$("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + correctGuesses + "</strong> right.</p>" + "<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
		$("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
		$("#bottomText").html(bottomText);
		gameReset();
		$("#start").click(nextQuestion);
	}

	// game clock currently set to 15 seconds
	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (time < 1) {
				clearInterval(clock);
				userTimeout();
			}
			if (time > 0) {
				time--;
			}
			$("#timer").html("<strong>" + time + "</strong>");
		}
	}

	// moves question counter forward to show next question
	function nextQuestion() {
		if (questionCounter < questions.length) {
			time = 15;
			$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
			questionContent();
			timer();
			userTimeout();
		}
		else {
			resultsScreen();
		}
	// console.log(questionCounter);
	// console.log(questions[questionCounter].correctAnswer);
	}

	// reset score and counter on restart
	function gameReset() {
		questionCounter = 0;
		correctGuesses = 0;
		incorrectGuesses = 0;
	}

    function startGame() {
    	$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    	$("#start").hide();
    	$("#gameScreen").append("<div id='question'>");  
    	var nextQuestion = questionContent(questionCounter); 
    	$("#gameScreen").append(nextQuestion); 

		$("#gameScreen").append("<p>" + questions[questionCounter].question + "</p><p>" + questions[questionCounter].choices[0] + "</p><p>" + questions[questionCounter].choices[1] + "</p><p>" + questions[questionCounter].choices[2] + "</p><p>" + questions[questionCounter].choices[3] + "</p>");
		questionCounter++;
		questionContent();
    	timer();
    	userTimeout();
    }

    // this starts the game
    $("#start").click(nextQuestion);

    // click function to trigger right or wrong screen
	$("#gameScreen").on("click", ".choices", (function() {
		var userGuess = $(this).text();
		if (userGuess === questions[questionCounter].correctAnswer) {
			clearInterval(clock);
			userWin();
		}
		else {
			clearInterval(clock);
			userLoss();
		}
	}));
});



    //Timer starts count down
    //First question displays (simultaneously with timer, or close)
    
    //If player picks correct answer: message: “You’re correct!”
    //Next question displays
    //If player picks incorrect answer: message: “You’re incorrect - the 	answer is____”
    //Next question displays
    //If player does not pick an answer after time goes to 0, message, “Time’s up - game over”
    //Player can click ok and start over 
    
    //After all questions have been answered on time, display number correct and number incorrect.
    
