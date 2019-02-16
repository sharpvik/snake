function Pair(x, y) {
    // VARIABLES
    var self = this;
    this.x = x;
    this.y = y;
    
    // METHODS
    this.equals = function(p) {
        return p.x == self.x && p.y == self.y;
    }
}



function Snake(headX, headY) {
    // VARIABLES
    var self = this;
    this.headX = headX;
    this.headY = headY;
    this.stateX = 1;
    this.stateY = 0;
    this.lastDircetion = 39;
    this.direction = 39;
    this.body = [
        new Pair(self.headX - 2, self.headY),
        new Pair(self.headX - 1, self.headY),
        new Pair(self.headX, self.headY),
    ];
    this.ARROWS = {
        37 : [-1, 0],
        38 : [0, -1],
        39 : [1, 0],
        40 : [0, 1],
    };
    this.DIRECTIONS = {
        37 : 39,
        39 : 37,
        38 : 40,
        40 : 38,
    };
    
    
    // METHODS
    this.turn = function(lastKey) {
        if (self.lastDirection != self.DIRECTIONS[lastKey]) { // deal with backward turns
            console.log( 'New direction: ' + self.direction.toString() );
            self.direction = lastKey;
            self.stateX = self.ARROWS[self.direction][0];
            self.stateY = self.ARROWS[self.direction][1];
        } else console.log('Illegal turn blocked.');
    }
}



function SnakeGame() {
    // VARIABLES
        // CONSTANT
    var self = this;
    this.name = 'Snake Game v1.0';
    this.author = 'Viktor Rozenko';
    this.dimentions = [16, 16];
    this.delay = 250;
        // DYNAMIC
    this.snake;
    this.gameOver = true;
    this.gameON;
    this.fruit;
    this.score;
    this.mainLoop;

    
    
    // METHODS
    this.fieldRender = function() {
        var game = document.getElementById('game');
        empty(game);
        append(game, '<div id="field"></div>');
        var field = document.getElementById('field');
        for (var h = 0; h < self.dimentions[1]; h++) {
            var appendix = '<div class="row">';
            for (var w = 0; w < self.dimentions[0]; w++) {
                appendix += '<div id="_' + w.toString() + '_' + 
                            h.toString() + '" class="cell"></div>';
            }
            appendix += '</div>';
            append(field, appendix);
        }
    }
    
    
    this.fruitPosition = function() {
        while (self.fruit == null) 
        {
            var x = randint(0, self.dimentions[0]),
                y = randint(0, self.dimentions[0]);
                p = new Pair(x, y);
            self.fruit = ( self.snake.body.indexPair(p) > -1 ) ? null : p;
        }
    }
    
    
    this.gameRender = function() {
        function getCellByCoordinates(x, y) {
            var cellID = '_' + x + '_' + y;
            return document.getElementById(cellID);
        }
        
        // RENDER FIELD
        self.fieldRender();
        
        // RENDER SNAKE
            // HEAD
        (function() {
            var x = self.snake.headX.toString(),
                y = self.snake.headY.toString();
            var snakeHead = getCellByCoordinates(x, y);
            addClass(snakeHead, 'snake-head');
        })();
        
            // BODY
        (function() {
            for (var p of self.snake.body) {
                var x = p.x, y = p.y;
                var snakeBody = getCellByCoordinates(x, y);
                addClass(snakeBody, 'snake-body');
            }
        })();
        
        // RENDER FRUIT
        (function() {
            var x = self.fruit.x.toString(),
                y = self.fruit.y.toString();
            var fruit = getCellByCoordinates(x, y);
            addClass(fruit, 'fruit');
        })();
    }
    
    
    this.gameStatusRender = function() {
        var statusField = document.getElementById('status-info'),
            name = document.getElementById('game-name'),
            status = document.getElementById('game-status'),
            score = document.getElementById('game-score');
        statusField.className = '';
        name.innerHTML = self.name + ' by ' + self.author;
        status.innerHTML = 'Game Over: ' + self.gameOver.toString();
        score.innerHTML = 'Score: ' + self.score.toString();
    }
    
    
    this.gameReset = function() {
        // RESET SNAKE
        self.snake = new Snake( Math.floor(self.dimentions[0] / 2), Math.floor(self.dimentions[1] / 2) );
        
        // RESET GAME
        self.gameOver = false;
        self.gameON = false;
        self.fruit = null;
        self.score = 0;
        self.mainLoop = null;
    }
    
    
    this.gameInit = function() {
        if (!self.gameON) {
            console.log("Initializing the game...");
            self.fruitPosition();
            self.mainLoop = setInterval(self.gameLogic, self.delay); // initialize main loop (START / CONTINUE)
            self.gameON = true;
        }
    }
    
    
    this.gameLogic = function() {
        // RECORD DIRECTION
        self.snake.lastDirection = self.snake.direction;
    
        // GENERATE NEW HEAD POSITION
        self.snake.headX += self.snake.stateX;
        self.snake.headY += self.snake.stateY;
        
        // MOVE SNAKE
        self.snake.body.push( new Pair(self.snake.headX, self.snake.headY) );
        
        // EAT FRUIT
        if ( self.snake.body.indexPair(self.fruit) > -1 ) {
            console.log('Fruit eaten.')
            self.fruit = null;
            self.fruitPosition();
            self.score++;
        } else self.snake.body.shift();
        
        // COLLISION DETECTION
        var collision = (function() {
            var x = self.snake.headX,
                y = self.snake.headY,
                p = new Pair(x, y);
            var bodyCross = self.snake.body.indexPair(p);
            if ( bodyCross > -1 && bodyCross != self.snake.body.length - 1 || 
                 x < 0 || x > self.dimentions[0] - 1 || 
                 y < 0 || y > self.dimentions[1] - 1) {
                self.die();
                return true;
            } else return false;
        })();
        
        // RENDER
        self.gameStatusRender();
        if (!collision) self.gameRender();
    }
    
    
    this.die = function() {
        console.log('Game Over.');
        self.gameStop();
        self.gameOver = true;
    }
    
    
    this.gameStop = function() {
        if (self.gameON) {
            console.log("Terminating the game...")
            clearInterval(self.mainLoop); // break main loop (PAUSE)
            self.gameON = false;
        }
    }
}