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
let throw_hit_sound = new Audio('audio/throw_hit.mp3');
let endboss_scream_sound = new Audio('audio/endboss_scream.mp3');
let sandstorm_sound = new Audio('audio/sandstorm.mp3');
let jump_sound = new Audio('audio/jump.mp3');
let snore_sound = new Audio('audio/snore.mp3');
let game_over_sound = new Audio('audio/game_over.mp3');
let win_sound = new Audio('audio/win.mp3');
let lose_end_sound = new Audio('audio/lose_end.mp3');
let win_end_sound = new Audio('audio/win_end.mp3');

/**
 * Initializes the game world and starts background sounds.
 */
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
}

/**
 * Updates the state of the keyboard based on key events.
 * @param {Event} e - The keyboard event.
 * @param {boolean} isKeyDown - Indicates if the key is pressed.
 */
function updateKeyboardState(e, isKeyDown) {
    const keyMap = {
        '37': 'LEFT', // Pfeil nach links
        '39': 'RIGHT', // Pfeil nach rechts
        '38': 'UP', // Pfeil nach oben
        '40': 'DOWN', // Pfeil nach unten
        '32': 'SPACE', // Leertaste
        '70': 'F', // Taste F
        'a': 'LEFT', // Taste a
        'd': 'RIGHT', // Taste d
        'w': 'UP', // Taste w
        's': 'DOWN' // Taste s
    };

    const keyName = keyMap[e.keyCode] || keyMap[e.key];
    if (keyName !== undefined) {
        keyboard[keyName] = isKeyDown;
    }
}

/**
 * Adds an event listener for keydown events to update keyboard state.
 */
window.addEventListener("keydown", (e) => updateKeyboardState(e, true));

/**
 * Adds an event listener for keyup events to update keyboard state.
 */
window.addEventListener("keyup", (e) => updateKeyboardState(e, false));

/**
 * Sets up touch event listeners for virtual control buttons.
 */
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

/**
 * Sets up touch event listeners for an element.
 * @param {HTMLElement} element - The element to attach touch events to.
 * @param {Function} actionStart - The action to perform on touchstart.
 * @param {Function} actionEnd - The action to perform on touchend.
 */
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

/**
 * Starts the game by closing menus, applying design settings, and initializing game elements.
 */
function startGame() {
    closeControls();
    closeStory();
    closeImprint(event);
    closePrivacyPolicy(event);
    addDeviceSpecificDesigns();
    gameStarted = true;
    updateControls();
    initLevel();
    init();
}

/**
 * Applies device-specific design adjustments for the game.
 */
function addDeviceSpecificDesigns() {
    addStandardStartGameSettings();
    addStandardControlinfosDisplay();
    addSmallerControlinfosDisplay(); 
    addMobileControlinfosDisplay();
    addMobileDesign();
    addTabletDesign();
    addBigTabletDesign();
}

/**
 * Configures and displays standard game start settings.
 */
function addStandardStartGameSettings() {
    document.getElementById(`gameMenu`).style.display = "none";
    document.getElementById(`startButton`).style.display = "none";
    document.getElementById('gameOverImg').style.display = "none";
    document.getElementById('canvas').style.display = "block";
    document.getElementById('muteButton').style.display = "flex";
    document.getElementById(`protectionButtons`).style.display = "none";
    document.getElementById(`storyButton`).style.display = "none";
    document.getElementById(`controlsButton`).style.height = "64px";
    document.getElementById(`controlsButton`).style.width = "182px";
    document.getElementById(`controlsButton`).style.fontSize = "45px";
}

/**
 * Sets standard display settings for control information elements.
 */
function addStandardControlinfosDisplay() {
    document.getElementById('controlInfos').style.cssText = 'height: 400px; width: 340px; top: 58%; margin-left: 550px;';
    document.querySelectorAll('#controlInfos span').forEach(span => {
        span.style.fontSize = '26px';
        span.style.margin = '5px 0';
        span.style.padding = '2px 5px';
        span.style.boxSizing = 'border-box';
        span.style.width = '90%';
        span.style.justifyContent = 'space-between';
    });
}

/**
 * Adjusts control information display for smaller screens.
 */
function addSmallerControlinfosDisplay() {
    if (window.matchMedia('(max-width: 1450px)').matches) {
        document.getElementById('controlInfos').style.cssText = 'height: 200px; width: 260px; top: 49%; margin-left: 0; background-image: unset; color: black;';
        document.querySelectorAll('#controlInfos h3').forEach(h3 => {
            h3.style.display = 'none';
        });
        document.querySelectorAll('#controlInfos span').forEach(span => {
            span.style.fontSize = '20px';
            span.style.width = '92%';
        });
    }
}

