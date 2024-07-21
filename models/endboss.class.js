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

    hadFirstContact = false; // Variable zur Verfolgung, ob der Spieler den Endboss zum ersten Mal erreicht hat

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


    // animate() {
    //     setInterval(() => {
    //         if (this.isDead()) {
    //             this.handleDeath();        
    //         } else if (this.isHurt()) {
    //             this.playAnimation(this.IMAGES_HURT);
    //         } else {
    //             this.playAnimation(this.IMAGES_ALERT);
    //         }   
    //     }, 200);
    // }

    activateWhenFirstEncounter() {
        if (this.firstEncounter) {
            this.startRunningToCharacter();
        }
    }

    // startRunningToCharacter() {
    //     if (this.x > 2500) {
    //         // Bewege den Endboss nach links bis auf X 2500
    //         const interval = setInterval(() => {
    //             if (this.x <= 2500) {
    //                 clearInterval(interval); // Stoppe das Intervall, wenn der Endboss X 2500 erreicht hat
    //             } else {
    //                 this.moveLeft(); // Bewege den Endboss nach links
    //             }
    //         }, 200);
    //     }
    // }   

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
        // setTimeout(() => {
        //     this.end_sound.loop = true;
        //     this.end_sound.play();
        // }, 2000);
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

    // animate() {
    //     let hurtAnimationPlayed = false; // Variable, um den Zustand der Hurt-Animation zu verfolgen
    //     let walkInterval; // Intervall für die Walk-Animation
    
    //     setInterval(() => {
    //         if (this.isDead()) {
    //             // this.playAnimation(this.IMAGES_DEAD); 
    //             this.handleDeath();       
    //         } else if (this.isHurt() && !hurtAnimationPlayed) {
    //             this.playAnimation(this.IMAGES_HURT);
    //             hurtAnimationPlayed = true; // Setzen Sie die Variable auf true, um anzuzeigen, dass die Hurt-Animation abgespielt wurde
    //             clearInterval(walkInterval); // Stoppen Sie die Walk-Animation, falls sie läuft
    //         } else if (hurtAnimationPlayed) {
    //             this.playAnimation(this.IMAGES_WALK); // Nach dem Hurt wird die Walk-Animation abgespielt
    //             if (!walkInterval) { // Starten Sie die Walk-Animation nur, wenn sie nicht bereits läuft
    //                 walkInterval = setInterval(() => {
    //                     this.moveLeft(); // Bewegen Sie den Endboss nach links
    //                 }, 1000 / 60);
    //             }
    //         } else {
    //             this.playAnimation(this.IMAGES_ALERT); // Vor dem Hurt wird die Alert-Animation abgespielt
    //         }   
    //     }, 200);
    // }
}