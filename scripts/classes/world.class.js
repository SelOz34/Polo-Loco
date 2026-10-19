/**
 * The game world: holds the level and the character
 * and draws everything onto the canvas.
 */
class World {
    character = new Character();
    level;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    isRunning = true;
    animationFrameId;


    /**
     * Creates the world and starts drawing and checking.
     * @param {HTMLCanvasElement} canvas - The game canvas.
     * @param {Keyboard} keyboard - The input state.
     * @param {Level} level - The level to play.
     */
    constructor(canvas, keyboard, level) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.level = level;
        this.setWorld();
        this.draw();
        this.run();
    }


    /**
     * Gives the character and all enemies a reference to this world.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach((enemy) => enemy.world = this);
    }


    /**
     * Starts the game logic loop.
     */
    run() {
        setStoppableInterval(() => this.checkGameState(), 1000 / 60);
    }


    /**
     * Runs all checks of one game tick.
     */
    checkGameState() {
        this.checkEnemyCollisions();
    }


    /**
     * Checks every enemy for a collision with Pepe and lets him take damage.
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) this.character.takeDamage(enemy.damage);
        });
    }


    /**
     * Stops the drawing loop.
     */
    stop() {
        this.isRunning = false;
        cancelAnimationFrame(this.animationFrameId);
    }


    /**
     * Draws one frame and requests the next one.
     */
    draw() {
        const camera = Math.round(this.cameraX);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(camera, 0);
        this.drawWorldObjects();
        this.ctx.translate(-camera, 0);
        if (this.isRunning) this.animationFrameId = requestAnimationFrame(() => this.draw());
    }


    /**
     * Draws all objects that move with the camera.
     */
    drawWorldObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
    }


    /**
     * Draws a list of objects.
     * @param {DrawableObject[]} objects - The objects to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach((object) => this.addToMap(object));
    }


    /**
     * Draws one object, mirrored if it faces the other direction.
     * @param {DrawableObject} object - The object to draw.
     */
    addToMap(object) {
        if (object.otherDirection) this.flipImage(object);
        object.draw(this.ctx);
        if (object.otherDirection) this.flipImageBack(object);
    }


    /**
     * Mirrors the canvas horizontally to draw an object facing left.
     * @param {MovableObject} object - The object to mirror.
     */
    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }


    /**
     * Restores the canvas after drawing a mirrored object.
     * @param {MovableObject} object - The mirrored object.
     */
    flipImageBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }
}
