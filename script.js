let canvas;
let world = null;
let keyboard = new Keyboard();
let soundManager = new SoundManager();
let intervalIds = [];
let isGameRunning = false;
let currentLevel = 1;
let playerProgress = createNewProgress();

const winImage = './assets/img/9_intro_outro_screens/win/you-win.png';
const loseImage = './assets/img/9_intro_outro_screens/game_over/game-over-pepe.png';
const levelFactories = [createLevel1, createLevel2, createLevel3, createLevel4, createLevel5];
const maxLevel = levelFactories.length;


/**
 * Initializes the page: connects keyboard, buttons and the dialog
 * with their functions and shows the saved mute state.
 */
function init() {
    canvas = document.getElementById('canvas');
    bindKeyboardEvents();
    bindTouchControls();
    bindButtons();
    bindDialogEvents();
    updateMuteIcon();
    setupFullscreen();
}


/**
 * Starts an interval and remembers its id, so it can be stopped later.
 * @param {Function} callback - Function to run.
 * @param {number} time - Interval time in milliseconds.
 */
function setStoppableInterval(callback, time) {
    const id = setInterval(callback, time);
    intervalIds.push(id);
}


/**
 * Stops all intervals of the game.
 */
function stopAllIntervals() {
    intervalIds.forEach((id) => clearInterval(id));
    intervalIds = [];
}


/**
 * Creates the progress of a new game: no coins, normal damage.
 * @returns {{coins: number, damage: number}} The new progress.
 */
function createNewProgress() {
    return { coins: 0, damage: 1 };
}


/**
 * Starts a new game at level 1 with fresh progress.
 */
function startGame() {
    playerProgress = createNewProgress();
    startLevel(1);
}


/**
 * Starts the level after the current one.
 */
function startNextLevel() {
    startLevel(currentLevel + 1);
}


/**
 * Starts the given level with a fresh world.
 * @param {number} levelNumber - Number of the level (1 to 5).
 */
function startLevel(levelNumber) {
    resetGame();
    currentLevel = levelNumber;
    world = new World(canvas, keyboard, levelFactories[levelNumber - 1]());
    world.character.coins = playerProgress.coins;
    world.character.damage = playerProgress.damage;
    isGameRunning = true;
    showScreen('game');
    soundManager.startLoop('music');
}


/**
 * Stops the current game completely (loops, drawing, sounds, input).
 */
function resetGame() {
    if (world) world.stop();
    stopAllIntervals();
    soundManager.stopAll();
    keyboard.reset();
    isGameRunning = false;
}


/**
 * Stops the game and shows the shop (level won) or the end screen (game won or lost).
 * @param {boolean} hasWon - True if the endboss was defeated.
 */
function showEndScreen(hasWon) {
    const stats = world.getStats();
    const result = getGameResult(hasWon);
    playerProgress.coins = stats.coins;
    resetGame();
    soundManager.play(hasWon ? 'win' : 'lose');
    if (result === 'next') {
        showShop(stats.level);
        return;
    }
    document.getElementById('endScreenImage').src = hasWon ? winImage : loseImage;
    document.getElementById('endScreenStats').innerHTML = generateEndStatsHtml(stats, result);
    showScreen('end');
}


/**
 * Decides how the level ended.
 * @param {boolean} hasWon - True if the endboss was defeated.
 * @returns {'next'|'won'|'lost'} 'next' if another level follows, 'won' after the last level, 'lost' otherwise.
 */
function getGameResult(hasWon) {
    if (!hasWon) return 'lost';
    return currentLevel < maxLevel ? 'next' : 'won';
}


/**
 * Leaves the game and returns to the start screen.
 */
function showStartScreen() {
    resetGame();
    world = null;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    showScreen('start');
}


/**
 * Shows the overlays that belong to the given screen.
 * @param {'start'|'game'|'end'|'shop'} screen - The screen to show.
 */
function showScreen(screen) {
    toggleElement('startScreen', screen === 'start');
    toggleElement('endScreen', screen === 'end');
    toggleElement('shopScreen', screen === 'shop');
    toggleElement('touchControls', screen === 'game');
    toggleElement('exitButton', screen !== 'start');
}


/**
 * Shows or hides an element.
 * @param {string} id - Id of the element.
 * @param {boolean} isVisible - True to show the element.
 */
function toggleElement(id, isVisible) {
    document.getElementById(id).classList.toggle('d-none', !isVisible);
}


/**
 * Toggles the sound and restarts the music if a game is running.
 */
function toggleMute() {
    const isMuted = soundManager.toggleMute();
    updateMuteIcon();
    if (!isMuted && isGameRunning) soundManager.startLoop('music');
}


/**
 * Shows the icon that matches the current mute state.
 */
function updateMuteIcon() {
    const icon = soundManager.isMuted ? 'sound-off' : 'sound-on';
    document.getElementById('muteIcon').src = `./assets/img/icons/${icon}.svg`;
}


/**
 * Connects the keyboard with the game input.
 */
function bindKeyboardEvents() {
    window.addEventListener('keydown', (event) => keyboard.handleKey(event, true));
    window.addEventListener('keyup', (event) => keyboard.handleKey(event, false));
}


/**
 * Connects the mobile touch buttons with the game input
 * and disables their context menu.
 */
function bindTouchControls() {
    document.querySelectorAll('.touch-btn').forEach((button) => {
        const action = button.dataset.action;
        button.addEventListener('pointerdown', (event) => setTouchAction(event, action, true));
        ['pointerup', 'pointerleave', 'pointercancel'].forEach((type) => {
            button.addEventListener(type, (event) => setTouchAction(event, action, false));
        });
        button.addEventListener('contextmenu', (event) => event.preventDefault());
    });
}


/**
 * Sets an input action from a touch button.
 * @param {PointerEvent} event - The pointer event.
 * @param {string} action - The action, e.g. 'left'.
 * @param {boolean} isPressed - True while the button is pressed.
 */
function setTouchAction(event, action, isPressed) {
    event.preventDefault();
    keyboard[action] = isPressed;
}


/**
 * Connects all menu buttons with their functions.
 */
function bindButtons() {
    bindClick('startButton', startGame);
    bindClick('restartButton', startGame);
    bindClick('shopNextButton', startNextLevel);
    bindClick('shopExitButton', showStartScreen);
    bindClick('buyDamageButton', buyDamageUpgrade);
    bindClick('homeButton', showStartScreen);
    bindClick('exitButton', showStartScreen);
    bindClick('muteButton', toggleMute);
    bindClick('fullscreenButton', toggleFullscreen);
    bindClick('controlsButton', openControlsDialog);
}


/**
 * Adds a click handler and removes the focus afterwards,
 * so the space key does not press the button again during the game.
 * @param {string} id - Id of the button.
 * @param {Function} handler - Function to call on click.
 */
function bindClick(id, handler) {
    const button = document.getElementById(id);
    button.addEventListener('click', () => {
        handler();
        button.blur();
    });
}


/**
 * Opens the dialog with the controls.
 */
function openControlsDialog() {
    document.getElementById('controlsDialog').showModal();
}


/**
 * Closes the dialog via the X button or a click next to it.
 */
function bindDialogEvents() {
    const dialog = document.getElementById('controlsDialog');
    document.getElementById('closeDialogButton').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
    });
}
