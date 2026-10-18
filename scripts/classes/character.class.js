/**
 * Pepe, the playable character.
 * @extends MovableObject
 */
class Character extends MovableObject {
    width = 130;
    height = 270;
    x = 100;
    y = 150;
    groundY = 150;
    speed = 5;
    world;


    /**
     * Creates Pepe and starts his movement loop.
     */
    constructor() {
        super();
        this.loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.animate();
    }


    /**
     * Starts the movement loop.
     */
    animate() {
        setStoppableInterval(() => this.handleMovement(), 1000 / 60);
    }


    /**
     * Reads the keyboard, moves Pepe and lets the camera follow him.
     */
    handleMovement() {
        if (!this.world) return;
        if (this.canMoveRight()) this.walkRight();
        if (this.canMoveLeft()) this.walkLeft();
        this.world.cameraX = -this.x + 100;
    }


    /**
     * @returns {boolean} True if the right key is pressed and the level end is not reached.
     */
    canMoveRight() {
        return this.world.keyboard.right && this.x < this.world.level.levelEndX;
    }


    /**
     * @returns {boolean} True if the left key is pressed and the level start is not reached.
     */
    canMoveLeft() {
        return this.world.keyboard.left && this.x > 0;
    }


    /**
     * Moves Pepe to the right and lets him face right.
     */
    walkRight() {
        this.moveRight();
        this.otherDirection = false;
    }


    /**
     * Moves Pepe to the left and lets him face left.
     */
    walkLeft() {
        this.moveLeft();
        this.otherDirection = true;
    }
}
