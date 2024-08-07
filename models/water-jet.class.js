/**
 * Represents a water jet with animation.
 */
class WaterJet extends MovableObject {
    y = 70;
    width = 400;
    height = 400;

    IMAGES = [
        'img/11_water/water90000.png',
        'img/11_water/water90000.png',
        'img/11_water/water90001.png',
        'img/11_water/water90002.png',
        'img/11_water/water90003.png',
        'img/11_water/water90004.png',
        'img/11_water/water90005.png',
        'img/11_water/water90006.png',
        'img/11_water/water90007.png',
        'img/11_water/water90008.png',
        'img/11_water/water90009.png',
        'img/11_water/water90010.png',
        'img/11_water/water90011.png',
        'img/11_water/water90012.png',
        'img/11_water/water90013.png',
        'img/11_water/water90014.png',
        'img/11_water/water90015.png',
        'img/11_water/water90016.png',
        'img/11_water/water90017.png',
        'img/11_water/water90018.png',
        'img/11_water/water90019.png',
        'img/11_water/water90020.png',
        'img/11_water/water90021.png',
        'img/11_water/water90022.png',
        'img/11_water/water90023.png',
        'img/11_water/water90024.png',
        'img/11_water/water90025.png',
        'img/11_water/water90026.png',
        'img/11_water/water90027.png',
        'img/11_water/water90028.png',
        'img/11_water/water90029.png',
        'img/11_water/water90030.png',
        'img/11_water/water90031.png',
        'img/11_water/water90032.png',
        'img/11_water/water90033.png',
        'img/11_water/water90034.png',
        'img/11_water/water90035.png',
        'img/11_water/water90036.png',
        'img/11_water/water90037.png',
        'img/11_water/water90038.png',
        'img/11_water/water90039.png',
        'img/11_water/water90040.png'
    ];

    /**
     * Creates an instance of WaterJet.
     * @param {number} x - The x-coordinate of the water jet.
     */
    constructor(x) {
        super().loadImage('img/11_water/water90000.png');
        this.loadImages(this.IMAGES);
        this.x = -560;
        this.animate();
    }

    /**
     * Animates the water jet using a sequence of images.
     */
    animate() {
        setInterval(() => {
                this.playAnimation(this.IMAGES);
        }, 25);
    }
}