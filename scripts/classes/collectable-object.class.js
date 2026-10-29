/**
 * Base class for items Pepe can collect (coins and bottles).
 * A collected item disappears and comes back after 15 seconds.
 * @extends MovableObject
 */
class CollectableObject extends MovableObject {
    respawnDelay = 15000;
    collectedAt = 0;


    /**
     * Marks the item as collected. It is hidden until the respawn delay is over.
     */
    collect() {
        this.collectedAt = Date.now();
    }


    /**
     * Checks whether the item is visible and can be collected.
     * @returns {boolean} True if it was never collected or the respawn delay is over.
     */
    isAvailable() {
        return Date.now() - this.collectedAt >= this.respawnDelay;
    }
}
