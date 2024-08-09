/**
 * Represents an attack from the end boss.
 */
class EndbossAttack2 extends MovableObject {
    IMAGES = [
        'img/13_endboss_attack/2/1.png',
        'img/13_endboss_attack/2/2.png',
        'img/13_endboss_attack/2/3.png',
        'img/13_endboss_attack/2/4.png',
        'img/13_endboss_attack/2/5.png',
        'img/13_endboss_attack/2/6.png',
        'img/13_endboss_attack/2/7.png',
        'img/13_endboss_attack/2/8.png',
        'img/13_endboss_attack/2/9.png'
    ];

    IMAGES_EXPLOSION = [
        'img/13_endboss_attack/2/10.png',
        'img/13_endboss_attack/2/11.png',
        'img/13_endboss_attack/2/12.png',
        'img/13_endboss_attack/2/13.png',
        'img/13_endboss_attack/2/14.png',
        'img/13_endboss_attack/2/15.png',
        'img/13_endboss_attack/2/16.png'
    ];
    
    offset = {
        top: 210,
        left: 210,
        right: 210,
        bottom: 210
    };

    /**
     * Creates an instance of EndbossAttack.
     * @param {number} x - The x-coordinate of the attack.
     * @param {number} y - The y-coordinate of the attack.
     */
    constructor(x, y) {
        super().loadImage('img/13_endboss_attack/2/1.png');
        this.loadImages(this.IMAGES);
        this.height = 500;
        this.width = 500;
        this.x = x;
        this.y = y;
        this.currentFrame = 0; // Start at the first frame
        this.animationSpeed = 175; // Frame interval in milliseconds
        this.speed = 3.8;
        this.exploding = false; // Flag, um Explosion zu verfolgen
        this.animate();
    }


    /**
     * Starts the animation and movement intervals for the attack.
     */
    animate() {
        this.animationInterval = setInterval(() => {
            this.updateAnimation();
        }, this.animationSpeed);

        this.movementInterval = setInterval(() => {
            if (this.x > -this.width) { 
                this.moveLeft();
                if (this.x <= -460) {
                    this.explode();
                }
            }
        }, 1000 / 60);
    }

    /**
     * Updates the animation frame based on whether the attack is exploding or not.
     */
    updateAnimation() {
        if (this.exploding) {
            if (this.currentFrame < this.IMAGES_EXPLOSION.length - 1) {
                this.currentFrame++;
            } else {
                clearInterval(this.animationInterval);
            }
            this.playAnimation(this.IMAGES_EXPLOSION);
        } else {
            if (this.currentFrame < this.IMAGES.length - 1) {
                this.currentFrame++;
            } else {
                this.currentFrame = this.IMAGES.length - 1; 
            }
            this.playAnimation(this.IMAGES);
        }
    }

    /**
     * Plays the animation by loading the current frame image.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        this.loadImage(images[this.currentFrame]);
    }

    /**
     * Initiates the explosion effect and removes the attack from the world.
     */
    explode() {
        this.exploding = true;
        this.currentFrame = 0;
        clearInterval(this.movementInterval);
        this.updateAnimation();
        setTimeout(() => {
            this.removeFromWorld();
        }, this.IMAGES_EXPLOSION.length * this.animationSpeed);
    }

    /**
     * Removes this attack instance from the world's endbossAttacks array.
     */
    removeFromWorld() {
        const index = world.endbossAttacks.indexOf(this);
        if (index > -1) {
            world.endbossAttacks.splice(index, 1);
        }
    }
}