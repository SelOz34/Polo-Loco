/**
 * A slowly drifting cloud layer.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    width = 720;
    height = 480;
    y = 0;
    speed = 0.15;


    /**
     * Creates a cloud layer and starts its movement.
     * @param {string} imagePath - Path to the cloud image.
     * @param {number} x - Horizontal start position.
     */
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        setStoppableInterval(() => this.moveLeft(), 1000 / 60);
    }
}
