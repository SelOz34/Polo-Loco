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
    throwableObjects = [];
    lastThrowTime = 0;
    throwCooldown = 600;
    defeatedEnemies = 0;
    isRunning = true;
    animationFrameId;
    gameEnded = false;
    healthBar;
    coinBar;
    bottleBar;
    endbossBar;


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
        this.createStatusBars();
        this.setWorld();
        this.draw();
        this.run();
    }


    /**
     * Creates the status bars for health, coins, bottles and the endboss.
     */
    createStatusBars() {
        this.healthBar = new StatusBar('health', 15, 0, 100);
        this.coinBar = new StatusBar('coin', 15, 42, 0);
        this.bottleBar = new StatusBar('bottle', 15, 84, 0);
        this.endbossBar = new StatusBar('endboss', 505, 5, 100);
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
        this.checkThrowObjects();
        this.checkEnemyCollisions();
        this.checkBottleHits();
        this.collectCoins();
        this.collectBottles();
        this.removeFinishedObjects();
        this.endbossBar.setPercentage(this.level.endboss.energy);
        this.checkGameEnd();
    }


    /**
     * Throws a bottle if the throw key is pressed and throwing is allowed.
     */
    checkThrowObjects() {
        if (this.canThrowBottle()) this.throwBottle();
    }


    /**
     * @returns {boolean} True if Pepe is alive, has bottles and the cooldown is over.
     */
    canThrowBottle() {
        const cooldownOver = Date.now() - this.lastThrowTime > this.throwCooldown;
        return this.keyboard.throw && this.character.bottles > 0 && !this.character.isDead() && cooldownOver;
    }


    /**
     * Creates a flying bottle in Pepe's viewing direction and updates the bottle bar.
     */
    throwBottle() {
        const direction = this.character.otherDirection ? -1 : 1;
        const x = this.character.x + (direction > 0 ? 70 : -10);
        this.throwableObjects.push(new ThrowableObject(x, this.character.y + 110, direction));
        this.character.bottles--;
        this.character.registerAction();
        this.lastThrowTime = Date.now();
        this.updateBottleBar();
        soundManager.play('throw');
    }


    /**
     * Checks every living enemy for a collision with Pepe.
     */
    checkEnemyCollisions() {
        if (this.character.isDead()) return;
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead() || !this.character.isColliding(enemy)) return;
            if (this.isStomping(enemy)) this.stompEnemy(enemy);
            else if (this.character.takeDamage(enemy.damage)) this.healthBar.setPercentage(this.character.energy);
        });
    }


    /**
     * Checks whether Pepe lands on top of an enemy.
     * Only counts if he is falling and his feet are in the upper part of the enemy.
     * @param {Enemy} enemy - The enemy Pepe collides with.
     * @returns {boolean} True if the enemy is stomped.
     */
    isStomping(enemy) {
        if (!enemy.canBeStomped || this.character.speedY >= 0) return false;
        const feet = this.character.getHitbox().bottom;
        const box = enemy.getHitbox();
        return feet < box.top + (box.bottom - box.top) * 0.6;
    }


    /**
     * Kills a stomped enemy and lets Pepe bounce off.
     * @param {Enemy} enemy - The stomped enemy.
     */
    stompEnemy(enemy) {
        this.killEnemy(enemy);
        this.character.bounce();
    }


    /**
     * Kills an enemy and counts it.
     * @param {Enemy} enemy - The enemy to kill.
     */
    killEnemy(enemy) {
        enemy.die();
        this.defeatedEnemies++;
    }


    /**
     * Checks whether a flying bottle hits a living enemy.
     */
    checkBottleHits() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isSplashing) return;
            const target = this.level.enemies.find((enemy) => !enemy.isDead() && bottle.isColliding(enemy));
            if (target) this.hitEnemyWithBottle(bottle, target);
        });
    }


    /**
     * Lets the bottle splash and damages or kills the enemy.
     * @param {ThrowableObject} bottle - The bottle that hit.
     * @param {Enemy} enemy - The enemy that was hit.
     */
    hitEnemyWithBottle(bottle, enemy) {
        bottle.splash();
        if (enemy instanceof Endboss) enemy.hitByBottle();
        else this.killEnemy(enemy);
    }


    /**
     * Collects all coins Pepe touches and updates the coin bar.
     */
    collectCoins() {
        this.level.coins = this.level.coins.filter((coin) => {
            if (!this.character.isColliding(coin)) return true;
            this.character.coins++;
            soundManager.play('coin');
            return false;
        });
        this.coinBar.setPercentage(this.character.coins / this.level.totalCoins * 100);
    }


    /**
     * Collects all bottles Pepe touches and updates the bottle bar.
     */
    collectBottles() {
        this.level.bottles = this.level.bottles.filter((bottle) => {
            if (!this.character.isColliding(bottle)) return true;
            this.character.bottles++;
            soundManager.play('bottle-collect');
            return false;
        });
        this.updateBottleBar();
    }


    /**
     * Shows the current number of bottles in the bottle bar.
     */
    updateBottleBar() {
        this.bottleBar.setPercentage(this.character.bottles / this.level.totalBottles * 100);
    }


    /**
     * Removes splashed bottles and enemies that have been dead long enough.
     */
    removeFinishedObjects() {
        this.throwableObjects = this.throwableObjects.filter((bottle) => !bottle.isFinished);
        this.level.enemies = this.level.enemies.filter((enemy) => !enemy.isRemovable());
    }


    /**
     * Ends the game once Pepe's or the boss's death animation has finished.
     */
    checkGameEnd() {
        if (this.gameEnded) return;
        if (this.character.deathFinished) this.endGame(false);
        else if (this.level.endboss.deathFinished) this.endGame(true);
    }


    /**
     * Marks the game as ended and shows the end screen after a short delay.
     * @param {boolean} hasWon - True if the player won.
     */
    endGame(hasWon) {
        this.gameEnded = true;
        setTimeout(() => {
            if (this.isRunning) showEndScreen(hasWon);
        }, 600);
    }


    /**
     * Returns the statistics for the end screen.
     * @returns {{coins: number, totalCoins: number, defeatedEnemies: number}} The statistics.
     */
    getStats() {
        return {
            coins: this.character.coins,
            totalCoins: this.level.totalCoins,
            defeatedEnemies: this.defeatedEnemies
        };
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
        this.drawStatusBars();
        if (this.isRunning) this.animationFrameId = requestAnimationFrame(() => this.draw());
    }


    /**
     * Draws all objects that move with the camera.
     */
    drawWorldObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
    }


    /**
     * Draws the fixed status bars. The boss bar is only shown once the boss is active.
     */
    drawStatusBars() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        if (this.level.endboss.isActivated) this.addToMap(this.endbossBar);
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
