let level1;
function initLevel() {
level1 = new Level(
    [
        new Chicken(500),
        new Chicken(500),
        new SmallChicken(750),
        new SmallChicken(750),
        new Chicken(1500),
        new Chicken(1500),
        new SmallChicken(1750),
        new SmallChicken(1750),
        new Chicken(2500),
        new Chicken(2500),
        new SmallChicken(2750),
        new SmallChicken(2750),
        new Endboss()
    ],
    [
        new Cloud(-500),
        new Cloud(0),
        new Cloud(500),
        new Cloud(1000),
        new Cloud(1500),
        new Cloud(2000),
        new Cloud(2500),
        new Cloud(3000)
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
    
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
    
        new BackgroundObject('img/5_background/layers/air.png', 719*2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
    
        new BackgroundObject('img/5_background/layers/air.png', 719*3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),

        new BackgroundObject('img/5_background/layers/air.png', 719*4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*4)
    ],
    [
        new Bird(-250),
        new Bird(250),
        new Bird(750),
        new Bird(1250),
        new Bird(1750),
        new Bird(2250),
        new Bird(2750),
        new Bird(3250)
    ]
);

let intervalTime = 5000; // Starte mit einem Intervall von 5 Sekunden

const addChickenInterval = setInterval(() => {
    level1.enemies.splice(level1.enemies.length - 1, 0, new Chicken(2500)); // Füge ein neues Huhn bei x = 2500 hinzu
    intervalTime -= 200; // Verringere die Verzögerungszeit für das nächste Intervall
    
    // Überprüfe, ob die Verzögerungszeit unter 3000 fällt, um sie nicht weiter zu verringern
    if (intervalTime < 3000) {
        clearInterval(addChickenInterval); // Stoppe das Intervall, wenn die Verzögerungszeit unter 3 Sekunden liegt
    }
}, intervalTime);
}

