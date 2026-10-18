/**
 * A single background layer image.
 * @extends DrawableObject
 */
class BackgroundObject extends DrawableObject {
    width = 720;
    height = 480;


    /**
     * Creates a background layer at the given x position.
     * @param {string} imagePath - Path to the layer image.
     * @param {number} x - Horizontal position in the level.
     */
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = 0;
    }
}
