/**
 * Small chick: faster than the chicken and hops around.
 * @extends Enemy
 */
class SmallChicken extends Enemy {
    width = 55;
    height = 49;
    y = 376;
    groundY = 376;
    damage = 10;
    acceleration = 0.6;
    offset = { top: 4, right: 5, bottom: 5, left: 5 };

    imagesWalking = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    imageDead = 'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png';


    /**
     * Creates a small chick at the given x position with a random speed.
     * @param {number} x - Horizontal start position.
     */
    constructor(x) {
        super();
        this.loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages([this.imageDead]);
        this.x = x;
        this.speed = 0.9 + Math.random() * 0.7;
        this.applyGravity();
        this.animate();
    }


    /**
     * Starts the movement, hop and animation loops.
     */
    animate() {
        setStoppableInterval(() => this.move(), 1000 / 60);
        setStoppableInterval(() => this.hop(), 1200);
        setStoppableInterval(() => this.updateAnimation(), 120);
    }


    /**
     * Moves the chick to the left while it is alive and active.
     */
    move() {
        if (!this.isDead() && this.isActive()) this.moveLeft();
    }


    /**
     * Lets the chick hop now and then.
     */
    hop() {
        if (this.isDead() || !this.isActive() || this.isAboveGround()) return;
        if (Math.random() < 0.5) this.jump(8);
    }


    /**
     * Shows the walking animation or the dead image.
     */
    updateAnimation() {
        if (this.isDead()) this.img = this.imageCache[this.imageDead];
        else this.playAnimation(this.imagesWalking);
    }
}
