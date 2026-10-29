/**
 * Creates a fresh instance of level 1.
 * A new level is created on every (re)start, so no old state is kept.
 * @returns {Level} The new level.
 */
function createLevel1() {
    return new Level(
        createLevel1Enemies(),
        createLevel1Clouds(),
        createLevel1Backgrounds(),
        createLevel1Coins(),
        createLevel1Bottles()
    );
}


/**
 * Creates the chickens, chicks and the endboss.
 * The first enemies start far enough away so the player is not overrun at the start.
 * @returns {Enemy[]} All enemies of the level.
 */
function createLevel1Enemies() {
    const chickenPositions = [850, 1300, 1750, 2200, 2650, 3000];
    const chickPositions = [1050, 1550, 2000, 2450, 2850];
    const enemies = [];
    chickenPositions.forEach((x) => enemies.push(new Chicken(x)));
    chickPositions.forEach((x) => enemies.push(new SmallChicken(x)));
    enemies.push(new Endboss());
    return enemies;
}


/**
 * Creates the drifting cloud layers.
 * @returns {Cloud[]} All clouds of the level.
 */
function createLevel1Clouds() {
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
function createLevel1Backgrounds() {
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
function createLevel1Coins() {
    const positions = [
        [400, 260], [470, 210], [540, 260],
        [1150, 230], [1220, 170], [1290, 230],
        [1900, 250], [1970, 190], [2040, 250],
        [2750, 200]
    ];
    return positions.map(([x, y]) => new Coin(x, y));
}


/**
 * Creates the salsa bottles on the ground.
 * @returns {Bottle[]} All bottles of the level.
 */
function createLevel1Bottles() {
    const positions = [350, 620, 900, 1120, 1400, 1650, 1880, 2100, 2380, 2620, 2900, 3150];
    return positions.map((x) => new Bottle(x));
}
