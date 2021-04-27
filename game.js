function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

include("player.js");
include("enemy.js");
include("bullet.js");
include("obstacle.js");
include("boss.js");

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyRealeased);
canvas.addEventListener("mousemove", checkPos);
var fadeId = 0;


var pcon = 0; //0-main menu 1-game 2-death-screen
var pcont = 0; //1-keyboard 2-mouse only
var Img = new Image();
var z = 0;
var curscore = 0;
var bestscore = 0;
var starX = 0, starY = 0, starX2 = 1280, width = 900, height = 600;

Img.src = "img/player.png";

var enemys = [];
var ecount = 0;
var ekills = 0;
var bosshp = -1;

var bullets = [];
var obstacles = [];
var boss;

function makeEnemy()
{
    ex = 900;
    ey = Math.random()*525;
    edx = Math.random(-45)*-20;
    edy = Math.random(-10)*10;
    var enemy = new Enemy(ex, ey, edx, edy);
    enemys.push(enemy);
}

function makeBoss()
{
    bosshp = 60;
    bossx = 900;
    bossy = 450;
    bossdx = -10;
    bossdy = -10;
    boss = new Boss(bossx, bossy, bossdx, bossdy);
}

function makeBullet()
{
    var bx = player.x + 75;
    var by = player.y + 75/2 - 5/2;
    var bdx = 15;
    
    var bullet = new Bullet(bx, by, bdx);

    bullets.push(bullet);
}

function makeObst(enx, eny)
{
    var ox = enx;
    var oy = eny + 75/2;
    var odx = 10;
    
    var obstacle = new Obstacle(ox, oy, odx);

    obstacles.push(obstacle);
}
var kd = 0;

var pl = {x:100, y:300, dx:10, dy:10}; //player param
var player = new Player(pl.x, pl.y, pl.dx, pl.dy);
var plph = 3;

var timer = 0;
var btimer = 0;
var godtimer = 0;


var fonimg = new Image();
fonimg.src = 'img/starfield.jpg';


var enemimg = new Image();
enemimg.src = 'img/enemy.png';


var leftKeyPress = false;
var rightKeyPress = false;
var upKeyPress = false;
var downKeyPress = false;
var spaceKeyPress = false;
var spaceKeyPress = false;

const LEFT_KEY = 37;
const RIGHT_KEY = 39; 
const UP_KEY = 38;
const DOWN_KEY = 40;
const SPACE_KEY = 32;

function keyPressed(evt)
{
    if(evt.keyCode == LEFT_KEY && pcont == 1)
    {
        leftKeyPress = true;
    }
    if(evt.keyCode == RIGHT_KEY && pcont == 1)
    {
        rightKeyPress = true;
    }
    if(evt.keyCode == UP_KEY && pcont == 1)
    {
        upKeyPress = true;
    }
    if(evt.keyCode == DOWN_KEY && pcont == 1)
    {
        downKeyPress = true;
    }
    if(evt.keyCode == SPACE_KEY && pcont == 1)
    {
        if(kd <= 0)
        {
            makeBullet();
            kd = 20;
        }
    }
    
}

function shoot()
{
        if(kd <= 0)
        {
            makeBullet();
            kd = 20;
        }
}

function keyRealeased(evt)
{
    if(evt.keyCode == LEFT_KEY && pcont == 1)
    {
        leftKeyPress = false;
    }
    if(evt.keyCode == RIGHT_KEY && pcont == 1)
    {
        rightKeyPress = false;
    }
    if(evt.keyCode == UP_KEY && pcont == 1)
    {
        upKeyPress = false;
    }
    if(evt.keyCode == DOWN_KEY && pcont == 1)
    {
        downKeyPress = false;
    }
    if(evt.keyCode == SPACE_KEY && pcont == 1)
    {
        spaceKeyPress = false;
    }
}

