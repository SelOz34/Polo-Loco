/**
 * Pepe, the playable character.
 * @extends MovableObject
 */
class Character extends MovableObject {
    width = 130;
    height = 270;
    x = 100;
    y = 150;
    groundY = 150;
    speed = 5;
    acceleration = 0.9;
    jumpSpeed = 17;
    world;

    imagesIdle = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    imagesWalking = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    imagesJumping = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png'
    ];


    /**
     * Creates Pepe, preloads his animations and starts his loops.
     */
    constructor() {
        super();
        this.loadImage(this.imagesIdle[0]);
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.applyGravity();
        this.animate();
    }


    /**
     * Starts the movement loop and the animation loop.
     */
    animate() {
        setStoppableInterval(() => this.handleMovement(), 1000 / 60);
        setStoppableInterval(() => this.updateAnimation(), 100);
    }


    /**
     * Reads the keyboard, moves Pepe and lets the camera follow him.
     */
    handleMovement() {
        if (!this.world) return;
        if (this.canMoveRight()) this.walkRight();
        if (this.canMoveLeft()) this.walkLeft();
        if (this.canJump()) this.startJump();
        this.world.cameraX = -this.x + 100;
    }


    /**
     * @returns {boolean} True if the right key is pressed and the level end is not reached.
     */
    canMoveRight() {
        return this.world.keyboard.right && this.x < this.world.level.levelEndX;
    }


    /**
     * @returns {boolean} True if the left key is pressed and the level start is not reached.
     */
    canMoveLeft() {
        return this.world.keyboard.left && this.x > 0;
    }


    /**
     * @returns {boolean} True if the jump key is pressed and Pepe stands on the ground.
     */
    canJump() {
        return this.world.keyboard.jump && !this.isAboveGround();
    }


    /**
     * Moves Pepe to the right and lets him face right.
     */
    walkRight() {
        this.moveRight();
        this.otherDirection = false;
    }


    /**
     * Moves Pepe to the left and lets him face left.
     */
    walkLeft() {
        this.moveLeft();
        this.otherDirection = true;
    }


    /**
     * Lets Pepe jump.
     */
    startJump() {
        this.jump(this.jumpSpeed);
    }


    /**
     * @returns {boolean} True if a walking key is pressed.
     */
    isWalking() {
        return this.world && (this.world.keyboard.right || this.world.keyboard.left);
    }


    /**
     * Chooses and plays the animation that matches Pepe's current state.
     */
    updateAnimation() {
        if (this.isAboveGround()) this.playJumpAnimation();
        else if (this.isWalking()) this.showState('walk', this.imagesWalking);
        else this.showState('idle', this.imagesIdle, true, 2);
    }


    /**
     * Shows the jump image that fits the current vertical speed,
     * so the animation always matches the jump curve.
     */
    playJumpAnimation() {
        this.animationState = 'jump';
        let index = 6;
        if (this.speedY > 10) index = 2;
        else if (this.speedY > 3) index = 3;
        else if (this.speedY > -3) index = 4;
        else if (this.speedY > -10) index = 5;
        this.img = this.imageCache[this.imagesJumping[index]];
    }
}
