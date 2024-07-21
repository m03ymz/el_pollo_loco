class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    speed = 0.15;

    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        
        this.x = x;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.CloudMoveLeft(); 
        }, 25);
    }

    CloudMoveLeft() {
        this.x -= this.speed; 
        if (this.x + this.width < -700) {
            this.x = 3000;
        }
    }
}

