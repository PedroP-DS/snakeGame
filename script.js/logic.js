window.onload = function() {
    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext("2d");

    var cvsW = cvs.width;
    var cvsH = cvs.height;

    var snakeW = 10;
    var snakeH = 10;

    var direction = "right";

    //Lendo a entrada de comandos
    document.addEventListener("keydown",getDirection);
    function getDirection(e){
        if(e.keyCode == 37 && direction != "right") {
            direction = "left";
        }else if (e.keyCode == 38 && direction != "down") {
            direction = "up";
        }else if (e.keyCode == 39 && direction != "left") {
            direction = "right";
        }else if (e.keyCode == 40 && direction != "up") {
            direction = "down";
        }  
    }

    function drawSnake(x,y){

        ctx.fillStyle = "#fff";
        ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

        ctx.fillStyle = "#000";
        ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
    }



var len = 4;
var snake = [];

for(var i = len-1; i >=0; i--) {
    snake.push(
                {x:i,
                y:0
            }
    );
}

//comida
food = {
    x : Math.round(Math.random()*(cvsW/snakeW-1)+1),
    y : Math.round(Math.random()*(cvsW/snakeH-1)+1)
}

function drawFood(x,y){
        ctx.fillStyle = "yellow";
        ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

        ctx.fillStyle = "#000";
        ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
}

function draw(){
    ctx.clearRect(0,0,cvsW,cvsH);
    for(var i = 0; i<snake.length;i++){
        var x = snake[i].x;
        var y = snake[i].y;
        drawSnake(x,y);
    }

    drawFood(food.x,food.y);

    //Cabeça da cobra
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    //Se atingir a parede.
    if (snakeX < 0 || snakeY < 0 || snakeX >= cvsW/snakeW || snakeY >= cvsH/snakeH){
        location.reload();
    }

    //Remove o ultimo do array(rabo da cobra)
    snake.pop();

    if(direction == "left") snakeX--;
    else  if(direction == "up") snakeY--;
    else  if(direction == "right") snakeX++;
    else  if(direction == "down") snakeY++;

    //Se a cobra comer a comida
    if (snakeX == food.x && snakeY == food.y){
        food = {
            x : Math.round(Math.random()*(cvsW/snakeW-1)+1),
            y : Math.round(Math.random()*(cvsW/snakeH-1)+1)
        }
        var newHead = {
                        x : snakeX,
                        y : snakeY
                    };
    }else{
        snake.pop();
        var newHead = {
                        x : snakeX,
                        y : snakeY
                    };
    }

    snake.unshift(newHead);
}

setInterval(draw,60);












}