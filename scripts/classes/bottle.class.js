/**
 * A salsa bottle lying on the ground, ready to be collected.
 * @extends CollectableObject
 */
class Bottle extends CollectableObject {
    width = 80;
    height = 80;
    y = 349;
    offset = { top: 16, right: 15, bottom: 9, left: 30 };

    images = [
        'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];


    /**
     * Creates a bottle at the given x position with one of two random images.
     * @param {number} x - Horizontal position.
     */
    constructor(x) {
        super();
        const imageIndex = Math.random() < 0.5 ? 0 : 1;
        this.loadImage(this.images[imageIndex]);
        this.x = x;
    }
}