/**
 * Adjusts control information display for mobile screens.
 */
function addMobileControlinfosDisplay() {
    if (window.matchMedia('(max-height: 600px)').matches) {
        document.getElementById('controlInfos').style.cssText = 'height: 200px; width: 200px; background-image: unset; color: black; top: 15%; margin-left: 0; transform: unset; left: unset;';
        document.querySelectorAll('#controlInfos span').forEach(span => {
            span.style.setProperty('font-size', '16px', 'important');
            span.style.margin = '3px 0';
            span.style.padding = '2px 14px';
            span.style.boxSizing = 'border-box';
            span.style.width = '176px';
            span.style.justifyContent = 'space-between';
        });
    }
}

/**
 * Adjusts the design for mobile screens with specific height and width.
 */
function addMobileDesign() {
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
}

/**
 * Adjusts the design for tablet screens within specific dimensions.
 */
function addTabletDesign() {
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
}

/**
 * Adjusts the design for large tablet screens with specific dimensions.
 */
function addBigTabletDesign() {
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
}

/**
 * Reloads the current game page.
 */
function reloadGame() {
    window.location.reload();
}

/**
 * Opens the controls menu with a sliding and fading animation based on device type.
 */
function openControls() {
    let controlInfos = document.getElementById('controlInfos');
    let isMobile = window.matchMedia('(max-height: 600px)').matches && gameStarted;
    controlInfos.style.transition = 'none';
    controlInfos.style.display = 'flex';
    controlInfos.style.opacity = '0'; 
    controlInfos.style.visibility = 'visible'; 
    controlInfos.style[isMobile ? 'right' : 'left'] = isMobile ? '-50%' : '100%';
    controlInfos.style[isMobile ? 'left' : 'right'] = 'unset';
    controlInfos.offsetHeight; 
    controlInfos.style.transition = `${isMobile ? 'right' : 'left'} 0.5s ease, opacity 0.5s ease`;
    controlInfos.style[isMobile ? 'right' : 'left'] = isMobile ? '1%' : '50%';
    controlInfos.style.opacity = '1'; 
    closeStory();
    closeImprint(event);
    closePrivacyPolicy(event);
}

/**
 * Closes the controls menu with a sliding and fading animation.
 */
function closeControls() {
    let controlInfos = document.getElementById('controlInfos');
    controlInfos.style.left = '100%'; 
    controlInfos.style.opacity = '0';
    controlInfos.addEventListener('transitionend', function() {
        if (controlInfos.style.left === '100%') {
            controlInfos.style.visibility = 'hidden';
            controlInfos.style.display = 'none'; 
        }
    }, { once: true }); 
}

/**
 * Opens the story section with a sliding and fading animation.
 */
function openStory() {
    let story = document.getElementById('story');
    story.style.transition = 'none';
    story.style.display = 'flex';
    story.style.left = '100%'; 
    story.style.opacity = '0';
    story.style.visibility = 'visible';
    story.offsetHeight; 
    story.style.transition = 'left 0.5s ease, opacity 0.5s ease';
    story.style.left = '50%'; 
    story.style.opacity = '1'; 
    closeControls();
    closeImprint(event);
    closePrivacyPolicy(event);
}

/**
 * Closes the story section with a sliding and fading animation.
 */
function closeStory() {
    let story = document.getElementById('story');
    story.style.left = '100%'; 
    story.style.opacity = '0'; 
    story.addEventListener('transitionend', function() {
        if (story.style.left === '100%') {
            story.style.visibility = 'hidden';
            story.style.display = 'none'; 
        }
    }, { once: true }); 
}

/**
 * Closes the story section with a sliding and fading animation.
 */
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

/**
 * Mutes or unmutes all sound effects based on the given boolean value.
 * 
 * @param {boolean} mute - If true, mutes all sounds; if false, unmutes them.
 */
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
    throw_hit_sound.muted = mute;
    endboss_scream_sound.muted = mute;
    sandstorm_sound.muted = mute;
    jump_sound.muted = mute;
    snore_sound.muted = mute;
    game_over_sound.muted = mute;
    win_sound.muted = mute;
    lose_end_sound.muted = mute;
    win_end_sound.muted = mute;
}

/**
 * Opens the imprint section with a sliding and fading animation.
 */
function openImprint() {
    let imprint = document.getElementById('imprint');
    imprint.style.transition = 'none'; 
    imprint.style.display = 'flex';
    imprint.style.transform = 'translate(-50%, 100%)'; 
    imprint.style.opacity = '0'; 
    imprint.style.visibility = 'visible'; 
    imprint.offsetHeight;
    imprint.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    imprint.style.transform = 'translate(-50%, -50%)'; 
    imprint.style.opacity = '1'; 
    closeControls();
    closeStory();
    closePrivacyPolicy(event);
}

