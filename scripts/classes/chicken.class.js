/**
 * Normal chicken: slow, walks towards Pepe.
 * @extends Enemy
 */
class Chicken extends Enemy {
    width = 70;
    height = 68;
    y = 355;
    groundY = 355;
    damage = 20;
    offset = { top: 6, right: 4, bottom: 8, left: 4 };

    imagesWalking = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    imageDead = 'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';


    /**
     * Creates a chicken at the given x position with a random speed.
     * @param {number} x - Horizontal start position.
     * @param {number} strength - Number of stomps needed to defeat it.
     */
    constructor(x, strength) {
        super();
        this.loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages([this.imageDead]);
        this.x = x;
        this.energy = strength;
        this.speed = 0.4 + Math.random() * 0.5;
        this.animate();
    }


    /**
     * Starts the movement loop and the animation loop.
     */
    animate() {
        setStoppableInterval(() => this.move(), 1000 / 60);
        setStoppableInterval(() => this.updateAnimation(), 150);
    }


    /**
     * Moves the chicken to the left while it is alive and active.
     */
    move() {
        if (!this.isDead() && this.isActive()) this.moveLeft();
    }


    /**
     * Shows the walking animation or the dead image.
     */
    updateAnimation() {
        if (this.isDead()) this.img = this.imageCache[this.imageDead];
        else this.playAnimation(this.imagesWalking);
    }
}
