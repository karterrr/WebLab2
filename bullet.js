class Bullet
{
    constructor(x, y, dx)
    {
        this.x = x;
        this.y = y;
        this.dx = dx;
    }
    draw()
    {
        var bimg = new Image();
        bimg.src = 'img/redb.png';
        context.drawImage(bimg, this.x, this.y, 13, 13);
    }
    move()
    {
        this.x += this.dx;
    }

    outOfRange()
    {
        return this.x > 900
    }

    hasHitItem(item)
    {
        return (this.x + 13 >= item.x && this.x <= item.x + 75) && (this.y + 13 >= item.y && this.y <= item.y + 75);
    }

    hasHitEnemy(enemy)
    {
        return this.hasHitItem(enemy);
    }

    hasCollided()
    {
        var self = this;
        var collided = false;
        enemys.forEach(function(enemy, i)
        {
            if(self.hasHitEnemy(enemy))
            {
                delete enemys[i];
                ecount--;
                ekills++;
                collided = true;
                curscore += 25;
            }
        });
        enemys = enemys.filter(item => item !== undefined);
    }
}