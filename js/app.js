// track player count
var p1CurrCount = 0;
var p2CurrCount = 0;

var gameActive = true;

window.onload = function(){ 

    // Create a constructor functions to create and space out multiple divs.
    function CreateCollectible (id, src) {

    	// Create a div (collectible)
    	this.img = document.createElement('img'),
    	this.img.id = 'collectible' + id,
    	this.img.className = 'collectibles',
    	this.img.src = src,

    	// Set the position of the collectible.
    	document.getElementById('gameboard').appendChild(this.img);


    };

    // Add the collectible to the board
    var collectible1 = new CreateCollectible (1, 'imgs/cabbage.png');
    var collectible2 = new CreateCollectible (2, 'imgs/chili.png');
    var collectible3 = new CreateCollectible (3, 'imgs/egg.png');
    var collectible4 = new CreateCollectible (4, 'imgs/garlic.png');
    var collectible5 = new CreateCollectible (5, 'imgs/meat.png');
    var collectible6 = new CreateCollectible (6, 'imgs/mushroom.png');
    var collectible7 = new CreateCollectible (7, 'imgs/onion.png');
    var collectible8 = new CreateCollectible (8, 'imgs/rice.png');
    var collectible9 = new CreateCollectible (9, 'imgs/sauce.png');
    var collectible10 = new CreateCollectible (10, 'imgs/sprout.png');

    /// store key codes and currently pressed ones
    var keys = {};
        keys.UP = 38;
        keys.LEFT = 37;
        keys.RIGHT = 39;
        keys.DOWN = 40;
        keys.W = 87;
        keys.A = 65;
        keys.S = 83;
        keys.D = 68;

    /// store reference to character's position and element
    var character = {
      x: 180,
      y: 500,
      speedMultiplier: 10,
      element: document.getElementById("character")
    };

    // store reference to character's position and element
    var character2 = {
      x: 1850,
      y: 500,
      speedMultiplier: 10,
      element: document.getElementById("character2")
    };

    /// key detection (better to use addEventListener, but this will do)
    document.body.onkeyup = 
    document.body.onkeydown = function(e){
      if (e.preventDefault) { 
        e.preventDefault();
      }
      else {
        e.returnValue = false; 
      }
      var kc = e.keyCode || e.which;
      keys[kc] = e.type == 'keydown';
    };

    /// character movement update
    var moveCharacter = function(dx, dy){
      character.x += (dx||0) * character.speedMultiplier;
      character.y += (dy||0) * character.speedMultiplier;
      character.element.style.left = character.x + 'px';
      character.element.style.top = character.y + 'px';
    };

    /// character2 movement update
    var moveCharacter2 = function(dx, dy){
      character2.x += (dx||0) * character2.speedMultiplier;
      character2.y += (dy||0) * character2.speedMultiplier;
      character2.element.style.left = character2.x + 'px';
      character2.element.style.top = character2.y + 'px';
    };

    /// character control
    var detectCharacterMovement = function(){

		// Detecting key press Player 1
		if ( keys[keys.LEFT] ) {
			moveCharacter(-1, 0);
		}
		if ( keys[keys.RIGHT] ) {
			moveCharacter(1, 0);
		}
		if ( keys[keys.UP] ) {
			moveCharacter(0, -1);
		}
		if ( keys[keys.DOWN] ) {
			moveCharacter(0, 1);
		}

		// Detecting key press Player2
		if ( keys[keys.A] ) {
			moveCharacter2(-1, 0);
		}
		if ( keys[keys.D] ) {
			moveCharacter2(1, 0);
		}
		if ( keys[keys.W] ) {
			moveCharacter2(0, -1);
		}
		if ( keys[keys.S] ) {
			moveCharacter2(0, 1);
		}

		// Detecting barriers
		if (character.y <= 220) {
			character.y = 220;
		}
		if (character.x <= 110) {
			character.x = 110;
		}
		if (character.x >= 1920) {
			character.x = 1920;
		}
		if (character.y >= 870) {
			character.y = 870;
		}
		if (character2.y <= 220) {
			character2.y = 220;
		}
		if (character2.x <= 110) {
			character2.x = 110;
		}
		if (character2.x >= 1920) {
			character2.x = 1920;
		}
		if (character2.y >= 870) {
			character2.y = 870;
		}

    };


    function winAudioPlay(){

	var winAudio = document.getElementById("winAudio");
	winAudio.play();

    }

    // Check For Winner

    function checkForWinner() {

    	if (collectible1.img.style.visibility === 'hidden' && collectible2.img.style.visibility === 'hidden' && 
    		collectible3.img.style.visibility === 'hidden' && collectible4.img.style.visibility === 'hidden' && 
    		collectible5.img.style.visibility === 'hidden' && collectible6.img.style.visibility === 'hidden' && 
    		collectible7.img.style.visibility === 'hidden' && collectible8.img.style.visibility === 'hidden' && 
    		collectible9.img.style.visibility === 'hidden' && collectible10.img.style.visibility === 'hidden') {

    		gameActive = false;

    		winAudioPlay();

    		if (p2CurrCount > p1CurrCount) {

    			document.getElementById('winnerImage').src = 'imgs/p2wins.gif';

    			var modal = document.getElementById('player1Wins');
				modal.style.display = "block";

				// Get the <span> element that closes the modal
				var span = document.getElementById('player1Close');

				// When the user clicks on <span> (x), close the modal
				span.onclick = function() {
			    	modal.style.display = "none";
			    	window.location.reload(true);
				}
				// When the user clicks anywhere outside of the modal, close it
				window.onclick = function(event) {
			    if (event.target == modal) {
			        modal.style.display = "none";
			        window.location.reload(true);
	  				}
				};

    		}
	      	
			var modal = document.getElementById('player1Wins');
			modal.style.display = "block";

			// Get the <span> element that closes the modal
			var span = document.getElementById('player1Close');

			// When the user clicks on <span> (x), close the modal
			span.onclick = function() {
			    modal.style.display = "none";
			    window.location.reload(true);
			}
			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function(event) {
			    if (event.target == modal) {
			        modal.style.display = "none";
			        window.location.reload(true);
	  				}
			};

			return;
    	}
    }

    function itemAudioPlay(){

    	var itemAudio = document.getElementById("itemAudio");
    	itemAudio.play();

    }

    // collision check function
    function collisionCheck () {
		
    	// for (collectible of collectibles) {

    	for (var i = 1; i < 11; i++) {	

    	var rect1 = document.getElementById('character').getBoundingClientRect();
    	var rect2 = document.getElementById('character2').getBoundingClientRect();
    	var coll = document.getElementById('collectible' + i).getBoundingClientRect();
    	var currCollectible = document.getElementById('collectible' + i)


			if (rect1.left < coll.left + coll.width &&
			   rect1.left + rect1.width > coll.left &&
			   rect1.top < coll.top + coll.height &&
			   rect1.height + rect1.top > coll.top && currCollectible.style.visibility != 'hidden') {

			   currCollectible.style.visibility = 'hidden';
			   itemAudioPlay();
			   p1CurrCount++;
			   document.getElementById('player1Count').innerHTML = p1CurrCount;
			   location.reload;
			}
			
			else if (rect2.left < coll.left + coll.width &&
			   rect2.left + rect2.width > coll.left &&
			   rect2.top < coll.top + coll.height &&
			   rect2.height + rect2.top > coll.top && currCollectible.style.visibility != 'hidden') {

			   currCollectible.style.visibility = 'hidden';
			   itemAudioPlay();
			   p2CurrCount++;
			   document.getElementById('player2Count').innerHTML = p2CurrCount;
			   location.reload;
			}			

		}

		checkForWinner();

	}

    // update current position on screen
    moveCharacter();
    moveCharacter2();

    // game loop
    setInterval(function(){
      detectCharacterMovement();
    }, 1000/30);

    setInterval(function(){
      
    	if (document.getElementById("character").src === 'file:///Users/mahmoudbachir/wdi/14-Project0/project0/imgs/co.png') {
    		document.getElementById("character").src = 'file:///Users/mahmoudbachir/wdi/14-Project0/project0/imgs/player1b.png'

    	} else if (document.getElementById("character").src === 'file:///Users/mahmoudbachir/wdi/14-Project0/project0/imgs/player1b.png') {
    		document.getElementById("character").src = 'file:///Users/mahmoudbachir/wdi/14-Project0/project0/imgs/player1.png'
    	}
      
    }, 700);

    // collision check loop
    setInterval(function(){

    	if (gameActive === true) {
    		collisionCheck();
    	}
    		
    }, 500);

}

