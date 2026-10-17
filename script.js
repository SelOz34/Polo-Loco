/**
 * Initializes the page: connects all buttons and the dialog with their functions.
 */
function init() {
    bindButtons();
    bindDialogEvents();
}


/**
 * Starts the game.
 * For now it only hides the start screen – the game itself follows in stage 3.
 */
function startGame() {
    document.getElementById('startScreen').classList.add('d-none');
}


/**
 * Connects all menu buttons with their functions.
 */
function bindButtons() {
    bindClick('startButton', startGame);
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
