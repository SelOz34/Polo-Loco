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
    number;


    /**
     * Creates a level from its objects.
     * @param {MovableObject[]} enemies - All enemies including the endboss.
     * @param {MovableObject[]} clouds - Cloud layers.
     * @param {DrawableObject[]} backgroundObjects - Background layers.
     * @param {DrawableObject[]} coins - Collectable coins.
     * @param {DrawableObject[]} bottles - Collectable bottles.
     * @param {number} number - Level number (1 to 5), also the strength of the enemies.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles, number) {
        this.number = number;
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
