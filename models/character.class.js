class Character extends MovableObject {

    height = 250;
    y = 80;
    speed = 15;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world;
    throwableBottle = null;
    throwableBottles = [];
    offset = {
        top: 120,
        left: 20,
        right: 20,
        bottom: 0
    };
    energy = 100;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }
    
    animate() {

        let idleTime = 0; 

        setInterval(() => {
            walking_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                walking_sound.volume = 0.5;
                walking_sound.play();
                idleTime = 0; 
            }

            if(this.world.keyboard.LEFT && this.x > -600) {
                this.moveLeft();
                this.otherDirection = true;
                walking_sound.volume = 0.5;
                walking_sound.play();
                idleTime = 0; 
            }

            if(this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                jump_sound.currentTime = 0;
                jump_sound.volume = 0.2;
                jump_sound.play();
                idleTime = 0; 
            }

            this.world.camera_x = -this.x + 118;
        }, 4000 / 60);
        
        
        // setInterval(() => {

        //     if (this.isDead()) {
        //         this.playAnimation(this.IMAGES_DEAD);
        //     } else if (this.isHurt()) {
        //         this.playAnimation(this.IMAGES_HURT);
        //     } else if (this.isAboveGround()) {
        //         this.playAnimation(this.IMAGES_JUMPING);
        //     } else {
        //         if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        //             this.playAnimation(this.IMAGES_WALKING);
        //         }
        //     }
        // }, 50);

        setInterval(() => {
            if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE) {
                idleTime += 150; 
            } else {
                idleTime = 0; 
            }
            if (idleTime >= 10000) { 
                this.playAnimation(this.IMAGES_LONG_IDLE);
                snore_sound.volume = 0.5;
                snore_sound.play();
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                snore_sound.pause();
                idleTime = 0;
                return;
            }
            } else {
                if (this.isDead()) {
                // this.playAnimation(this.IMAGES_DEAD);
                this.handleDeath();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if(!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE) {
                    this.playAnimation(this.IMAGES_IDLE);
                } else {
                    this.playAnimation(this.IMAGES_WALKING);
                    snore_sound.pause();
                }
            }
            }
        }, 150);
    }
    
    jump() {
        this.speedY = 30;
    }

    handleDeath() {
        background_sound.pause();
        background_melody.pause();
        endfight_sound.pause();
        this.playAnimation(this.IMAGES_DEAD);
        game_over_sound.play();
        game_over_sound.onended = function() {
            lose_end_sound.loop = true;
            lose_end_sound.play();
        };
        document.getElementById('overlay').style.display = "unset";
        document.getElementById('gameOverImg').style.display = "unset";
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
        walking_sound.pause();
        snore_sound.pause();
        setTimeout(() => {
            document.getElementById(`restartButton`).style.display = "flex";
        }, 2000);
    }   
}