/**
 * Shared logic of all enemies.
 * @extends MovableObject
 */
class Enemy extends MovableObject {
    world;
    damage = 20;
    activationDistance = 650;


    /**
     * Checks whether Pepe is close enough for the enemy to start moving.
     * @returns {boolean} True if the enemy is active.
     */
    isActive() {
        return this.world && this.x - this.world.character.x < this.activationDistance;
    }
}
