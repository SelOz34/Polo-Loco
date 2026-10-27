let canvas;
let world = null;
let keyboard = new Keyboard();
let intervalIds = [];

const winImage = './assets/img/9_intro_outro_screens/win/you-win.png';
const loseImage = './assets/img/9_intro_outro_screens/game_over/game-over-pepe.png';


/**
 * Initializes the page: connects keyboard, buttons and the dialog with their functions.
 */
function init() {
    canvas = document.getElementById('canvas');
    bindKeyboardEvents();
    bindButtons();
    bindDialogEvents();
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
 * Starts a new game with a fresh level.
 */
function startGame() {
    resetGame();
    world = new World(canvas, keyboard, createLevel1());
    showScreen('game');
}


/**
 * Stops the current game completely (loops, drawing, input).
 */
function resetGame() {
    if (world) world.stop();
    stopAllIntervals();
    keyboard.reset();
}


/**
 * Stops the game and shows the win or lose screen.
 * @param {boolean} hasWon - True if the player won.
 */
function showEndScreen(hasWon) {
    const stats = world.getStats();
    resetGame();
    document.getElementById('endScreenImage').src = hasWon ? winImage : loseImage;
    document.getElementById('endScreenStats').innerHTML = generateEndStatsHtml(stats);
    showScreen('end');
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
 * @param {'start'|'game'|'end'} screen - The screen to show.
 */
function showScreen(screen) {
    toggleElement('startScreen', screen === 'start');
    toggleElement('endScreen', screen === 'end');
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
 * Connects the keyboard with the game input.
 */
function bindKeyboardEvents() {
    window.addEventListener('keydown', (event) => keyboard.handleKey(event, true));
    window.addEventListener('keyup', (event) => keyboard.handleKey(event, false));
}


/**
 * Connects all menu buttons with their functions.
 */
function bindButtons() {
    bindClick('startButton', startGame);
    bindClick('restartButton', startGame);
    bindClick('homeButton', showStartScreen);
    bindClick('exitButton', showStartScreen);
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