/**
 * Closes the imprint section with a sliding and fading animation.
 * If the event target is an anchor tag, the function exits early.
 * 
 * @param {Event} event - The event object triggered during the closing process.
 */
function closeImprint(event) {
    let imprint = document.getElementById('imprint');
    if (event.target.tagName.toLowerCase() === 'a') {
        return; 
    }
    imprint.style.transform = 'translate(-50%, 100%)'; 
    imprint.style.opacity = '0'; 
    imprint.addEventListener('transitionend', function() {
        if (imprint.style.transform === 'translate(-50%, 100%)') {
            imprint.style.visibility = 'hidden'; 
            imprint.style.display = 'none';
        }
    }, { once: true }); 
}

/**
 * Opens the privacy policy section with a sliding and fading animation.
 */
function openPrivacyPolicy() {
    let privacyPolicy = document.getElementById('privacyPolicy');
    privacyPolicy.style.transition = 'none'; 
    privacyPolicy.style.display = 'flex';
    privacyPolicy.style.transform = 'translate(-50%, 100%)'; 
    privacyPolicy.style.opacity = '0'; 
    privacyPolicy.style.visibility = 'visible';
    privacyPolicy.offsetHeight; 
    privacyPolicy.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    privacyPolicy.style.transform = 'translate(-50%, -50%)';
    privacyPolicy.style.opacity = '1'; 
    closeControls();
    closeStory();
    closeImprint(event);
}

/**
 * Closes the privacy policy section with a sliding and fading animation.
 * If the event target is an anchor tag, the function exits early.
 * 
 * @param {Event} event - The event object triggered during the closing process.
 */
function closePrivacyPolicy(event) {
    let privacyPolicy = document.getElementById('privacyPolicy');
    if (event.target.tagName.toLowerCase() === 'a') {
        return; 
    }
    privacyPolicy.style.transform = 'translate(-50%, 100%)'; 
    privacyPolicy.style.opacity = '0'; 
    privacyPolicy.addEventListener('transitionend', function() {
        if (privacyPolicy.style.transform === 'translate(-50%, 100%)') {
            privacyPolicy.style.visibility = 'hidden'; 
            privacyPolicy.style.display = 'none';
        }
    }, { once: true }); 
}

/**
 * Updates the control display based on the device's screen height and game state.
 */
function updateControls() {
    let { moveLeft, moveRight, jump, attack } = getControlElements();
    if (window.innerHeight <= 600) {
        if (gameStarted) {
            moveLeft.innerHTML = 'move left: <img src="./img/12_mobile_buttons/left_button.png" alt="" />';
            moveRight.innerHTML = 'move right: <img src="./img/12_mobile_buttons/right_button.png" alt="" />';
            jump.innerHTML = 'jump with: <img src="./img/12_mobile_buttons/up_button.png" alt="" />';
            attack.innerHTML = 'attack with: <img src="./img/12_mobile_buttons/throw_button.png" />';
        } else {
            moveLeft.innerHTML = 'move left: <img src="./img/12_mobile_buttons/left_button2.png" alt="" />';
            moveRight.innerHTML = 'move right: <img src="./img/12_mobile_buttons/right_button2.png" alt="" />';
            jump.innerHTML = 'jump with: <img src="./img/12_mobile_buttons/up_button2.png" alt="" />';
            attack.innerHTML = 'attack with: <img src="./img/12_mobile_buttons/throw_button2.png" />';
        }
    } else {
        moveLeft.innerHTML = 'move left: <b>A</b> or <b>←</b>';
        moveRight.innerHTML = 'move right: <b>D</b> or <b>→</b>';
        jump.innerHTML = 'jump with: <b>spacebar</b>';
        attack.innerHTML = 'attack with: <b>F</b>';
    }
}

/**
 * Retrieves the control elements from the DOM.
 * 
 * @returns {Object} An object containing the control elements.
 */
function getControlElements() {
    return {
        moveLeft: document.getElementById('controlMoveLeft'),
        moveRight: document.getElementById('controlMoveRight'),
        jump: document.getElementById('controlJump'),
        attack: document.getElementById('controlAttack')
    };
}

/**
 * Adds an event listener to update controls when the DOM content is fully loaded.
 */
document.addEventListener('DOMContentLoaded', updateControls);

/**
 * Adds an event listener to update controls when the window is resized.
 */
window.addEventListener('resize', updateControls);

