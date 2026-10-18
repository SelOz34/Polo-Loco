/**
 * Creates a fresh instance of level 1.
 * A new level is created on every (re)start, so no old state is kept.
 * @returns {Level} The new level.
 */
function createLevel1() {
    return new Level([], [], createLevel1Backgrounds(), [], []);
}


/**
 * Creates the background layers.
 * @returns {BackgroundObject[]} All background layers of the level.
 */
function createLevel1Backgrounds() {
    return createBackgroundSegment(0, 1);
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
