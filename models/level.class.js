class Level {
    enemies;
    cloud;
    backgroundObjects;
    level_end_x = 2420;
    coins;
    bottles;
    birds;

    /**
     * Creates an instance of Level.
     * @param {Array<Enemy>} enemies - The list of enemies in the level.
     * @param {Array<Cloud>} clouds - The list of clouds in the level.
     * @param {Array<BackgroundObject>} backgroundObjects - The list of background objects in the level.
     * @param {Array<Bird>} birds - The list of birds in the level.
     * @param {Array<Coin>} coins - The list of coins in the level.
     * @param {Array<Bottle>} bottles - The list of bottles in the level.
     */
    constructor(enemies, clouds, backgroundObjects, birds, coins, bottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.birds = birds;
        this.coins = this.setupCoins();
        this.bottles = this.setupBottles();
    }

    /**
     * Sets up the fixed and random coins for the level.
     * @returns {Array<Coin>} The list of coin objects in the level.
     */
    setupCoins() {
        const coins = [];
        const fixedCoins = [
            {x: 360, y: 160}, {x: 400, y: 160}, {x: 440, y: 160}, {x: 480, y: 160}, {x: 520, y: 160},
            {x: 400, y: 125}, {x: 400, y: 195}, {x: 440, y: 125}, {x: 440, y: 195}, {x: 440, y: 90},
            {x: 440, y: 230}, {x: 560, y: 160}, {x: 600, y: 160}, {x: -350, y: 160}, {x: -300, y: 160},
            {x: -250, y: 160}, {x: -300, y: 110}, {x: -300, y: 210}
        ];

        fixedCoins.forEach(coord => {
            const coin = new Coin();
            coin.x = coord.x;
            coin.y = coord.y;
            coins.push(coin);
        });

        this.generateRandomCoins(coins);
        return coins;
    }

    /**
     * Generates and adds random coins to the list.
     * @param {Array<Coin>} coins - The list of coin objects to add to.
     */
    generateRandomCoins(coins) {
        for (let i = 0; i < 10; i++) {
            const coin = new Coin();
            coin.x = 900 + Math.random() * 1500; 
            coin.y = 100 + Math.random() * 200; 
            coins.push(coin);
        }
    }

    /**
     * Sets up the fixed and random bottles for the level.
     * @returns {Array<Bottle>} The list of bottle objects in the level.
     */
    setupBottles() {
        const bottles = [];
        const fixedBottles = [
            {x: -450, y: 340}, {x: -400, y: 340}, {x: -350, y: 340}
        ];

        fixedBottles.forEach(coord => {
            const bottle = new Bottle();
            bottle.x = coord.x;
            bottle.y = coord.y;
            bottles.push(bottle);
        });
        
        this.generateRandomBottles(bottles);
        return bottles;
    }

    /**
     * Generates and adds random bottles to the list.
     * @param {Array<Bottle>} bottles - The list of bottle objects to add to.
     */
    generateRandomBottles(bottles) {
        for (let i = 0; i < 7; i++) {
            const bottle = new Bottle();
            bottle.x = 300 + Math.random() * 2000; 
            bottle.y = 340; 
            bottles.push(bottle);
        }
    }
}