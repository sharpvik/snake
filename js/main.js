// CREATE INSTANCE OF SnakeGame
console.log("Creating snakeGame...");
var snakeGame = new SnakeGame();



// DETECTING KEYDOWN
document.onkeydown = function(e) {
    key = e.keyCode;
    if (key == 32) {
        console.log("SPACE pressed.")
        if (snakeGame.gameOver) snakeGame.gameReset();
        snakeGame.gameInit();
    } else if (key == 27) {
        console.log("ESC pressed.")
        snakeGame.gameStop();
    } else if (snakeGame.snake.ARROWS[key] != null) {
        console.log("ARROW pressed.")
        snakeGame.snake.turn(key);
    }
}
