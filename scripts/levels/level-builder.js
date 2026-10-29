/**
 * Builds a level from its configuration.
 * Each level file (level1.js to level5.js) only defines its own positions and strength.
 * @param {{number: number, chickens: number[], chicks: number[], bottles: number[]}} config - The level setup.
 * @returns {Level} The new level.
 */
function buildLevel(config) {
    return new Level(
        createLevelEnemies(config),
        createLevelClouds(),
        createLevelBackgrounds(),
        createLevelCoins(),
        config.bottles.map((x) => new Bottle(x)),
        config.number
    );
}


/**
 * Creates the chickens, chicks and the endboss with the strength of the level.
 * @param {{number: number, chickens: number[], chicks: number[]}} config - The level setup.
 * @returns {Enemy[]} All enemies of the level.
 */
function createLevelEnemies(config) {
    const enemies = [];
    config.chickens.forEach((x) => enemies.push(new Chicken(x, config.number)));
    config.chicks.forEach((x) => enemies.push(new SmallChicken(x, config.number)));
    enemies.push(new Endboss(config.number));
    return enemies;
}


/**
 * Creates the drifting cloud layers.
 * @returns {Cloud[]} All clouds of the level.
 */
function createLevelClouds() {
    const clouds = [];
    for (let i = 0; i < 6; i++) {
        const imageNumber = i % 2 === 0 ? 1 : 2;
        clouds.push(new Cloud(`assets/img/5_background/layers/4_clouds/${imageNumber}.png`, i * 719));
    }
    return clouds;
}


/**
 * Creates the background layers. Each segment is 719 px wide and overlaps
 * the next one by 1 px, so there are no gaps between the images.
 * @returns {BackgroundObject[]} All background layers of the level.
 */
function createLevelBackgrounds() {
    const backgrounds = [];
    for (let i = -1; i <= 6; i++) {
        backgrounds.push(...createBackgroundSegment(i * 719, Math.abs(i) % 2 === 0 ? 1 : 2));
    }
    return backgrounds;
}


/**
 * Creates the four layers of one background segment.
 * @param {number} x - Horizontal position of the segment.
 * @param {number} imageNumber - 1 or 2, the two images alternate seamlessly.
 * @returns {BackgroundObject[]} The four layers from back to front.
 */
function createBackgroundSegment(x, imageNumber) {
    const layerPath = 'assets/img/5_background/layers/';
    return [
        new BackgroundObject(`${layerPath}air.png`, x),
        new BackgroundObject(`${layerPath}3_third_layer/${imageNumber}.png`, x),
        new BackgroundObject(`${layerPath}2_second_layer/${imageNumber}.png`, x),
        new BackgroundObject(`${layerPath}1_first_layer/${imageNumber}.png`, x)
    ];
}


/**
 * Creates the coins, arranged in small arcs.
 * @returns {Coin[]} All coins of the level.
 */
function createLevelCoins() {
    const positions = [
        [400, 260], [470, 210], [540, 260],
        [1150, 230], [1220, 170], [1290, 230],
        [1900, 250], [1970, 190], [2040, 250],
        [2750, 200]
    ];
    return positions.map(([x, y]) => new Coin(x, y));
}
