/**
 * Stores which game actions are currently pressed
 * (via keyboard or touch buttons).
 */
class Keyboard {
    left = false;
    right = false;
    jump = false;
    throw = false;

    static keyMap = {
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowUp: 'jump',
        Space: 'jump',
        KeyD: 'throw'
    };


    /**
     * Updates the matching action for a keyboard event.
     * @param {KeyboardEvent} event - The keydown or keyup event.
     * @param {boolean} isPressed - True on keydown, false on keyup.
     */
    handleKey(event, isPressed) {
        const action = Keyboard.keyMap[event.code];
        if (!action) return;
        event.preventDefault();
        this[action] = isPressed;
    }


    /**
     * Releases all actions.
     */
    reset() {
        this.left = false;
        this.right = false;
        this.jump = false;
        this.throw = false;
    }
}
