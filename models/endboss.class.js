class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 55;

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png' 
    ];
    IMAGES_WALK = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png"
    ];
    IMAGES_ATTACK = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png"
    ];
    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png"
    ];
    offset = {
        top: 60,
        left: 25,
        right: 0,
        bottom: 20
    };
    energy = 100;
    firstEncounter = false;

    hadFirstContact = false;

    constructor(world){
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.world = world;
        this.x = 3000;
        this.speed = 10;
        this.animate();
    }

    activateWhenFirstEncounter() {
        if (this.firstEncounter) {
            this.startRunningToCharacter();
        }
    } 

    startRunningToCharacter() {
        if (this.x > 2600) {
            const interval = setInterval(() => {
                if (this.x <= 2600) {
                    clearInterval(interval); 
                } else {
                    this.playAnimation(this.IMAGES_WALK);
                    this.playAnimation(this.IMAGES_ATTACK);
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        this.moveLeft();
                    }, i * 200); 
                }
                }
            }, 100);
        }
    }   

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.handleDeath();        
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.speed += 0.3; 
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        this.moveLeft();
                    }, i * 200); 
                }
            } else {
                this.playAnimation(this.IMAGES_ATTACK);
            }   
        }, 200);
    }

    handleDeath() {
        endfight_sound.pause();
        this.playAnimation(this.IMAGES_DEAD);
        win_sound.play();
        win_sound.onended = function() {
            win_end_sound.loop = true;
            win_end_sound.play();
        };
        document.getElementById('overlay').style.display = "unset";
        document.getElementById('youWinImg').style.display = "unset";
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
        walking_sound.pause();
        snore_sound.pause();
        setTimeout(() => {
            document.getElementById(`restartButton`).style.display = "flex";
        }, 2000);
    }
}