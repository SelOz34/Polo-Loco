/**
 * A collectable coin that pulses slightly.
 * @extends MovableObject
 */
class Coin extends MovableObject {
    width = 110;
    height = 110;
    offset = { top: 38, right: 38, bottom: 38, left: 38 };

    images = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png'
    ];


    /**
     * Creates a coin at the given position.
     * @param {number} x - Horizontal position.
     * @param {number} y - Vertical position.
     */
    constructor(x, y) {
        super();
        this.loadImage(this.images[0]);
        this.loadImages(this.images);
        this.x = x;
        this.y = y;
        setStoppableInterval(() => this.playAnimation(this.images), 300);
    }
}
