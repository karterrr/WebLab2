class Enemy
{
    constructor(x, y, dx, dy)
    {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }
    draw()
    {
        var enemimg = new Image();
        enemimg.src = 'img/enemy.png';
        context.drawImage(enemimg, this.x, this.y, 75, 75);
    }
    move()
    {
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
    }
}