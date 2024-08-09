/**
 * Represents a movable object with basic physics and collision detection.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    hurt = false;

    /**
     * Applies gravity to the object, affecting its vertical movement.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    // isColliding(mo) {
    //     return  this.x + this.width > mo.x &&
    //             this.y + this.height > mo.y &&
    //             this.x < mo.x &&
    //             this.y < mo.y + mo.height;
    // }

    /**
     * Checks for collision with another movable object.
     * @param {MovableObject} mo - The other object to check collision with.
     * @returns {boolean} True if colliding, otherwise false.
     */
    isColliding(mo) {
        return  this.x + this.width - this.offset.right > mo.x + mo.offset.left && 
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
                this.x + this.offset.left < mo.x + mo.width - mo.offset.right && 
                this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Checks for collision on the right side with another movable object.
     * @param {MovableObject} mo - The other object to check collision with.
     * @returns {boolean} True if colliding on the right, otherwise false.
     */
    isCollidingRight(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
               this.x + this.width - this.offset.right < mo.x + mo.width - mo.offset.left &&
               this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
               this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces the object's energy and records the hit time.
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is currently hurt based on the time since the last hit.
     * @returns {boolean} True if hurt, otherwise false.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        this.hurt = timePassed < 1.1;
        return this.hurt;
    }

    /**
     * Checks if the end boss was hurt within the last 2.2 seconds.
     * @returns {boolean} True if the end boss was recently hurt, otherwise false.
     */
    isEndbossHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        this.hurt = timePassed < 2.2;
        return this.hurt;
    }

    /**
     * Checks if the object is dead (energy is zero).
     * @returns {boolean} True if dead, otherwise false.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Updates the object's image based on the animation frames.
     * @param {Array<string>} images - Array of image paths for animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Checks if the object has encountered a specific position.
     * @returns {boolean} True if encountered, otherwise false.
     */
    firstEncounter() {
        return this.x + this.width > 2400;
    }
}