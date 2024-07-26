let canvas;
let world;
let keyboard = new Keyboard();
let background_sound = new Audio('audio/background.mp3');
let endfight_sound = new Audio('audio/endfight.mp3');
let background_melody = new Audio('audio/background2.mp3');
let walking_sound = new Audio('audio/walk.mp3');
let charge_sound = new Audio('audio/charge.mp3');
let coin_sound = new Audio('audio/coin.mp3');
let collect_bottle_sound = new Audio('audio/collect_bottle.mp3');
let kill_chicken = new Audio('audio/kill_chicken.mp3');
let rooster_sound = new Audio('audio/rooster.mp3');
let rooster2_sound = new Audio('audio/rooster.mp3');
let first_contact_endboss_sound = new Audio('audio/first_contact_endboss.mp3');
let scream_sound = new Audio('audio/scream.mp3');
let throw_sound = new Audio('audio/throw.mp3');
// let throw_hit_sound = new Audio('audio/throw_hit.mp3');
let endboss_scream_sound = new Audio('audio/endboss_scream.mp3');
let sandstorm_sound = new Audio('audio/sandstorm.mp3');
let jump_sound = new Audio('audio/jump.mp3');
let snore_sound = new Audio('audio/snore.mp3');
let game_over_sound = new Audio('audio/game_over.mp3');
let win_sound = new Audio('audio/win.mp3');
let lose_end_sound = new Audio('audio/lose_end.mp3');
let win_end_sound = new Audio('audio/win_end.mp3');

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);  
    background_sound.loop = true;
    background_sound.volume = 0.5;
    background_sound.play();
    setTimeout(() => {
        background_melody.loop = true;
        background_melody.volume = 0.2;
        background_melody.play();
    }, 2000); // Verzögerung von 2000 Millisekunden (2 Sekunden)


    // // Hinzufügen des Event-Handlers, um den Hintergrundsound zu wiederholen
    // background_sound.addEventListener('ended', function() {
    //     this.currentTime = 0; // Setze die Zeit auf den Anfang
    //     this.play(); // Spiele den Sound erneut ab
    // }, false);
    
    // Fügen Sie hier den Rest Ihrer Initialisierungslogik hinzu, falls vorhanden

    // console.log('My Character is', world.character); 

    // character.src = '../img/2_character_pepe/2_walk/W-21.png'

    // ctx.drawImage(character, 20, 20, 50, 150);
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 37 || e.key == 'a') {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 39 || e.key == 'd') {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 38 || e.key == 'w') {
        keyboard.UP = true;
    }

    if (e.keyCode == 40 || e.key == 's') {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 70) {
        keyboard.F = true;
    }
});


window.addEventListener("keyup", (e) => {
    if (e.keyCode == 37 || e.key == 'a') {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 39 || e.key == 'd') {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 38 || e.key == 'w') {
        keyboard.UP = false;
    }

    if (e.keyCode == 40 || e.key == 's') {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 70) {
        keyboard.F = false;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let leftButton = document.getElementById('leftButton');
    let rightButton = document.getElementById('rightButton');
    let upButton = document.getElementById('upButton');
    let throwButton = document.getElementById('throwButton');
    
    setupTouchEvent(leftButton, () => { keyboard.LEFT = true; }, () => { keyboard.LEFT = false; });
    setupTouchEvent(rightButton, () => { keyboard.RIGHT = true; }, () => { keyboard.RIGHT = false; });
    setupTouchEvent(upButton, () => { keyboard.SPACE = true; }, () => { keyboard.SPACE = false; });
    setupTouchEvent(throwButton, () => { keyboard.F = true; }, () => { keyboard.F = false; });
});

function setupTouchEvent(element, actionStart, actionEnd) {
    element.addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        actionStart();
    });

    element.addEventListener('touchend', (e) => {
        if (e.cancelable) e.preventDefault();
        actionEnd();
    });
}

let gameStarted = false;
    
