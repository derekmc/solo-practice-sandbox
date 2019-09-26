const PLAYER_MOVE_SPEED = 3.0;
const ISO_CHAR_FOOT_Y = 8;

function warriorClass() {
	this.x = 600;
	this.y = 800;
	this.width = 30;
	this.height = 30;
	this.offSetWidth = 0;
	this.offSetHeight = 0;
	this.miniMapX = 630;
	this.miniMapY = 30;
	this.keyHeld_North = false;
	this.keyHeld_East = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;

	this.warriorPic = document.createElement("img");
	
	this.setupControls = function(northKey,eastKey,southKey,westKey) {
		this.controlKeyForNorth = northKey;
		this.controlKeyForEast = eastKey;			
		this.controlKeyForSouth = southKey;
		this.controlKeyForWest = westKey;
	}

	this.warriorReset = function() {
		this.speed = 0;
		this.keysHeld = 0;
		
		//console.log("Home X: " + this.homeX);
				
		if(this.homeX == undefined) {
			for(var i=0; i<roomGrid.length; i++){
				if( roomGrid[i] == TILE_PLAYER) {
					var tileRow = Math.floor(i/ROOM_COLS);
					var tileCol	= i%ROOM_COLS;
					var tileLeftEdgeX = 700
					var tileTopEdgeY = 0;
	
					this.homeX = tileCol * ROOM_W + 0.5 * ROOM_W; 
					this.homeY = tileRow * ROOM_H + 0.5 * ROOM_H; 

					roomGrid[i] = TILE_ROAD;
					break;
				}
			}
		}
		this.x = this.homeX;
		this.y = this.homeY;
		this.miniMapX = this.homeX + 750;
		this.miniMapY = this.homeY + 2;
		//console.log("Start X: " + this.x + " Start Y: " + this.y);
	}
					
	this.init = function(whichGraphic, whichName) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.warriorReset();
	}	
	 
	this.movement = function() {
		
		var nextX = this.x; 
		var nextY = this.y; 
		
		if(this.keyHeld_North && this.keyHeld_West){
			nextY -= PLAYER_MOVE_SPEED;
		} else if(this.keyHeld_North && this.keyHeld_East){
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
		} else if(this.keyHeld_North){
			nextY -= PLAYER_MOVE_SPEED;
			this.offSetHeight = this.height * 4;
			this.miniMapY -= PLAYER_MOVE_SPEED/15;
		} else if(this.keyHeld_East){
			nextX += PLAYER_MOVE_SPEED;
			this.offSetHeight = this.height * 1;
			this.miniMapX += PLAYER_MOVE_SPEED/15;
		} else if(this.keyHeld_South){
			nextY += PLAYER_MOVE_SPEED;
			this.offSetHeight = this.height * 2;
			this.miniMapY += PLAYER_MOVE_SPEED/15;
		} else if(this.keyHeld_West){
			nextX -= PLAYER_MOVE_SPEED;
			this.offSetHeight = this.height * 3;
			this.miniMapX -= PLAYER_MOVE_SPEED/15;
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

		switch(walkIntoTileType) {
			case TILE_ROAD:
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_YELLOW_DOOR:
			case TILE_RED_DOOR:
			case TILE_BLUE_DOOR:
				if(this.keysHeld > 0){
					this.keysHeld--;
					//colorText("Keys: " + this.keysHeld, 10, canvas.height-18, "black");
					roomGrid[walkIntoTileIndex] = TILE_ROAD;
				}
				break;	
			case TILE_TREASURE:	
				this.keysHeld--;
				document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				break;
			case TILE_YELLOW_KEY:	
				this.keysHeld++;
				document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
				
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				break;			
			case TILE_FINISH:
				document.getElementById("debugText").innerHTML = this.myName + " won";
				this.warriorReset();
				break;						
			case TILE_WALL:
			case TILE_WALL_WITH_TORCH:
			case TILE_WALL_WITH_TORCH_2:
			case TILE_TABLE:
			default:
				break;
		} // END OF SWITCH CASE			
	}	// END OF THIS.MOVEMENT

		
	this.checkCollisionsAgainst = function(otherHumanoid){
		document.getElementById("debugText").innerHTML = "testing collision against " + otherHumanoid;
		if(this.collisionTest(otherHumanoid)){
			document.getElementById("debugText").innerHTML = "Collision Detected";	
		}
	}
	
	this.collisionTest = function(otherHumanoid){
		document.getElementById("debugText").innerHTML = "testing " + otherHumanoid;
		if(	this.x > otherHumanoid.x && this.x < (otherHumanoid.x + 40) &&
			this.y > otherHumanoid.y && this.y < (otherHumanoid.y + 40)){
				document.getElementById("debugText").innerHTML = "within box";	
				return true;
		}
		return false;
	}
		
	this.draw = function(){
		gameCoordToIsoCoord(this.x,this.y);
		canvasContext.drawImage(shadowPic,isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y);
		canvasContext.drawImage(this.myBitmap, this.offSetWidth, this.offSetHeight, this.width, this.height, 
								isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y, this.width, this.height);
		//colorRect(this.miniMapX, this.miniMapY, 4, 4, "green");	
	}
}