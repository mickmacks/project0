console.log('Working JS');

window.onload = function(){ 

	// store collectible values
	var p1CurrCount = 0;
	var p1Count = document.getElementById('player1Count');
	p1Count.innerHTML = p1CurrCount;

    // Create a constructor functions to create and space out multiple divs.
    function CreateCollectible (id, lat, lng, src) {

    	// Create a div (collectible)
    	this.img = document.createElement('img'),
    	this.id = id,

    	// Set the position of the collectible.
    	this.img.style.width = '48px',
    	this.img.style.height = '48px',
    	this.img.src = src,
    	this.img.style.top = '30px',
    	this.img.style.left = '30px',
    	this.img.style.marginLeft = lat + 'px',
    	this.img.style.marginTop = lng + 'px',
    	this.img.style.display = 'inline-block',
    	this.img.style.float = 'left'


    	document.getElementById('gameboard').appendChild(this.img);

    };

    // Add the collectible to the board

    var collectible1 = new CreateCollectible (1, 200, 200, 'imgs/cabbage.png');
    var collectible2 = new CreateCollectible (2, 200, 200, 'imgs/chili.png');
    var collectible3 = new CreateCollectible (3, 200, 200, 'imgs/egg.png');
    var collectible4 = new CreateCollectible (4, 200, 200, 'imgs/garlic.png');
    var collectible5 = new CreateCollectible (5, 200, 200, 'imgs/meat.png');
    var collectible6 = new CreateCollectible (6, 200, 200, 'imgs/mushroom.png');
    var collectible7 = new CreateCollectible (7, 200, 200, 'imgs/onion.png');
    var collectible8 = new CreateCollectible (8, 200, 200, 'imgs/rice.png');
    var collectible9 = new CreateCollectible (9, 200, 200, 'imgs/sauce.png');
    var collectible10 = new CreateCollectible (10, 200, 200, 'imgs/sprout.png');

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
	  if (character.y <= 220) {
	    character.y = 220;
	  }
	  if (character.x <= 110) {
	    character.x = 110;
	  }
	  if (character.x >= 1450) {
	    character.x = 1450;
	  }
	  if (character.y >= 740) {
	    character.y = 740;
	  }

    };

    /// update current position on screen
    moveCharacter();

    /// game loop
    setInterval(function(){
      detectCharacterMovement();
    }, 1000/30);


}