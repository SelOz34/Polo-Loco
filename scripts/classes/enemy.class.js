/**
 * Shared logic of all enemies.
 * @extends MovableObject
 */
class Enemy extends MovableObject {
    world;
    damage = 20;
    canBeStomped = true;
    activationDistance = 650;
    deathTime = 0;
    deathSound = 'chicken-dead';
    hurtDuration = 400;


    /**
     * Checks whether Pepe is close enough for the enemy to start moving.
     * @returns {boolean} True if the enemy is active.
     */
    isActive() {
        return this.world && this.x - this.world.character.x < this.activationDistance;
    }


    /**
     * Takes one stomp from Pepe. The enemy dies when its energy is used up.
     * @param {number} damage - Pepe's damage (1 = 100 %).
     * @returns {boolean} True if the enemy died from this stomp.
     */
    takeStomp(damage) {
        if (!this.hit(damage)) return false;
        if (!this.isDead()) {
            soundManager.play(this.deathSound);
            return false;
        }
        this.die();
        return true;
    }


    /**
     * Draws chickens and chicks half transparent while they are hurt.
     * The endboss has its own hurt animation instead.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
     */
    draw(ctx) {
        if (this.canBeStomped && this.isHurt() && !this.isDead()) ctx.globalAlpha = 0.5;
        super.draw(ctx);
        ctx.globalAlpha = 1;
    }


    /**
     * Kills the enemy and plays its death sound.
     */
    die() {
        this.energy = 0;
        this.deathTime = Date.now();
        soundManager.play(this.deathSound);
    }


    /**
     * Checks whether the dead enemy can be removed from the level.
     * @returns {boolean} True if the enemy died more than 1.5 seconds ago.
     */
    isRemovable() {
        return this.isDead() && Date.now() - this.deathTime > 1500;
    }
}
