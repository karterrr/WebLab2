class Player
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
        /*var pimg = new Image();
        pimg.src = 'img/witch.gif';
        context.drawImage(pimg, this.x, this.y, 75, 75);*/
        context.drawImage(Img, this.x, this.y, 100, 85);
        context.fillStyle = "rgba(100,150,185,0)";
        context.fillRect(this.x + 75/2 + 3, this.y + 75/2, 10, 10);

    }
}