canvas.addEventListener('click', function(event)
 { 
    if (mouseX > (width / 4 - 56) && mouseX < ((width / 4 - 56)+580) && mouseY > ((height / 3 + 115)) &&  mouseY < ((height / 3 + 115)+60) && pcon == 0)
    {
        pcon = 1;
        pcont = 1;
    } 
    else if (mouseX > (width / 3 - 45) && mouseX < ((width / 3 - 45)+415) && mouseY > (height / 3 + 215) &&  mouseY < ((height / 3 + 215)+60) && pcon == 0)
    {
        pcon = 1;
        pcont = 2;
        document.getElementById('game').style.cursor = "none";
    }
    else if (mouseX > 300 && mouseX < 300 + 250 && mouseY > 430 &&  mouseY < 430+45 && pcon == 2)
    {
        if (pcont = 2){
            document.getElementById('game').style.cursor = "none";
        }
        curscore = 0;
        player.x = 100;
        player.y = 300;
        pcon = 1;
    }
    else if (mouseX > 300 && mouseX < 300 + 285 && mouseY > 505 &&  mouseY < 505+45 && pcon == 2)
    {
        pcon = 0;
        pcont = 0;
    }
  });

function pmove()
{
    if(pcont == 1)
    {
        if(leftKeyPress && player.x - player.dx >= 0)
        {
            player.x -= player.dx;
        }
        if(rightKeyPress && player.x + player.dx <= 825)
        {
            player.x += player.dx;
        }
        if(upKeyPress && player.y - player.dy >= 0)
        {
            player.y -= player.dy;
        }
        if(downKeyPress && player.y + player.dy <= 525)
        {
            player.y += player.dy;
        }
    }
    if(pcont == 2)
    {
        player.x = mouseX - 75/2;
        player.y = mouseY - 75/2;
    }
}

function emove()
{
    if(godtimer > 0)
    {
        godtimer--;
    }
    timer++;
    if (timer%20 == 0 && ecount < 30 && ekills <= 60 && godtimer == 0)
    {
        makeEnemy();
        ecount++;
    }
    
    //phis
    for(i in enemys)
    {
        if(timer % 30 == 0)
        {
            makeObst(enemys[i].x, enemys[i].y);
        }
        enemys[i].move();
        //border
        if (enemys[i].x <= 0)
        { 
            enemys[i].x = 900; 
            enemys[i].y = Math.random()*525;
        }
        if (enemys[i].y >= 525 || enemys[i].y < 0) enemys[i].dy = -enemys[i].dy;
        //collision
        if(enemys[i].y + 75 > player.y + 75/2 && enemys[i].y < player.y + 75 - 75/2 && enemys[i].x + 75 > player.x + 75/2 + 3 && enemys[i].x < player.x + 75 - (75/2 + 3))
        {
            godtimer = 180;
            plph--;
            curscore -= 50;
            enemys.forEach(function(enemy, i)
            {
                delete enemys[i];
                ecount--;
            });
            obstacles.forEach(function(obstacle, i)
            {
                delete obstacles[i];
            });
            enemys = enemys.filter(item => item !== undefined);
            obstacles = obstacles.filter(item => item !== undefined);
            if(pcont == 1)
            {
                player.x = 100;
                player.y = 300;
            }
            console.log('hit');
        }
    }

}

function bossmove()
{
    if(timer % 25 == 0 && godtimer == 0)
    {
        makeObst(boss.x, boss.y);
        makeObst(boss.x+50, boss.y+50);
        makeObst(boss.x-50, boss.y-50);
        makeObst(boss.x+100, boss.y+100);
        makeObst(boss.x-100, boss.y-100);
    }
    boss.move();
    if (boss.x <= 500 || boss.x >900) boss.dx = -boss.dx
    if (boss.y >= 525 || boss.y < 0) boss.dy = -boss.dy;
    if(boss.y + 200 > player.y + 75/2 && boss.y < player.y + 75 - 75/2 && boss.x + 200 > player.x + 75/2 + 3 && boss.x < player.x + 75 - (75/2 + 3))
    {
        godtimer = 180;
        plph--;
        curscore -= 50;
        obstacles.forEach(function(obstacle, i)
        {
            delete obstacles[i];
        });
        obstacles = obstacles.filter(item => item !== undefined);
        if(pcont == 1)
        {
            player.x = 100;
            player.y = 300;
        }
        console.log('hit');
    }
}

function omove()
{
    for(i in obstacles)
    {
        obstacles[i].move();
        if(obstacles[i].outOfRange() )
        {
            delete obstacles[i]
            curscore++;
        }
        else if(obstacles[i].y + 13 > player.y + 75/2 && obstacles[i].y < player.y + 75 - 75/2 && obstacles[i].x + 20 > player.x + 75/2 + 3 && obstacles[i].x < player.x + 75 - (75/2 + 3))
        {
            godtimer = 180;
            plph--;
            curscore -= 50;
            obstacles.forEach(function(obstacle, i)
            {
                delete obstacles[i];
            });
            enemys.forEach(function(enemy, i)
            {
                delete enemys[i];
            });
        }
        
    }
    enemys = enemys.filter(item => item !== undefined);
    obstacles = obstacles.filter(item => item !== undefined);
}

