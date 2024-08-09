/**
 * Manages the game world, including character interactions, level elements, and game state.
 */
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
    lastHitTime = 0;
    hitCount = 0;

    /**
     * Creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.collectedBottles = [];
    }

    /**
     * Sets up the world by associating the character with the world.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the game loop, checking for collisions and updating game state.
     */
    run() {
        setInterval(() => {
            this.checkCoinCollision();
            this.checkChickenCollision();
            this.checkBottleCollision();
            this.checkThrowObjects();
            this.checkBottleCollisionEndboss();
            this.checkBottleCollisionChicken();
            this.checkFirstEncounter();
            this.checkEndbossCollision();
            this.checkEndbossAttackCollision();
            this.checkWaterJetCollision();
        }, 50);
    }

    /**
     * Checks if the character has encountered the endboss for the first time.
     */
    checkFirstEncounter() {
        if (this.character.firstEncounter()) {
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss && !this.firstEncounter) {
                this.playEndbossMelody();
                    enemy.firstEncounter = true;
                    this.firstEncounter = true;
                    setTimeout(() => {
                        enemy.activateWhenFirstEncounter();
                    }, 5000); 
                }
            });
        }
    }

    /**
     * Plays the endboss encounter melody and sound effects.
     */
    playEndbossMelody() {
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
    }

    /**
     * Checks if the player is throwing a bottle and processes it.
     */
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

    /**
     * Checks for collisions between the character and enemies, handling hits and enemy deaths.
     */
    checkChickenCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead) {
                if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                    if (this.character.speedY < 0 && this.character.y + this.character.height < enemy.y + enemy.height + enemy.offset.top) {
                        enemy.isDead = true;
                        enemy.loadImages(enemy.IMAGES_DEAD);
                        kill_chicken.currentTime = 0;
                        kill_chicken.volume = 0.4;
                        kill_chicken.play();
                    } else {
                    if (!this.character.isHurt()) {
                        scream_sound.volume = 0.3;
                        scream_sound.play();
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                        this.knockback(enemy);
                    }
                    }
                }
            }
        });
        this.removeDeadEnemy();
    }

    /**
     * Applies a knockback effect to the character when hit by an enemy.
     * @param {Enemy} enemy - The enemy causing the knockback effect.
     */
    knockback(enemy) {
        let targetX;
        if (this.character.otherDirection) {
            if (this.character.isCollidingRight(enemy)) {
                targetX = this.character.x - 100;
            } else {
                targetX = this.character.x + 100;
            }
        } else {
                targetX = this.character.x - 100;
        }
        this.knockbackMoveInterval(targetX);
    }

    /**
     * Moves the character to a target position with a knockback effect.
     * @param {number} targetX - The target x-coordinate for the knockback effect.
     */
    knockbackMoveInterval(targetX) {
        let moveInterval = setInterval(() => {
        let step = 7; 
        if (Math.abs(this.character.x - targetX) > step) { 
            if (this.character.x < targetX) {
                this.character.x += step;
            } else if (this.character.x > targetX) {
                this.character.x -= step;
            }
        } else {
            this.character.x = targetX;
            clearInterval(moveInterval);
        }
        }, 10);
    }

    /**
     * Removes dead enemies from the level.
     */
    removeDeadEnemy() {
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

    /**
     * Checks for collisions between the character and coins, updating the score and removing collected coins.
     */
    checkCoinCollision() {
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

    /**
     * Checks for collisions between the character and bottles, updating the inventory and removing collected bottles.
     */
    checkBottleCollision() {
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

    /**
     * Checks for collisions between throwable objects and the endboss, applying damage and handling hits.
     */
    checkBottleCollisionEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(this.level.enemies[this.level.enemies.length-1])) {
                if (!this.level.enemies[this.level.enemies.length-1].isEndbossHurt()) {
                    this.level.enemies[this.level.enemies.length-1].hit();
                    bottle.splash = true;
                    this.statusBarEndboss.setPercentage(this.level.enemies[this.level.enemies.length-1].energy);
                    throw_hit_sound.currentTime = 0;
                    throw_hit_sound.volume = 0.9;
                    throw_hit_sound.play();
                    endboss_scream_sound.currentTime = 0;
                    endboss_scream_sound.volume = 0.5;
                    setTimeout(() => {
                        endboss_scream_sound.play();
                    }, 200);
                    this.animateEndbossAttack();    
                    this.hitCount++;
                    if (this.hitCount === 1) {
                        this.animateEndbossAttack2();
                    } else if (this.hitCount === 2) {
                        this.animateEndbossAttack3();
                    } else if (this.hitCount === 3) {
                        this.animateEndbossAttack4();
                    } else {
                        this.animateEndbossAttack5();
                    }
                }
            }
        });
    }

    /**
     * Animates the endboss attack 1 with sound effects.
     */
    animateEndbossAttack() {
        let endbossAttack;
        setTimeout(() => {
            endbossAttack = new EndbossAttack(this.level.enemies[this.level.enemies.length - 1].x - 325, this.level.enemies[this.level.enemies.length - 1].y + 300);
            this.endbossAttacks.push(endbossAttack);
            sandstorm_sound.play();
        }, 2100);
        setTimeout(() => {
            let index = this.endbossAttacks.indexOf(endbossAttack);
            if (index !== -1) {
                this.endbossAttacks.splice(index, 1);
            }
        }, 2900);
    }

    /**
     * Animates the endboss attack 2 with sound effects.
     */
    animateEndbossAttack2() {
        let endbossAttack;
        setTimeout(() => {
            endbossAttack = new EndbossAttack2(
                this.level.enemies[this.level.enemies.length - 1].x - 200,
                this.level.enemies[this.level.enemies.length - 1].y + 50
            );
            this.endbossAttacks.push(endbossAttack);
            sandstorm_sound.play();
        }, 2200);
    }

    /**
     * Animates the endboss attack 3 with sound effects.
     */
    animateEndbossAttack3() {
        let endbossAttack;
        setTimeout(() => {
            endbossAttack = new EndbossAttack3(
                this.level.enemies[this.level.enemies.length - 1].x - 200,
                this.level.enemies[this.level.enemies.length - 1].y + 120
            );
            this.endbossAttacks.push(endbossAttack);
            sandstorm_sound.play();
        }, 2200);
    }

    /**
     * Animates the endboss attack 4 with sound effects.
     */
    animateEndbossAttack4() {
        let endbossAttack;
        setTimeout(() => {
            endbossAttack = new EndbossAttack4(
                this.level.enemies[this.level.enemies.length - 1].x - 200,
                this.level.enemies[this.level.enemies.length - 1].y + 120
            );
            this.endbossAttacks.push(endbossAttack);
            sandstorm_sound.play();
        }, 2200);
    }

    /**
     * Animates the endboss attack 5 with sound effects.
     */
    animateEndbossAttack5() {
        let endbossAttack;
        setTimeout(() => {
            endbossAttack = new EndbossAttack5(
                this.level.enemies[this.level.enemies.length - 1].x - 200,
                this.level.enemies[this.level.enemies.length - 1].y + 120
            );
            this.endbossAttacks.push(endbossAttack);
            sandstorm_sound.play();
        }, 2200);
    }

    /**
     * Checks for collisions between the character and the endboss, handling damage and knockback effects.
     */
    checkEndbossCollision() {
        if (this.character.isColliding(this.level.enemies[this.level.enemies.length-1])) {
            if (!this.character.isHurt()) {
                this.character.hit(); 
                scream_sound.volume = 0.3;
                scream_sound.play();
                rooster2_sound.currentTime = 0;
                rooster2_sound.play();
                this.statusBar.setPercentage(this.character.energy);
                this.knockbackEndbossHit();
                // this.knockbackEndboss(Endboss);
            }
        }
    }

    /**
     * Checks for collisions between the character and endboss attacks, handling damage and knockback effects.
     */
    checkEndbossAttackCollision() {
        this.endbossAttacks.forEach((endbossAttack) => {
            if (this.character.isColliding(endbossAttack)) {
                if (!this.character.isHurt()) {
                    this.character.hit();
                    explosion_sound.volume = 0.5;
                    explosion_sound.play();
                    setTimeout(() => {
                        scream_sound.volume = 0.7;
                        scream_sound.play();
                    }, 500);
                    this.statusBar.setPercentage(this.character.energy);
                    this.knockbackEndboss(endbossAttack);
                    endbossAttack.explode();
                }
            }
        });
    }

    /**
     * Applies a knockback effect to the character when hit by the endboss.
     */
     knockbackEndbossHit() {
         let targetX = this.character.x - 250;
         let moveInterval = setInterval(() => {
             let step = 7;
             if (this.character.x > targetX) {
                 this.character.x -= step;
             } else {
                 clearInterval(moveInterval);
             }
         }, 10);
     }

    /**
     * Applies a knockback effect to the character when hit by an enemy.
     * @param {EndbossAttack} endbossAttack - The enemy causing the knockback effect.
     */
    knockbackEndboss(endbossAttack) {
        let targetX;
        if (this.character.otherDirection) {
            if (this.character.isCollidingRight(endbossAttack)) {
                targetX = this.character.x - 250;
            } else {
                targetX = this.character.x + 100;
            }
        } else {
                targetX = this.character.x - 250;
        }
        this.knockbackMoveInterval(targetX);
    }

    /**
     * Moves the character to a target position with a knockback effect.
     * @param {number} targetX - The target x-coordinate for the knockback effect.
     */
    knockbackMoveInterval(targetX) {
        let moveInterval = setInterval(() => {
        let step = 7; 
        if (Math.abs(this.character.x - targetX) > step) { 
            if (this.character.x < targetX) {
                this.character.x += step;
            } else if (this.character.x > targetX) {
                this.character.x -= step;
            }
        } else {
            this.character.x = targetX;
            clearInterval(moveInterval);
        }
        }, 10);
    }

    /**
     * Checks for collisions between throwable objects and chickens, applying damage and handling deaths.
     */
    checkBottleCollisionChicken() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.slice(0, -1).forEach((enemy) => { 
                if (bottle.isColliding(enemy)) {
                    bottle.splash = true;
                    throw_hit_sound.currentTime = 0;
                    throw_hit_sound.volume = 0.9;
                    throw_hit_sound.play();
                    kill_chicken.currentTime = 0;
                    kill_chicken.volume = 0.4;
                    setTimeout(() => {
                        kill_chicken.play();
                    }, 200);
                    enemy.isDead = true; 
                }
            });
        });
    }

    /**
     * Checks for collisions between the character and the water jet, gradually increasing the character's energy.
     */
    checkWaterJetCollision() {
        if (this.character.isColliding(this.waterJet) && this.character.energy < 100) {
            let increaseEnergyTimer = setInterval(() => {
                this.character.energy += 1; 
                charge_sound.volume = 0.5;
                charge_sound.play();
                this.statusBar.setPercentage(this.character.energy);
                if (this.character.energy >= 100) {
                    clearInterval(increaseEnergyTimer);
                }
            }, 100); 
        }
    }

    /**
     * Clears and redraws the game world.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addBackgroundObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.addStatusBars();  
        this.ctx.translate(this.camera_x, 0);
        this.addGameElements();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /**
     * Adds background objects to the map.
     */
    addBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.birds);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * Adds status bars to the map.
     */
    addStatusBars() {
        this.addToMap(this.statusBar); 
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles); 
        this.addToMap(this.statusBarEndboss);
    }

    /**
     * Adds game elements to the map.
     */
    addGameElements() {
        this.addToMap(this.waterJet); 
        this.addToMap(this.character); 
        this.addObjectsToMap(this.level.coins);  
        this.addObjectsToMap(this.level.bottles);  
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.endbossAttacks);
    }

    /**
     * Adds a list of objects to the map.
     * @param {Object[]} objects - The objects to add.
     */
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o) 
        });
    }

    /**
     * Adds a single object to the map and handles its drawing.
     * @param {Drawable} mo - The object to add.
     */
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

    /**
     * Flips the image horizontally for objects facing the other direction.
     * @param {Drawable} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips the image back to the original direction after drawing.
     * @param {Drawable} mo - The object to flip back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}