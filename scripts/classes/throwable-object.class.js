/**
 * A thrown salsa bottle that rotates and splashes on impact.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    width = 70;
    height = 70;
    groundY = 355;
    acceleration = 0.6;
    throwSpeed = 9;
    direction = 1;
    isSplashing = false;
    isFinished = false;
    offset = { top: 15, right: 22, bottom: 15, left: 22 };

    imagesRotation = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    imagesSplash = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    /**
     * Creates a thrown bottle and starts its flight.
     * @param {number} x - Horizontal start position.
     * @param {number} y - Vertical start position.
     * @param {number} direction - 1 for right, -1 for left.
     */
    constructor(x, y, direction) {
        super();
        this.loadImage(this.imagesRotation[0]);
        this.loadImages(this.imagesRotation);
        this.loadImages(this.imagesSplash);
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.speedY = 9;
        this.applyGravity();
        this.animate();
    }


    /**
     * Starts the flight loop and the animation loop.
     */
    animate() {
        setStoppableInterval(() => this.fly(), 1000 / 60);
        setStoppableInterval(() => this.updateAnimation(), 70);
    }


    /**
     * Moves the bottle forward and splashes it when it reaches the ground.
     */
    fly() {
        if (this.isSplashing) return;
        this.x += this.throwSpeed * this.direction;
        if (this.y >= this.groundY) this.splash();
    }


    /**
     * The bottle keeps falling until it splashes.
     * @returns {boolean} True while the bottle is flying.
     */
    isAboveGround() {
        return !this.isSplashing;
    }


    /**
     * Stops the fall without moving the bottle (it may splash in mid-air).
     */
    landOnGround() {
        this.speedY = 0;
    }


    /**
     * Lets the bottle burst and plays the breaking sound.
     */
    splash() {
        if (this.isSplashing) return;
        this.isSplashing = true;
        this.speedY = 0;
        this.currentImage = 0;
        soundManager.play('bottle-break');
    }


    /**
     * Plays the rotation or the splash animation.
     */
    updateAnimation() {
        if (!this.isSplashing) {
            this.playAnimation(this.imagesRotation);
            return;
        }
        this.playAnimation(this.imagesSplash, false);
        if (this.currentImage > this.imagesSplash.length) this.isFinished = true;
    }
}
