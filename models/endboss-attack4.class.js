/**
 * Represents an attack from the end boss.
 */
class EndbossAttack4 extends MovableObject {
    IMAGES = [
        'img/13_endboss_attack/3/1.png',
        'img/13_endboss_attack/3/2.png',
        'img/13_endboss_attack/3/3.png',
    ];

    IMAGES_EXPLOSION = [
        'img/13_endboss_attack/3/4.png',
        'img/13_endboss_attack/3/5.png',
        'img/13_endboss_attack/3/6.png',
        'img/13_endboss_attack/3/7.png',
        'img/13_endboss_attack/3/8.png',
        'img/13_endboss_attack/3/9.png',
        'img/13_endboss_attack/3/10.png'
    ];

    OFFSETS = [
        { top: 180, left: 180, right: 180, bottom: 180 }, 
        { top: 170, left: 170, right: 170, bottom: 170 }, 
        { top: 150, left: 150, right: 150, bottom: 150 }  
    ];

    ANIMATION_SEQUENCE = [0, 1, 2, 1]; 

    /**
     * Creates an instance of EndbossAttack.
     * @param {number} x - The x-coordinate of the attack.
     * @param {number} y - The y-coordinate of the attack.
     */
    constructor(x, y) {
        super().loadImage('img/13_endboss_attack/3/1.png');
        this.loadImages(this.IMAGES);
        this.height = 400;
        this.width = 400;
        this.x = x;
        this.y = y;
        this.currentFrame = 0; 
        this.animationSpeed = 200; 
        this.speed = 3.8;
        this.exploding = false; 
        this.offset = this.OFFSETS[0];
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
                if (this.x <= -320) {
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
            if (this.currentFrame < this.IMAGES_EXPLOSION.length) {
                this.playAnimation(this.IMAGES_EXPLOSION);
                this.currentFrame++;
            } else {
                clearInterval(this.animationInterval); 
                this.removeFromWorld(); 
            }
        } else {
            this.currentFrame = (this.currentFrame + 1) % this.ANIMATION_SEQUENCE.length;
            this.playAnimation(this.IMAGES);
        }
    }

    /**
     * Plays the animation by loading the current frame image.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        if (this.exploding) {
            this.loadImage(images[this.currentFrame]);
        } else {
            const sequenceFrame = this.ANIMATION_SEQUENCE[this.currentFrame];
            this.loadImage(images[sequenceFrame]);
            this.offset = this.OFFSETS[sequenceFrame];
        }
    }

    /**
     * Initiates the explosion effect and removes the attack from the world.
     */
    explode() {
        if (this.exploding) return; 
        this.exploding = true;
        this.currentFrame = 0;
        clearInterval(this.movementInterval); 
        this.updateAnimation(); 
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