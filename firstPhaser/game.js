

var game;
var gameOptions = {
    tileSize: 200,
    tileSpacing: 20,
    boardSize: {
    rows: 4,
    cols:4
    }
}
window.onload = function(){
    var gameConfig = {
        width: gameOptions.boardSize.cols * (gameOptions.tileSize + gameOptions.tileSpacing) + gameOptions.tileSpacing,
        height: gameOptions.boardSize.rows * (gameOptions.tileSize + gameOptions.tileSpacing) + gameOptions.tileSpacing,
        backgroundColor: 0xecf0f1,
        scene: [bootGame,playGame]
}
    game = new Phaser.Game(gameConfig);
    window.focus();
    resizeGame();
    window.addEventListener("resize",resizeGame);


}
function resizeGame() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
} }

class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
create(){
        console.log("this is my awesome game");
        for(let i =0;i<4;i++){
            for(let j=0;j<4;j++){
                var tilePosition = this.getTilePosition(i,j)
                this.add.image(tilePosition.x, tilePosition.y, "emptytile")
            }
        }
    }
    getTilePosition(row, col){
        var posX = gameOptions.tileSpacing * (col + 1) + gameOptions.tileSize *
        (col + 0.5);
        var posY = gameOptions.tileSpacing * (row + 1) + gameOptions.tileSize *
        (row + 0.5);
        return new Phaser.Geom.Point(posX, posY);
    }
}


class bootGame extends Phaser.Scene{
    constructor(){
        super("BootGame");
    }
    preload(){
        this.load.image("emptytile", "assets/sprites/emptytile.png");
    }
    create(){
        console.log("game is booting...");
        this.scene.start("PlayGame");
    }
}