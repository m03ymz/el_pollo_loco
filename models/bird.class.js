class Bird extends MovableObject {
    y = 20;
    width = 50;
    height = 50;
    speed = 0.4;

    IMAGES = [
        'img/10_bird/Vulture_walk1.png',
        'img/10_bird/Vulture_walk2.png',
        'img/10_bird/Vulture_walk3.png',
        'img/10_bird/Vulture_walk4.png',
    ];

    constructor(x) {
        super().loadImage('img/10_bird/Vulture_walk1.png');
        this.loadImages(this.IMAGES);
        this.x = x + Math.random() * 150;
        this.speed = this.speed + Math.random() * 0.2;
        this.animate();
    }

    animate(){
    setInterval(() => {
        this.BirdMoveLeft(); 
    }, 25);
    setInterval(() => {
        this.playAnimation(this.IMAGES);
    }, 150);
}

    BirdMoveLeft() {
        this.x -= this.speed; 
        if (this.x + this.width < -700) {
            this.x = 3000;
        }
    }
}