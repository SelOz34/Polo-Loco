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


    /**
     * Checks whether Pepe is close enough for the enemy to start moving.
     * @returns {boolean} True if the enemy is active.
     */
    isActive() {
        return this.world && this.x - this.world.character.x < this.activationDistance;
    }


    /**
     * Kills the enemy.
     */
    die() {
        this.energy = 0;
        this.deathTime = Date.now();
    }


    /**
     * Checks whether the dead enemy can be removed from the level.
     * @returns {boolean} True if the enemy died more than 1.5 seconds ago.
     */
    isRemovable() {
        return this.isDead() && Date.now() - this.deathTime > 1500;
    }
}
