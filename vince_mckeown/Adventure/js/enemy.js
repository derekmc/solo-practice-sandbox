function enemyClass() {
	this.x = 600;
	this.y = 800;
	this.width = 30;
	this.height = 30;
	this.isoEnemyFootY = 8;
	this.offSetWidth = 0;
	this.offSetHeight = 0;
	this.miniMapX = 630;
	this.miniMapY = 30;
	
	this.maxHitPoints = 8;
	this.speed = 3;
	this.hitPoints = this.maxHitPoints;
	
	this.movementTimer = 0;
	this.moveNorth = false;
	this.keyHeld_East = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;

	this.enemyPic = document.createElement("img");
	
	this.enemyReset = function() {
		this.speed = 3;
		this.hitPoints = this.maxHitPoints;
				
		if(this.homeX == undefined) {
			for(var i=0; i<roomGrid.length; i++){
				if( roomGrid[i] == TILE_ENEMY) {
					var tileRow = Math.floor(i/ROOM_COLS);
					var tileCol	= i%ROOM_COLS;
					
					this.homeX = tileCol * ROOM_W + 0.5 * ROOM_W; 
					this.homeY = tileRow * ROOM_H + 0.5 * ROOM_H; 

					roomGrid[i] = TILE_ROAD;
					break;
				}
			}
		}
		this.x = this.homeX;
		this.y = this.homeY;
	}
					
	this.init = function(whichGraphic, whichName) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.enemyReset();
	}	
	 
	this.movement = function() {
		
		var nextX = this.x; 
		var nextY = this.y; 
		
		this.randomMovements();
		this.speed = 1.0;
		
		/*if(this.moveNorth && this.keyHeld_West){
			nextY -= PLAYER_MOVE_SPEED;
		} else if(this.moveNorth && this.keyHeld_East){
			nextX += PLAYER_MOVE_SPEED;
			this.miniMapX += PLAYER_MOVE_SPEED/10;
			this.miniMapY -= PLAYER_MOVE_SPEED/10;
		} else if(this.keyHeld_South && this.keyHeld_West){
			nextX -= PLAYER_MOVE_SPEED;
			this.miniMapX -= PLAYER_MOVE_SPEED/10;
			this.miniMapY += PLAYER_MOVE_SPEED/10;
		} else if(this.keyHeld_South && this.keyHeld_East){
			nextY += PLAYER_MOVE_SPEED;
			this.miniMapX += PLAYER_MOVE_SPEED/10;
			this.miniMapY += PLAYER_MOVE_SPEED/10; 
		} else */ if(this.moveNorth){
			nextY -= this.speed;
			this.offSetHeight = this.height * 4;
		} else if(this.moveEast){
			nextX += this.speed;
			this.offSetHeight = this.height * 1;
		//	this.miniMapX += PLAYER_MOVE_SPEED/5;
		} else if(this.moveSouth){
			nextY += this.speed;
			this.offSetHeight = this.height * 2;
		//	this.miniMapY += PLAYER_MOVE_SPEED/5;
		} else if(this.moveWest){
			nextX -= this.speed;
			this.offSetHeight = this.height * 3;
		//	this.miniMapX -= PLAYER_MOVE_SPEED/5;
		} else {
			this.offSetHeight = 0;
		}
		this.miniMapX = nextX;
		this.miniMapY = nextY;
		
		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
		var walkIntoTileType = TILE_WALL;
		
		if(walkIntoTileType != undefined){	
			walkIntoTileType = roomGrid[walkIntoTileIndex];
		}
		
		//console.log(walkIntoTileType);
		
		switch(walkIntoTileType) {
			case TILE_ROAD:
			case TILE_YELLOW_KEY:	
				this.x = nextX;
				this.y = nextY;
				break;					
			case TILE_WALL:
			case TILE_TREASURE:
			case TILE_FINISH:			
			case TILE_YELLOW_DOOR:
			case TILE_RED_DOOR:
			case TILE_BLUE_DOOR:
				this.movementTimer = 0;
			default:
				this.movementTimer = 0;
				break;
		} 
	}	
	
	this.randomMovements = function(){
		var whichDirection =  Math.round(Math.random() * 10);
		this.movementTimer--;
	
		if(this.movementTimer <= 0){
			switch(whichDirection) {
				case 0:
				case 1:
					this.resetDirections();
					this.moveNorth = true;					
					this.movementTimer = 300;
					break;
				case 2:
				case 3:
					this.resetDirections();
					this.moveWest = true;
					this.movementTimer = 300;
					break;
				case 4:
				case 5:
					this.resetDirections();
					this.moveSouth = true;
					this.movementTimer = 300;
					break;
				case 6:
				case 7:
					this.resetDirections();
					this.moveEast = true;
					this.movementTimer = 300;
					break;
				case 8:
				case 9:
				case 10:
					this.resetDirections();
					this.movementTimer = 300;
					break;
			}
		}
	}
	
	this.resetDirections = function(){
		this.moveNorth = false;
		this.moveWest = false;
		this.moveSouth = false;
		this.moveEast = false;
	}	
		
	this.draw = function(){
		gameCoordToIsoCoord(this.x,this.y);
		canvasContext.drawImage(this.myBitmap, this.offSetWidth, this.offSetHeight, this.width, this.height, 
								isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y, this.width, this.height);
		//colorRect(this.miniMapX, this.miniMapY, 10, 10, "green");	
	}
}