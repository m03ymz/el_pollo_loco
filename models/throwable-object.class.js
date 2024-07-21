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

    // animateSplash() {
    //     setInterval(() => {
    //         this.playAnimation(this.IMAGES_SPLASH);
    //     }, 100);
    // }

    animateSplash() {
        let id = setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
            setTimeout(() => {
                clearInterval(id); // Das Intervall nach dem ersten Durchlauf stoppen
            }, 1000);
        }, 50);
    }
}