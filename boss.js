class Boss
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
        var bossimg = new Image();
        bossimg.src = 'img/boss.png';
        context.drawImage(bossimg, this.x, this.y, 200, 200);
    }
    move()
    {
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
    }
}