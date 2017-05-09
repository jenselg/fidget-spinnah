var spinner = function(game){}

spinner.prototype = {

	init: function(){
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.pageAlignHorizontally = true;
	    this.game.physics.startSystem(Phaser.Physics.ARCADE);
	},
	preload: function(){
		this.game.load.image('fidget-white', 'assets/fidget-white.png');
		this.game.load.bitmapFont('pixel', 'assets/font.png', 'assets/font.xml');
		if(window.localStorage.getItem('taps') == null){
			window.localStorage.setItem('taps', 0);
		}
	},
	create: function(){
	    this.game.stage.backgroundColor = '#000000';
	    spinner = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'fidget-white');
	    spinner.anchor.setTo(0.50, 0.4042);
	    this.game.physics.enable(spinner);
	    //  We'll set a lower max angular velocity here to keep it from going totally nuts
	    spinner.body.maxAngular = 9999;
	    //  Apply a drag otherwise the sprite will just spin and never slow down
	    spinner.body.angularDrag = 150;
	    // Enable touch events on the spinner
	    spinner.inputEnabled = true;
	    // Init variables
	    initX = 0;
	    initY = 0;
	    // Load text
	    velocityCount = 0;
	    velocityText = this.game.add.bitmapText(this.game.world.centerX, 22, 'pixel', "" + velocityCount, 50)
	    velocityText.anchor.setTo(0.5, 0.5);
	    velocityText2 = this.game.add.bitmapText(this.game.world.centerX, 54, 'pixel', "radians/sec.", 30)
	    velocityText2.anchor.setTo(0.5, 0.5);

	    tapCount = window.localStorage.getItem('taps')
	    tapText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.height - 48, 'pixel', "" + tapCount, 50)
	    tapText.anchor.setTo(0.5, 0.5);
	    tapText2 = this.game.add.bitmapText(this.game.world.centerX, this.game.world.height - 16, 'pixel', "total flicks", 30)
	    tapText2.anchor.setTo(0.5, 0.5);

	},
	update: function(){
		this.game.input.onDown.addOnce(this.initialCoordsAndTap, this);
	    //  Reset the acceleration
	    spinner.body.angularAcceleration = 0;

	    //  Apply acceleration if the left/right arrow keys are held down

	    if (Math.abs(this.game.input.speed.x) > Math.abs(this.game.input.speed.y)){
	    	// X speed greater than Y speed
	    	if (initY < this.game.world.centerY){
		    	if (this.game.input.speed.x > 0){
					spinner.body.angularAcceleration += Math.abs(this.game.input.speed.x*(20));
		    	} else if (this.game.input.speed.x < 0){
		    		spinner.body.angularAcceleration -= Math.abs(this.game.input.speed.x*(20));
		    	}
	    	} else if (initY > this.game.world.centerY){
		    	if (this.game.input.speed.x > 0){
					spinner.body.angularAcceleration -= Math.abs(this.game.input.speed.x*(20));
		    	} else if (this.game.input.speed.x < 0){
		    		spinner.body.angularAcceleration += Math.abs(this.game.input.speed.x*(20));
		    	}
	    	}

	    } else if (Math.abs(this.game.input.speed.x) < Math.abs(this.game.input.speed.y)){
	    	// Y speed greater than X speed
	    	if (initX < this.game.world.centerX){
		    	if (this.game.input.speed.y > 0){
					spinner.body.angularAcceleration -= Math.abs(this.game.input.speed.y*(20));
		    	} else if (this.game.input.speed.y < 0){
		    		spinner.body.angularAcceleration += Math.abs(this.game.input.speed.y*(20));
		    	}
	    	} else if (initX > this.game.world.centerX){
		    	if (this.game.input.speed.y > 0){
					spinner.body.angularAcceleration += Math.abs(this.game.input.speed.y*(20));
		    	} else if (this.game.input.speed.y < 0){
		    		spinner.body.angularAcceleration -= Math.abs(this.game.input.speed.y*(20));
		    	}
	    	}
    	}

    	velocityCount = Math.round(Math.abs(spinner.body.angularVelocity));
    	velocityText.setText(velocityCount);

    	if (velocityCount == 0){
    		velocityText2.setText("flick it!");
    		spinner.tint = 0xffffff;
    	} else if (velocityCount > 0 && velocityCount <= 1000){
    		velocityText2.setText("pathetic!");
    		spinner.tint = 0xffebee;
    	} else if (velocityCount > 1000 && velocityCount <= 2000){
    		velocityText2.setText("mediocre!");
    		spinner.tint = 0xffcdd2;
    	} else if (velocityCount > 2000 && velocityCount <= 3000){
    		velocityText2.setText("above average!");
    		spinner.tint = 0xef9a9a;
    	} else if (velocityCount > 3000 && velocityCount <= 4000){
    		velocityText2.setText("spinning spree!");
    		spinner.tint = 0xe57373;
    	} else if (velocityCount > 4000 && velocityCount <= 5000){
    		velocityText2.setText("rampage!");
    		spinner.tint = 0xef5350;
    	} else if (velocityCount > 5000 && velocityCount <= 6000){
    		velocityText2.setText("unstoppable!");
    		spinner.tint = 0xf44336;
    	} else if (velocityCount > 6000 && velocityCount <= 7000){
    		velocityText2.setText("dominating!");
    		spinner.tint = 0xe53935;
    	} else if (velocityCount > 7000 && velocityCount <= 8000){
    		velocityText2.setText("godlike!");
    		spinner.tint = 0xd32f2f;
    	} else if (velocityCount > 8000 && velocityCount <= 9000){
    		velocityText2.setText("legendary!");
    		spinner.tint = 0xc62828;
    	} else if (velocityCount > 9000){
    		velocityText2.setText("over 9000!");
    		spinner.tint = 0xb71c1c;
    	}

	},
	initialCoordsAndTap: function(){
		initX = this.game.input.x;
		initY = this.game.input.y;
		tapCount++;
		window.localStorage.setItem('taps', tapCount);
		tapText.setText(tapCount);
	}

}