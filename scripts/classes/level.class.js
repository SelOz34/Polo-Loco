/**
 * Holds all objects of one level.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    totalCoins;
    totalBottles;
    levelEndX = 3600;


    /**
     * Creates a level from its objects.
     * @param {MovableObject[]} enemies - All enemies including the endboss.
     * @param {MovableObject[]} clouds - Cloud layers.
     * @param {DrawableObject[]} backgroundObjects - Background layers.
     * @param {DrawableObject[]} coins - Collectable coins.
     * @param {DrawableObject[]} bottles - Collectable bottles.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.totalCoins = coins.length;
        this.totalBottles = bottles.length;
    }


    /**
     * Returns the endboss of the level.
     * @returns {Endboss} The endboss.
     */
    get endboss() {
        return this.enemies.find((enemy) => enemy instanceof Endboss);
    }
}
