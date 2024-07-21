class EndbossAttack extends MovableObject {
    IMAGES = [
        'img/13_endboss_attack/1.png',
        'img/13_endboss_attack/2.png',
        'img/13_endboss_attack/3.png',
        'img/13_endboss_attack/4.png',
        'img/13_endboss_attack/5.png',
        'img/13_endboss_attack/6.png',
        'img/13_endboss_attack/7.png',
        'img/13_endboss_attack/8.png',
        'img/13_endboss_attack/9.png',
        'img/13_endboss_attack/10.png',
    ];
    
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0

    };
    constructor(x, y) {
        super().loadImage('img/13_endboss_attack/1.png');
        this.loadImages(this.IMAGES);
        // this.x = x;
        // this.y = y;
        // this.otherDirection = otherDirection;
        this.height = 100;
        this.width = 500;
        // this.x = 500;
        // this.y = 350;
        this.x = x;
        this.y = y;
        // this.attack();
        this.animate();
    }

    animate() {
        this.otherDirection = true;
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 75);
    }
}