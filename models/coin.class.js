class Coin extends MovableObject {
    y = 150;
    height = 100;
    width = 100;
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    offset = {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30
    };

    constructor(x) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);

        // this.x = 500 + Math.random() * 500;
        this.x = x;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 600);
    }



}