function bmove()
{
    if(kd > 0)
    {
        kd--;
    }
    for(i in bullets) 
    {
        bullets[i].move();
        if(bullets[i].outOfRange())
        {
            delete bullets[i];
        }
        else if (bullets[i].hasCollided())
        {
            delete bullets[i];
        }
        else if(bosshp > -1 && bullets[i].x + 13 >= boss.x && bullets[i].x <= boss.x + 200 && bullets[i].y + 13 >= boss.y && bullets[i].y <= boss.y + 75)
        {
            delete bullets[i];
            curscore += 10;
            bosshp--;
        }
    }
    bullets = bullets.filter(item => item !== undefined);
}

fonimg.onload = function() 
{
    drawStarfield();
    game();
}

function checkPos(mouseEvent)
{
    mouseX = mouseEvent.pageX - this.offsetLeft;
    mouseY = mouseEvent.pageY - this.offsetTop;
    //console.log(mouseX);
    //console.log(mouseY);
}

function game()
{
    update();
    render();
    requestAnimFrame(game);
}

function update()
{
    
    if(pcon == 0)
    {
        curscore = 0;
    }
    if(pcon == 1)
    {
        if(pcont == 2)
        {
            shoot();
        }
        
        if(ekills > 60 && bosshp == -1)
        {
            makeBoss();
            enemys.forEach(function(enemy, i)
            {
                delete enemys[i];
            });
            enemys = enemys.filter(item => item !== undefined);
        }
        if(bosshp > -1)
        { 
            bossmove();
        }
        pmove();
        emove();
        bmove();
        omove();
    }
    if(plph == 0 || bosshp == 0)
    {
        pcon = 2;
        document.getElementById('game').style.cursor = "default";
    }
    if(pcon == 2)
    {
        if (curscore > bestscore)
        {
            bestscore = curscore;
        }
        plph = 3;
        ekills = 0;
        bosshp = -1;
    }
}

//Рисует и анимирует задник
function drawStarfield() {
  context.drawImage(fonimg,starX,starY);
  context.drawImage(fonimg,starX2,starY);
  if (starX < -1279) {
    starX = 1280;
  }
  if (starX2 < -1279) {
    starX2 = 1280;
  }
  starX -= 1;
  starX2 -= 1;
}


function render()
{

    drawStarfield();
    
    if(pcon == 0)
    {
        context.font = 'bold 100px VT323';
        context.fillStyle = '#fff000';
        context.fillText('SELECT CONTROL:', width / 4 - 70, height / 3 + 30);
        context.fillStyle = '#ffffff';
        context.fillText('KEYBOARD+SPACE', width / 4 - 56, height / 3 + 175);
        context.fillText('ONLY MOUSE', width / 3 - 45, height / 3 + 275);
        context.font = 'bold 50px VT323';
        context.fillText("Best score: " + bestscore, 50, 50);
        context.fillStyle = '#ffffff';
    }
    if(pcon == 1)
    {
        for(i in enemys) enemys[i].draw();
        for(i in bullets) bullets[i].draw();
        for(i in obstacles) obstacles[i].draw();
        

        player.draw();
        context.fillStyle = '#ffffff';
        context.font = 'bold 50px VT323';
        context.fillText("score :" + curscore, 50, 50);
        if(bosshp > -1)
        {
            boss.draw();
        }
    }
    if(pcon == 2)
    {
        context.font = 'bold 200px VT323';
        context.fillStyle = '#fff000';
        context.fillText('GAME OVER', width / 5 - 100, height / 3 + 30);
        context.font = 'bold 50px VT323';
        context.fillText("Your score: " + curscore, 300, 325);
        context.fillText("Best score: " + bestscore, 300, 375);
        context.fillStyle = '#ffffff';
        context.font = 'bold 75px VT323';
        context.fillText('CONTINUE', 300, 475);
        context.fillText('MAIN MENU', 300, 555);
    }
    
}

var requestAnimFrame = (function()
{
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimatoinFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimatoinFrame ||
    function(callback)
    {
        window.setTimeout(callback, 1000 / 20);
    };
})();