class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = []; 
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    statusBarEndboss = new StatusBarEndboss();
    isDead = false;
    waterJet = new WaterJet();
    collectedObjects = [];
    firstEncounter = false;
    endbossAttacks = [];
    // endbossAttack = new EndbossAttack(this.level.enemies[this.level.enemies.length - 1].x, this.level.enemies[this.level.enemies.length - 1].y);
    lastHitTime = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.collectedBottles = [];
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCoinCollisions();
            this.checkCollisions();
            this.checkBottleCollisions();
            this.checkThrowObjects();
            this.checkCollisionsEndboss();
            this.checkCollisionsChicken();
            this.checkFirstEncounter();
            // this.checkEndbossAttack();
            this.checkEndbossAttackCollisions();
            this.checkWaterJetCollision();
        }, 50);
    }

    // checkEndbossAttack() {
    //     if (this.keyboard.F) {
    //         let endbossAttack = new EndbossAttack(this.level.enemies[this.level.enemies.length - 1].x - 325, this.level.enemies[this.level.enemies.length - 1].y + 250);
    //         this.endbossAttacks.push(endbossAttack);
    //     }
    // }

    checkFirstEncounter() {
        if (this.character.firstEncounter()) {
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss && !this.firstEncounter) {
                    // this.rooster_sound.play();
                    // // this.first_contact_endboss_sound.currentTime = 0;
                    // this.first_contact_endboss_sound.play();
                    background_sound.pause();
                    background_melody.pause();
                    rooster_sound.play();
                    rooster_sound.onended = () => {
                    first_contact_endboss_sound.volume = 0.3;
                    first_contact_endboss_sound.play();
                    setTimeout(() => {
                        first_contact_endboss_sound.pause();
                        first_contact_endboss_sound.currentTime = 0;
                        endfight_sound.loop = true;
                        endfight_sound.play();
                    }, 3000);
                };
                    enemy.firstEncounter = true;
                    this.firstEncounter = true;
                    setTimeout(() => {
                        enemy.activateWhenFirstEncounter();
                    }, 5000); 
                }
            });
        }
    }

    // checkThrowObjects() {
        
    //     if (this.keyboard.F && this.collectedBottles.length > 0) {
    //         this.collectedBottles.forEach(() => {
    //             let bottle = new ThrowableObject(this.character.x + 30, this.character.y + 100, this.character.otherDirection);
    //             this.throwableObjects.push(bottle);
    //         });
    //         this.collectedBottles.splice(0, 1);
    //         this.statusBarBottles.decreasePercentage(10);
    //     }
    // }

    checkThrowObjects() {
        if (this.keyboard.F && this.collectedBottles.length > 0 && !this.isThrowing) {
            this.isThrowing = true; 
            let bottle = new ThrowableObject(this.character.x + 30, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.collectedBottles.splice(0, 1);
            this.statusBarBottles.decreasePercentage(10);
            setTimeout(() => {
                this.isThrowing = false;
            }, 1000); 
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead) {
                // this.statusBar.setPercentage(this.character.energy);
                if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                    if (this.character.speedY < 0 && this.character.y + this.character.height < enemy.y + enemy.height + enemy.offset.top) {
                        enemy.isDead = true;
                        enemy.loadImages(enemy.IMAGES_DEAD);
                        // console.log("Bilder für totes Huhn geladen:", enemy.IMAGES_DEAD);
                        kill_chicken.currentTime = 0;
                        kill_chicken.volume = 0.4;
                        kill_chicken.play();
                    } else {
                    if (!this.character.isHurt()) {
                        scream_sound.volume = 0.3;
                        scream_sound.play();
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);

                        // Zielposition nach links oder rechts
                    let targetX;
                    if (this.character.otherDirection) {
                        // Wenn der Charakter nach links schaut, bewege ihn nach rechts
                        targetX = this.character.x + 100;
                    } else {
                        // Wenn der Charakter nach rechts schaut, bewege ihn nach links
                        targetX = this.character.x - 100;
                    }
                    
                    // Bewege den Charakter schrittweise zur Zielposition
                    let moveInterval = setInterval(() => {
                        // Schrittweite
                        let step = 7;
                    
                        if (this.character.otherDirection) {
                            // Bewege den Charakter nach rechts, wenn die andere Richtung wahr ist
                            if (this.character.x < targetX) {
                                this.character.x += step;
                            } else {
                                clearInterval(moveInterval); // Beende die Bewegung, wenn die Zielposition erreicht ist
                            }
                        } else {
                            // Bewege den Charakter nach links, wenn die andere Richtung falsch ist
                            if (this.character.x > targetX) {
                                this.character.x -= step;
                            } else {
                                clearInterval(moveInterval); // Beende die Bewegung, wenn die Zielposition erreicht ist
                            }
                        }
                    }, 10); // Ändere die Dauer zwischen den Schritten, um die Geschwindigkeit anzupassen
                    }
                    }
                }
            }
        });
        this.level.enemies.forEach((enemy) => {
        if ((enemy instanceof Chicken || enemy instanceof SmallChicken) && enemy.isDead) { 
            setTimeout(() => {
                const index = this.level.enemies.indexOf(enemy);
                if (index > -1) {
                    this.level.enemies.splice(index, 1);
                }
            }, 1500);
        }
    });
    }

    

    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                coin_sound.currentTime = 0;
                coin_sound.volume = 0.5;
                coin_sound.play();
                this.level.coins.splice(index, 1); 
                this.statusBarCoins.increasePercentage(3.6);
            }
        });
    }

    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                collect_bottle_sound.currentTime = 0;
                collect_bottle_sound.volume = 0.3;
                collect_bottle_sound.play();
                this.level.bottles.splice(index, 1); 
                this.statusBarBottles.increasePercentage(10);
                this.collectedBottles.push(index);
            }
        });
    }

    // checkCollisionsEndboss() {
    //     // Überprüfen, ob eine werfbare Flasche mit dem Endboss kollidiert
    //     this.throwableObjects.forEach((bottle) => {
    //         if (bottle.isColliding(this.level.enemies[this.level.enemies.length-1])) {
    //             this.level.enemies[this.level.enemies.length-1].hit(); // Endboss wird getroffen
    //             this.statusBarEndboss.setPercentage(this.level.enemies[this.level.enemies.length-1].energy); // Lebensanzeige des Endboss aktualisieren
    //             console.log('Collision with Endboss, energy ', this.level.enemies[this.level.enemies.length-1].energy); 
    //         }
    //     });

    //     // Überprüfen, ob der Charakter mit dem Endboss kollidiert
    // if (this.character.isColliding(this.level.enemies[this.level.enemies.length-1])) {
    //     this.statusBar.setPercentage(this.character.energy);
    //     this.character.hit(); // Der Charakter erhält Schaden, wenn er mit dem Endboss kollidiert
    //     console.log('Character collided with Endboss, energy ', this.character.energy);
    // }
    // }

    checkCollisionsEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(this.level.enemies[this.level.enemies.length-1])) {
                if (!this.level.enemies[this.level.enemies.length-1].isHurt()) {
                    this.level.enemies[this.level.enemies.length-1].hit(); 
                    bottle.splash = true;
                    // bottle.animateSplash();
                    endboss_scream_sound.currentTime = 0;
                    endboss_scream_sound.volume = 0.5;
                    endboss_scream_sound.play();
                    let endbossAttack;

                    // Füge die EndbossAttack nach 2 Sekunden hinzu
                    setTimeout(() => {
                        endbossAttack = new EndbossAttack(this.level.enemies[this.level.enemies.length - 1].x - 325, this.level.enemies[this.level.enemies.length - 1].y + 300);
                        this.endbossAttacks.push(endbossAttack);
                        sandstorm_sound.play();
                    }, 2600);
                    
                    // Entferne die EndbossAttack nach weiteren 0.5 Sekunden (insgesamt nach 2.5 Sekunden)
                    setTimeout(() => {
                        let index = this.endbossAttacks.indexOf(endbossAttack);
                        if (index !== -1) {
                            this.endbossAttacks.splice(index, 1);
                        }
                    }, 3400);
                    this.statusBarEndboss.setPercentage(this.level.enemies[this.level.enemies.length-1].energy); 
                    // console.log('Collision with Endboss, energy ', this.level.enemies[this.level.enemies.length-1].energy); 
                }
            }
        });
    
        if (this.character.isColliding(this.level.enemies[this.level.enemies.length-1])) {
        if (!this.character.isHurt()) {
            this.character.hit(); 
            scream_sound.volume = 0.3;
            scream_sound.play();
            rooster2_sound.currentTime = 0;
            rooster2_sound.play();
            this.statusBar.setPercentage(this.character.energy);
            // console.log('Character collided with Endboss, energy ', this.character.energy);
            // Zielposition nach links
            let targetX = this.character.x - 250;
                    
            // Bewege den Charakter schrittweise nach links
            let moveInterval = setInterval(() => {
                // Schrittweite
                let step = 7;
                // Wenn die aktuelle Position links von der Zielposition ist
                if (this.character.x > targetX) {
                    // Bewege den Charakter um 'step' Einheiten nach links
                    this.character.x -= step;
                } else {
                    // Wenn die Zielposition erreicht ist, beende die Bewegung
                    clearInterval(moveInterval);
                }
            }, 10); // Ändere die Dauer zwischen den Schritten, um die Geschwindigkeit anzupassen
        }
}
    }

    checkCollisionsChicken() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.slice(0, -1).forEach((enemy) => { 
                if (bottle.isColliding(enemy)) {
                    bottle.splash = true;
                    kill_chicken.currentTime = 0;
                    kill_chicken.volume = 0.4;
                    kill_chicken.play();
                    enemy.isDead = true; 
                    // console.log('Collision with Chicken, energy ', enemy.energy); 
                }
            });
        });
    }

    // checkEndbossAttackCollisions() {
    //     this.endbossAttacks.forEach((endbossAttack) => {
    //         if (this.character.isColliding(endbossAttack)) {
    //             if (!this.character.isHurt()) {
    //                 this.character.hit();
    //                 scream_sound.volume = 0.3;
    //                 scream_sound.play();
    //                 this.statusBar.setPercentage(this.character.energy);
    //             }
    //         }
    //     });
    // }

    checkEndbossAttackCollisions() {
        this.endbossAttacks.forEach((endbossAttack) => {
            if (this.character.isColliding(endbossAttack)) {
                if (!this.character.isHurt()) {
                    this.character.hit();
                    scream_sound.volume = 0.3;
                    scream_sound.play();
                    this.statusBar.setPercentage(this.character.energy);
                    
                    // Zielposition nach links
                    let targetX = this.character.x - 250;
                    
                    // Bewege den Charakter schrittweise nach links
                    let moveInterval = setInterval(() => {
                        // Schrittweite
                        let step = 7;
                        // Wenn die aktuelle Position links von der Zielposition ist
                        if (this.character.x > targetX) {
                            // Bewege den Charakter um 'step' Einheiten nach links
                            this.character.x -= step;
                        } else {
                            // Wenn die Zielposition erreicht ist, beende die Bewegung
                            clearInterval(moveInterval);
                        }
                    }, 10); // Ändere die Dauer zwischen den Schritten, um die Geschwindigkeit anzupassen
                }
            }
        });
    }
    

    // checkWaterJetCollision() {
    //     if (this.character.isColliding(this.waterJet) && this.character.energy < 100) {
    //         // Setze die Energie des Charakters auf 100 zurück
    //         this.character.energy = 100;
    //         // Aktualisiere die StatusBar, um die Energieänderung anzuzeigen
    //         this.statusBar.setPercentage(this.character.energy);
    //     }
    // }

    checkWaterJetCollision() {
        if (this.character.isColliding(this.waterJet) && this.character.energy < 100) {
            // Setze einen Timer, um die Energie langsam auf 100 zu erhöhen
            let increaseEnergyTimer = setInterval(() => {
                // Erhöhe die Energie des Charakters um einen kleinen Betrag
                this.character.energy += 1; // Ändern Sie die Inkrementierung nach Bedarf
                charge_sound.volume = 0.5;
                charge_sound.play();
    
                // Aktualisiere die StatusBar, um die Energieänderung anzuzeigen
                this.statusBar.setPercentage(this.character.energy);
    
                // Überprüfe, ob die Energie 100 erreicht hat
                if (this.character.energy >= 100) {
                    // Beende den Timer, wenn die Energie 100 erreicht hat
                    clearInterval(increaseEnergyTimer);
                }
            }, 100); // Ändern Sie das Intervall nach Bedarf (zum Beispiel 100 für alle 100 Millisekunden)
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.birds);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar); 
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles); 
        this.addToMap(this.statusBarEndboss);  
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.waterJet); 
        this.addToMap(this.character); 
        this.addObjectsToMap(this.level.coins);  
        this.addObjectsToMap(this.level.bottles);  
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.endbossAttacks);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o) 
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        } 
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}