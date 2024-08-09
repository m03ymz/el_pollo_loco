/**
 * Represents an attack from the end boss.
 */
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
        'img/13_endboss_attack/10.png'
    ];

    OFFSETS = [
        { top: 50, left: 200, right: 200, bottom: 0 },  
        { top: 50, left: 200, right: 200, bottom: 0 },  
        { top: 50, left: 140, right: 140, bottom: 0 },  
        { top: 50, left: 60, right: 60, bottom: 0 },   
        { top: 40, left: 20, right: 20, bottom: 0 },   
        { top: 20, left: 10, right: 10, bottom: 0 },   
        { top: 20, left: 0, right: 0, bottom: 0 },   
        { top: 10, left: 0, right: 0, bottom: 0 },   
        { top: 10, left: 15, right: 15, bottom: 0 },   
        { top: 10, left: 100, right: 100, bottom: 0 }    
    ];

    /**
     * Creates an instance of EndbossAttack.
     * @param {number} x - The x-coordinate of the attack.
     * @param {number} y - The y-coordinate of the attack.
     */
    constructor(x, y) {
        super().loadImage('img/13_endboss_attack/1.png');
        this.loadImages(this.IMAGES);
        this.height = 100;
        this.width = 500;
        this.x = x;
        this.y = y;
        this.offset = this.OFFSETS[0];
        this.animate();
    }

    /**
     * Starts the animation of the attack.
     */
    animate() {
        this.otherDirection = true;
        let currentImageIndex = 0;
        setInterval(() => {
            this.playAnimation([this.IMAGES[currentImageIndex]]);
            const offset = this.OFFSETS[currentImageIndex];
            this.offset.top = offset.top;
            this.offset.left = offset.left;
            this.offset.right = offset.right;
            this.offset.bottom = offset.bottom;
            currentImageIndex = (currentImageIndex + 1) % this.IMAGES.length;
        }, 75);
    }
}