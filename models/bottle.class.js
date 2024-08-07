/**
 * Represents a bottle object in the game.
 */
class Bottle extends MovableObject {
    y = 360;
    height = 100;
    width = 100;
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    offset = {
        top: 14,
        left: 29,
        right: 16,
        bottom: 10
    };

    /**
     * Creates an instance of Bottle.
     * @param {number} x - The initial x-coordinate of the bottle.
     */
    constructor(x) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.animate();
    }

    /**
     * Animates the bottle by playing its animation sequence.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 600);
    }
}