function startGame() {
    document.getElementById(`gameMenu`).style.display = "none";
    document.getElementById(`startButton`).style.display = "none";
    document.getElementById('gameOverImg').style.display = "none";
    document.getElementById('canvas').style.display = "block";
    document.getElementById('muteButton').style.display = "flex";
    document.getElementById(`protectionButtons`).style.display = "none";
    document.getElementById(`storyButton`).style.display = "none";
    document.getElementById(`controlInfos`).style.display = "none";
    document.getElementById(`story`).style.display = "none";
    document.getElementById(`imprint`).style.display = "none";
    document.getElementById(`privacyPolicy`).style.display = "none";
    if (window.matchMedia('(max-height: 820px) and (max-width: 1180px)').matches) {
        document.getElementById(`controlsText`).style.display = "none";
        document.getElementById(`controlsButton`).style.height = "40px";
        document.getElementById(`controlsButton`).style.width = "55px";
        document.getElementById(`settingButtons`).style.gap = "10px";
        document.getElementById(`settingButtons`).style.right = "44%";
        document.getElementById(`mobileButtons`).style.display = "flex";
    }
    if (window.matchMedia('(min-height: 768px) and (max-height: 820px) and (min-width: 1024px) and (max-width: 1180px)').matches) {
        document.getElementById(`controlsText`).style.display = "none";
        document.getElementById(`controlsButton`).style.height = "40px";
        document.getElementById(`controlsButton`).style.width = "55px";
        document.querySelector('#controlsButton img').style.height = "32px";
        document.querySelector('#controlsButton img').style.width = "32px";
        document.getElementById(`muteButton`).style.height = "40px";
        document.getElementById(`muteButton`).style.width = "55px";
        document.querySelector('#muteButton img').style.height = "32px";
        document.querySelector('#muteButton img').style.width = "32px";
        document.getElementById(`settingButtons`).style.gap = "10px";
        document.getElementById(`settingButtons`).style.right = "3%";
        document.getElementById(`mobileButtons`).style.display = "flex";
    }
    if (window.matchMedia('(min-height: 1024px) and (max-height: 1024px) and (min-width: 1366px) and (max-width: 1366px)').matches) {
        document.getElementById(`controlsText`).style.display = "none";
        document.getElementById(`controlsButton`).style.height = "40px";
        document.getElementById(`controlsButton`).style.width = "55px";
        document.querySelector('#controlsButton img').style.height = "32px";
        document.querySelector('#controlsButton img').style.width = "32px";
        document.getElementById(`muteButton`).style.height = "40px";
        document.getElementById(`muteButton`).style.width = "55px";
        document.querySelector('#muteButton img').style.height = "32px";
        document.querySelector('#muteButton img').style.width = "32px";
        document.getElementById(`settingButtons`).style.gap = "10px";
        document.getElementById(`settingButtons`).style.right = "3%";
        document.getElementById(`mobileButtons`).style.display = "flex";
    }
    gameStarted = true;
    initLevel();
    init();
}

function reloadGame() {
    window.location.reload();
}

function openControls() {
    document.getElementById(`controlInfos`).style.display = "flex";
    document.getElementById(`story`).style.display = "none";
    document.getElementById(`imprint`).style.display = "none";
    document.getElementById(`privacyPolicy`).style.display = "none";
    // if (gameStarted) {
    //     document.getElementById('controlInfos').style.top = "50%";
    // }
    // if (window.matchMedia('(max-height: 600px)').matches) {
    //     document.getElementById('startButton').style.display = 'none';
    // }
    // if (window.matchMedia('(min-height: 1024px) and (min-width: 1366px)').matches) {
    //     document.getElementById('startButton').style.display = 'none';
    // }
}

function closeControls() {
    document.getElementById(`controlInfos`).style.display = "none";
    // if (!gameStarted) {
    //     document.getElementById('storyButton').style.display = "flex";
    // }
    // if (window.matchMedia('(max-height: 600px)').matches) {
    //     document.getElementById('startButton').style.display = 'flex';
    // }
    // if (window.matchMedia('(min-height: 1024px) and (min-width: 1366px)').matches) {
    //     document.getElementById('startButton').style.display = 'flex';
    // }
}

