class Level {
    enemies;
    cloud;
    backgroundObjects;
    level_end_x = 2420;
    coins;
    bottles;
    birds;

    constructor(enemies, clouds, backgroundObjects, birds, coins, bottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.birds = birds;
        this.coins = this.setupCoins();
        this.bottles = this.setupBottles();
    }

    // setupCoins() {
    //     const coins = [];
    
    //     const coin1 = new Coin();
    //     coin1.x = 360;
    //     coin1.y = 160;
    //     coins.push(coin1);
        
    //     const coin2 = new Coin();
    //     coin2.x = 400;
    //     coin2.y = 160;
    //     coins.push(coin2);
        
    //     const coin3 = new Coin();
    //     coin3.x = 440;
    //     coin3.y = 160;
    //     coins.push(coin3);
        
    //     const coin4 = new Coin();
    //     coin4.x = 480;
    //     coin4.y = 160;
    //     coins.push(coin4);
        
    //     const coin5 = new Coin();
    //     coin5.x = 520;
    //     coin5.y = 160;
    //     coins.push(coin5);
        
    //     const coin6 = new Coin();
    //     coin6.x = 400;
    //     coin6.y = 125;
    //     coins.push(coin6);
        
    //     const coin7 = new Coin();
    //     coin7.x = 400;
    //     coin7.y = 195;
    //     coins.push(coin7);
        
    //     const coin8 = new Coin();
    //     coin8.x = 440;
    //     coin8.y = 125;
    //     coins.push(coin8);
        
    //     const coin9 = new Coin();
    //     coin9.x = 440;
    //     coin9.y = 195;
    //     coins.push(coin9);
        
    //     const coin10 = new Coin();
    //     coin10.x = 440;
    //     coin10.y = 90;
    //     coins.push(coin10);
        
    //     const coin11 = new Coin();
    //     coin11.x = 440;
    //     coin11.y = 230;
    //     coins.push(coin11);
        
    //     const coin12 = new Coin();
    //     coin12.x = 560;
    //     coin12.y = 160;
    //     coins.push(coin12);
        
    //     const coin13 = new Coin();
    //     coin13.x = 600;
    //     coin13.y = 160;
    //     coins.push(coin13);
        
    //     const coin14 = new Coin();
    //     coin14.x = -350;
    //     coin14.y = 160;
    //     coins.push(coin14);
        
    //     const coin15 = new Coin();
    //     coin15.x = -300;
    //     coin15.y = 160;
    //     coins.push(coin15);
        
    //     const coin16 = new Coin();
    //     coin16.x = -250;
    //     coin16.y = 160;
    //     coins.push(coin16);
        
    //     const coin17 = new Coin();
    //     coin17.x = -300;
    //     coin17.y = 110;
    //     coins.push(coin17);
        
    //     const coin18 = new Coin();
    //     coin18.x = -300;
    //     coin18.y = 210;
    //     coins.push(coin18);
    
    //     for (let i = 0; i < 10; i++) {
    //         const coin = new Coin();
    //         coin.x = 900 + Math.random() * 1500; 
    //         coin.y = 100 + Math.random() * 200; 
    //         coins.push(coin);
    //     }
    
    //     return coins;
    // }

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
        // for (let i = 0; i < 10; i++) {
        //     const coin = new Coin();
        //     coin.x = 900 + Math.random() * 1500; 
        //     coin.y = 100 + Math.random() * 200; 
        //     coins.push(coin);
        // }
        return coins;
    }

    generateRandomCoins(coins) {
        for (let i = 0; i < 10; i++) {
            const coin = new Coin();
            coin.x = 900 + Math.random() * 1500; 
            coin.y = 100 + Math.random() * 200; 
            coins.push(coin);
        }
    }

    // setupBottles() {
    //     const bottles = [];
    
    //     const bottle1 = new Bottle();
    //     bottle1.x = -450;
    //     bottle1.y = 340;
    //     bottles.push(bottle1);

    //     const bottle2 = new Bottle();
    //     bottle2.x = -400;
    //     bottle2.y = 340;
    //     bottles.push(bottle2);

    //     const bottle3 = new Bottle();
    //     bottle3.x = -350;
    //     bottle3.y = 340;
    //     bottles.push(bottle3);

    //     for (let i = 0; i < 7; i++) {
    //         const bottle = new Bottle();
    //         bottle.x = 300 + Math.random() * 2000; 
    //         bottle.y = 340; 
    //         bottles.push(bottle);
    //     }

    //     return bottles;
    // }

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
        // for (let i = 0; i < 7; i++) {
        //     const bottle = new Bottle();
        //     bottle.x = 300 + Math.random() * 2000; 
        //     bottle.y = 340; 
        //     bottles.push(bottle);
        // }
        return bottles;
    }

    generateRandomBottles(bottles) {
        for (let i = 0; i < 7; i++) {
            const bottle = new Bottle();
            bottle.x = 300 + Math.random() * 2000; 
            bottle.y = 340; 
            bottles.push(bottle);
        }
    }
}