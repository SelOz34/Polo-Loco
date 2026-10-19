/**
 * Normal chicken: slow, walks towards Pepe.
 * @extends Enemy
 */
class Chicken extends Enemy {
    width = 70;
    height = 68;
    y = 355;
    groundY = 355;

    imagesWalking = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    /**
     * Creates a chicken at the given x position with a random speed.
     * @param {number} x - Horizontal start position.
     */
    constructor(x) {
        super();
        this.loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.x = x;
        this.speed = 0.4 + Math.random() * 0.5;
        this.animate();
    }


    /**
     * Starts the movement loop and the animation loop.
     */
    animate() {
        setStoppableInterval(() => this.move(), 1000 / 60);
        setStoppableInterval(() => this.playAnimation(this.imagesWalking), 150);
    }


    /**
     * Moves the chicken to the left while it is active.
     */
    move() {
        if (this.isActive()) this.moveLeft();
    }
}
