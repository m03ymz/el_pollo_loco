/**
 * Represents a cloud in the game background.
 */
class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    speed = 0.15;

    /**
     * Creates an instance of Cloud.
     * @param {number} x - Initial x position of the cloud.
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        
        this.x = x;
        this.animate();
    }

    /**
     * Handles the cloud's movement and repositioning.
     */
    animate(){
        setInterval(() => {
            this.CloudMoveLeft(); 
        }, 25);
    }

    /**
     * Moves the cloud to the left and resets its position when it goes off-screen.
     */
    CloudMoveLeft() {
        this.x -= this.speed; 
        if (this.x + this.width < -700) {
            this.x = 3000;
        }
    }
}

