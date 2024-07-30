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
    }, 2000);


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
    closeControls();
    closeStory();
    closeImprint(event);
    closePrivacyPolicy(event);
    document.getElementById('controlInfos').style.cssText = 'height: 360px; width: 320px; top: 58%; margin-left: 550px;';
    document.querySelectorAll('#controlInfos span').forEach(span => {
        span.style.fontSize = '26px';
        span.style.margin = '5px 0';
        span.style.padding = '0';
        span.style.width = '90%';
    });
    if (window.matchMedia('(max-width: 1450px)').matches) {
        document.getElementById('controlInfos').style.cssText = 'height: 200px; width: 260px; top: 48%; margin-left: 230px; background-image: unset; color: black;';
        document.querySelectorAll('#controlInfos h3').forEach(h3 => {
            h3.style.display = 'none';
        });
        document.querySelectorAll('#controlInfos span').forEach(span => {
            span.style.fontSize = '20px';
        });
    }
    if (window.matchMedia('(max-height: 600px)').matches) {
        document.getElementById('controlInfos').style.cssText = 'height: 200px; width: 260px; background-image: unset; color: black; top: 10%; margin-left: 0; transform: unset; left: unset;';
    }
    if (window.matchMedia('(max-height: 600px) and (max-width: 1024px)').matches) {
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
        document.getElementById(`settingButtons`).style.right = "44%";
        document.getElementById(`mobileButtons`).style.display = "flex";
    }
    if (window.matchMedia('(min-height: 601px) and (max-height: 820px) and (min-width: 1024px) and (max-width: 1180px)').matches) {
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
    document.getElementById('controlInfos').style.transition = 'none';

    document.getElementById('controlInfos').style.display = 'flex';

    if (window.matchMedia('(max-height: 600px)').matches && gameStarted) {
        document.getElementById('controlInfos').style.left = 'unset'; 
        document.getElementById('controlInfos').style.right = '-50%'; 
    } else {
        
        document.getElementById('controlInfos').style.left = '100%'; 
        document.getElementById('controlInfos').style.right = 'unset'; 
    }

    document.getElementById('controlInfos').style.opacity = '0'; 
    document.getElementById('controlInfos').style.visibility = 'visible'; 

  
    document.getElementById('controlInfos').offsetHeight; 

    if (window.matchMedia('(max-height: 600px)').matches && gameStarted) {
        document.getElementById('controlInfos').style.transition = 'right 0.5s ease, opacity 0.5s ease'; 
        document.getElementById('controlInfos').style.right = '1%'; 
    } else {
        document.getElementById('controlInfos').style.transition = 'left 0.5s ease, opacity 0.5s ease'; 
        document.getElementById('controlInfos').style.left = '50%'; 
    }

    document.getElementById('controlInfos').style.opacity = '1';

    closeStory();
    closeImprint(event);
    closePrivacyPolicy(event);
}

function closeControls() {
    document.getElementById('controlInfos').style.left = '100%'; 
    document.getElementById('controlInfos').style.opacity = '0';

    document.getElementById('controlInfos').addEventListener('transitionend', function() {
        if (document.getElementById('controlInfos').style.left === '100%') {
            document.getElementById('controlInfos').style.visibility = 'hidden';
            document.getElementById('controlInfos').style.display = 'none'; 
        }
    }, { once: true }); 
}

function openStory() {
    document.getElementById('story').style.transition = 'none';

    document.getElementById('story').style.display = 'flex';
    document.getElementById('story').style.left = '100%'; 
    document.getElementById('story').style.opacity = '0';
    document.getElementById('story').style.visibility = 'visible';

    document.getElementById('story').offsetHeight; 

    document.getElementById('story').style.transition = 'left 0.5s ease, opacity 0.5s ease';

    document.getElementById('story').style.left = '50%'; 
    document.getElementById('story').style.opacity = '1'; 

    closeControls();
    closeImprint(event);
    closePrivacyPolicy(event);
}

function closeStory() {
    document.getElementById('story').style.left = '100%'; 
    document.getElementById('story').style.opacity = '0'; 

    document.getElementById('story').addEventListener('transitionend', function() {
        if (document.getElementById('story').style.left === '100%') {
            document.getElementById('story').style.visibility = 'hidden';
            document.getElementById('story').style.display = 'none'; 
        }
    }, { once: true }); 
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
   
    document.getElementById('imprint').style.transition = 'none'; 

    document.getElementById('imprint').style.display = 'flex';
    document.getElementById('imprint').style.transform = 'translate(-50%, 100%)'; 
    document.getElementById('imprint').style.opacity = '0'; 
    document.getElementById('imprint').style.visibility = 'visible'; 

   
    document.getElementById('imprint').offsetHeight;

    
    document.getElementById('imprint').style.transition = 'transform 0.5s ease, opacity 0.5s ease';

    
    document.getElementById('imprint').style.transform = 'translate(-50%, -50%)'; 
    document.getElementById('imprint').style.opacity = '1'; 

    closeControls();
    closeStory();
    closePrivacyPolicy(event);
}

function closeImprint(event) {
    if (event.target.tagName.toLowerCase() === 'a') {
        return; 
    }
   
    document.getElementById('imprint').style.transform = 'translate(-50%, 100%)'; 
    document.getElementById('imprint').style.opacity = '0'; 

    
    document.getElementById('imprint').addEventListener('transitionend', function() {
        if (document.getElementById('imprint').style.transform === 'translate(-50%, 100%)') {
            document.getElementById('imprint').style.visibility = 'hidden'; 
            document.getElementById('imprint').style.display = 'none';
        }
    }, { once: true }); 
}

function openPrivacyPolicy() {
  
    document.getElementById('privacyPolicy').style.transition = 'none'; 

    document.getElementById('privacyPolicy').style.display = 'flex';
    document.getElementById('privacyPolicy').style.transform = 'translate(-50%, 100%)'; 
    document.getElementById('privacyPolicy').style.opacity = '0'; 
    document.getElementById('privacyPolicy').style.visibility = 'visible';


    document.getElementById('privacyPolicy').offsetHeight; 

    document.getElementById('privacyPolicy').style.transition = 'transform 0.5s ease, opacity 0.5s ease';

  
    document.getElementById('privacyPolicy').style.transform = 'translate(-50%, -50%)';
    document.getElementById('privacyPolicy').style.opacity = '1'; 

    closeControls();
    closeStory();
    closeImprint(event);
}

function closePrivacyPolicy(event) {
    if (event.target.tagName.toLowerCase() === 'a') {
        return; 
    }
    
    document.getElementById('privacyPolicy').style.transform = 'translate(-50%, 100%)'; 
    document.getElementById('privacyPolicy').style.opacity = '0'; 

    document.getElementById('privacyPolicy').addEventListener('transitionend', function() {
        if (document.getElementById('privacyPolicy').style.transform === 'translate(-50%, 100%)') {
            document.getElementById('privacyPolicy').style.visibility = 'hidden'; 
            document.getElementById('privacyPolicy').style.display = 'none';
        }
    }, { once: true }); 
}