function openStory() {
    document.getElementById(`story`).style.display = "flex";
    document.getElementById(`controlInfos`).style.display = "none";
    document.getElementById(`imprint`).style.display = "none";
    document.getElementById(`privacyPolicy`).style.display = "none";
    // if (window.matchMedia('(max-height: 600px)').matches) {
    //     document.getElementById('startButton').style.display = 'none';
    // }
    // if (window.matchMedia('(min-height: 1024px) and (min-width: 1366px)').matches) {
    //     document.getElementById('startButton').style.display = 'none';
    // }
}

function closeStory() {
    document.getElementById(`story`).style.display = "none";
    // if (window.matchMedia('(max-height: 600px)').matches) {
    //     document.getElementById('startButton').style.display = 'flex';
    // }
    // if (window.matchMedia('(min-height: 1024px) and (min-width: 1366px)').matches) {
    //     document.getElementById('startButton').style.display = 'flex';
    // }
}

function muteSound() {
    const soundOnImage = document.getElementById('soundOn');
    if (soundOnImage.src.includes('sound_on.png')) {
        soundOnImage.src = './img/mute.png';
        muteAllSounds(true);  
    } else {
        soundOnImage.src = './img/sound_on.png';
        muteAllSounds(false); 
    }
}

function muteAllSounds(mute) {
    background_sound.muted = mute;
    endfight_sound.muted = mute;
    background_melody.muted = mute;
    walking_sound.muted = mute;
    charge_sound.muted = mute;
    coin_sound.muted = mute;
    collect_bottle_sound.muted = mute;
    kill_chicken.muted = mute;
    rooster_sound.muted = mute;
    rooster2_sound.muted = mute;
    first_contact_endboss_sound.muted = mute;
    scream_sound.muted = mute;
    throw_sound.muted = mute;
    // throw_hit_sound.muted = mute;
    endboss_scream_sound.muted = mute;
    sandstorm_sound.muted = mute;
    jump_sound.muted = mute;
    snore_sound.muted = mute;
    game_over_sound.muted = mute;
    win_sound.muted = mute;
    lose_end_sound.muted = mute;
    win_end_sound.muted = mute;
}

function openImprint() {
    document.getElementById(`imprint`).style.display = "flex";
    document.getElementById(`controlInfos`).style.display = "none";
    document.getElementById(`story`).style.display = "none";
    document.getElementById(`privacyPolicy`).style.display = "none";
    // if (window.matchMedia('(max-height: 600px)').matches) {
    //     document.getElementById('startButton').style.display = 'none';
    // }
    // if (window.matchMedia('(min-height: 1024px) and (min-width: 1366px)').matches) {
    //     document.getElementById('startButton').style.display = 'none';
    // }
}

function closeImprint(event) {
    if (event.target.tagName.toLowerCase() === 'a') {
        return; 
    }
    document.getElementById(`imprint`).style.display = "none";
    // if (window.matchMedia('(max-height: 600px)').matches) {
    //     document.getElementById('startButton').style.display = 'flex';
    // }
    // if (window.matchMedia('(min-height: 1024px) and (min-width: 1366px)').matches) {
    //     document.getElementById('startButton').style.display = 'flex';
    // }
}

function openPrivacyPolicy() {
    document.getElementById(`privacyPolicy`).style.display = "flex";
    document.getElementById(`controlInfos`).style.display = "none";
    document.getElementById(`story`).style.display = "none";
    document.getElementById(`imprint`).style.display = "none";
    // if (window.matchMedia('(max-height: 600px)').matches) {
    //     document.getElementById('startButton').style.display = 'none';
    // }
    // if (window.matchMedia('(min-height: 1024px) and (min-width: 1366px)').matches) {
    //     document.getElementById('startButton').style.display = 'none';
    // }
}

function closePrivacyPolicy(event) {
    if (event.target.tagName.toLowerCase() === 'a') {
        return; 
    }
    document.getElementById('privacyPolicy').style.display = 'none';
    // if (window.matchMedia('(max-height: 600px)').matches) {
    //     document.getElementById('startButton').style.display = 'flex';
    // }
    // if (window.matchMedia('(min-height: 1024px) and (min-width: 1366px)').matches) {
    //     document.getElementById('startButton').style.display = 'flex';
    // }
}
