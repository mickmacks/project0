console.log('Working JS');

window.onload = function(){ 

	// store collectible values
	var p1CurrCount = 0;
	var p1Count = document.getElementById('player1Count');
	p1Count.innerHTML = p1CurrCount;

    /// store key codes and currently pressed ones
    var keys = {};
        keys.UP = 38;
        keys.LEFT = 37;
        keys.RIGHT = 39;
        keys.DOWN = 40;

    /// store reference to character's position and element
    var character = {
      x: 180,
      y: 100,
      speedMultiplier: 10,
      element: document.getElementById("character")
    };

    // // store reference to collectible position and element
    // function Collectible (lat, lng) {

    // 	this.id = 
    // 	this.x = 30, 
    // 	this.y = 30,
    // 	this.element.style.left = lat,
    // 	this.element.style.top = lng
    // };

    // var collectible1 = new Collectible (200, 500);


    // Creating a DOM element.
    var div = document.createElement('div');
	div.innerHTML = "my <b>new</b> skill - <large>DOM maniuplation!</large>";
	div.setAttribute('id', 'collectible1');
	document.getElementById('gameboard').appendChild(div);

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