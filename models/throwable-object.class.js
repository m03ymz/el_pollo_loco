/**
 * Represents a throwable object with animations for throwing and splashing.
 */
class ThrowableObject extends MovableObject {
    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    offset = {
        top: 7,
        left: 7,
        right: 7,
        bottom: 7
    };

    splash = false;

    /**
     * Creates an instance of ThrowableObject.
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     * @param {boolean} otherDirection - Direction of the throw.
     */
    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 70;
        this.width = 70;
        this.throw();
        this.animate();
    }

    /**
     * Initiates the throw action with sound and applies gravity.
     */
    throw() {
        throw_sound.currentTime = 0;
        throw_sound.volume = 0.5;
        throw_sound.play();
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (this.otherDirection == false) {
            this.x += 10;
            }
        }, 25);
        setInterval(() => {
            if (this.otherDirection == true) {
            this.x -= 10;
            }
        }, 25);
    }

    /**
     * Animates the throwable object with rotation images.
     */
    animate() {
        let id = setInterval(() => {
            this.playAnimation(this.IMAGES);
        
        if (this.splash) {
            clearInterval(id);
            this.animateSplash();
            this.splash = false;
        }
        }, 50);
    }

    /**
     * Animates the splash effect of the throwable object.
     */
    animateSplash() {
        let id = setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
            setTimeout(() => {
                clearInterval(id);
            }, 1000);
        }, 50);
    }
}