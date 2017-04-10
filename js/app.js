// track player count
var p1CurrCount = 0;

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

    /// store reference to character's position and element
    var character = {
      x: 180,
      y: 500,
      speedMultiplier: 10,
      element: document.getElementById("character")
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

    /// character control
    var detectCharacterMovement = function(){

		// Detecting key press
		if ( keys[keys.LEFT] ) {
			moveCharacter(-1, 0);
		// character.src = 'imgs/player1b.png';
		// console.log(character.src);
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
    	var rect2 = document.getElementById('collectible' + i).getBoundingClientRect();
    	var currCollectible = document.getElementById('collectible' + i)


			if (rect1.left < rect2.left + rect2.width &&
			   rect1.left + rect1.width > rect2.left &&
			   rect1.top < rect2.top + rect2.height &&
			   rect1.height + rect1.top > rect2.top && currCollectible.style.visibility != 'hidden') {

			   currCollectible.style.visibility = 'hidden';
			   itemAudioPlay();
			   p1CurrCount++;
			   document.getElementById('player1Count').innerHTML = p1CurrCount;
			   location.reload;
			}

		}

		checkForWinner();

		

	}

    // update current position on screen
    moveCharacter();

    // game loop
    setInterval(function(){
      detectCharacterMovement();
    }, 1000/30);

    setInterval(function(){
      
    	if (document.getElementById("character").src === 'file:///Users/mahmoudbachir/wdi/14-Project0/project0/imgs/player1.png') {

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

