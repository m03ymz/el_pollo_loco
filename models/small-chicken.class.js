class SmallChicken extends MovableObject {
    y = 380;
    height = 55;
    width = 70;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    isDead = false;

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = x + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();   
            }
        }, 1000 / 60);
    
        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 200);
    }

    // checkCollisionWithCharacter(character) {
    //     if (!this.isDead && this.isColliding(character)) {
    //         console.log("Kollision mit Huhn");
    //         // Überprüfen, ob der Charakter von oben auf das Huhn fällt
    //         if (character.speedY < 0 && character.y + character.height < this.y + this.height + this.offset.top) {
    //             this.isDead = true;
    //             this.loadImages(this.IMAGES_DEAD); // Lade das Bild für "toten" Huhn
    //             console.log("Bilder für totes Huhn geladen:", this.IMAGES_DEAD);
    //             this.kill_chicken.volume = 0.01;
    //             this.kill_chicken.currentTime = 0;
    //             this.kill_chicken.play();
    //             // Weitere Aktionen, die du bei der Kollision ausführen möchtest
    //             // this.draw(this.world.ctx);
    //         } else {
    //             // Füge hier den Schaden hinzu, den der Charakter vom Huhn erleidet
    //             // this.character.hit();
    //         }
    //     }
    // }












}
