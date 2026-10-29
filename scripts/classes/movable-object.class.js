/**
 * Base class for all objects that move, animate, take damage or fall.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    groundY = 0;
    energy = 100;
    lastHit = 0;
    hurtDuration = 1000;
    animationState = '';


    /**
     * Starts the gravity loop of the object.
     */
    applyGravity() {
        setStoppableInterval(() => this.updateGravity(), 1000 / 60);
    }


    /**
     * Moves the object vertically according to its speed and acceleration.
     */
    updateGravity() {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        } else {
            this.landOnGround();
        }
    }


    /**
     * Places the object exactly on the ground and stops the fall.
     */
    landOnGround() {
        this.y = this.groundY;
        this.speedY = 0;
    }


    /**
     * Checks whether the object is above its ground level.
     * @returns {boolean} True if the object is in the air.
     */
    isAboveGround() {
        return this.y < this.groundY;
    }


    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * Starts a jump with the given vertical speed.
     * @param {number} jumpSpeed - Initial upward speed.
     */
    jump(jumpSpeed) {
        this.speedY = jumpSpeed;
    }


    /**
     * Reduces the energy of the object, unless it is still hurt or already dead.
     * @param {number} damage - Amount of energy to remove.
     * @returns {boolean} True if the hit was applied.
     */
    hit(damage) {
        if (this.isHurt() || this.isDead()) return false;
        this.energy = Math.max(0, this.energy - damage);
        this.lastHit = Date.now();
        return true;
    }


    /**
     * Checks whether the object was hit recently.
     * @returns {boolean} True while the hurt time is running.
     */
    isHurt() {
        return Date.now() - this.lastHit < this.hurtDuration;
    }


    /**
     * Checks whether the object has no energy left.
     * @returns {boolean} True if the object is dead.
     */
    isDead() {
        return this.energy <= 0;
    }


    /**
     * Shows the next image of an animation.
     * @param {string[]} images - Image paths of the animation.
     * @param {boolean} [loop=true] - Whether the animation repeats.
     * @param {number} [ticksPerFrame=1] - How many animation ticks one image is shown.
     */
    playAnimation(images, loop = true, ticksPerFrame = 1) {
        let index = Math.floor(this.currentImage / ticksPerFrame);
        index = loop ? index % images.length : Math.min(index, images.length - 1);
        this.img = this.imageCache[images[index]];
        this.currentImage++;
    }


    /**
     * Switches to a new animation state and plays it.
     * Resets the frame counter when the state changes.
     * @param {string} state - Name of the animation state.
     * @param {string[]} images - Image paths of the animation.
     * @param {boolean} [loop=true] - Whether the animation repeats.
     * @param {number} [ticksPerFrame=1] - How many animation ticks one image is shown.
     */
    showState(state, images, loop = true, ticksPerFrame = 1) {
        if (this.animationState !== state) {
            this.animationState = state;
            this.currentImage = 0;
        }
        this.playAnimation(images, loop, ticksPerFrame);
    }
}
