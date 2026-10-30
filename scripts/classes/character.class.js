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
    sleepDelay = 10000;
    offset = { top: 115, right: 35, bottom: 12, left: 30 };
    world;
    lastActionTime = Date.now();
    deathFinished = false;
    coins = 0;
    bottles = 0;
    damage = 1;

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

    imagesLongIdle = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
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

    imagesHurt = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png'
    ];

    imagesDead = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png'
    ];


    /**
     * Creates Pepe, preloads his animations and starts his loops.
     */
    constructor() {
        super();
        this.loadImage(this.imagesIdle[0]);
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesLongIdle);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
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
     * Does nothing once he is dead.
     */
    handleMovement() {
        if (!this.world || this.isDead()) return;
        if (this.canMoveRight()) this.walkRight();
        if (this.canMoveLeft()) this.walkLeft();
        if (this.canJump()) this.startJump();
        this.world.cameraX = -this.x + 100;
    }


    /**
     * Checks whether Pepe is allowed to walk to the right.
     * @returns {boolean} True if the right key is pressed and the level end is not reached.
     */
    canMoveRight() {
        return this.world.keyboard.right && this.x < this.world.level.levelEndX;
    }


    /**
     * Checks whether Pepe is allowed to walk to the left.
     * @returns {boolean} True if the left key is pressed and the level start is not reached.
     */
    canMoveLeft() {
        return this.world.keyboard.left && this.x > 0;
    }


    /**
     * Checks whether Pepe is allowed to jump.
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
        this.registerAction();
    }


    /**
     * Moves Pepe to the left and lets him face left.
     */
    walkLeft() {
        this.moveLeft();
        this.otherDirection = true;
        this.registerAction();
    }


    /**
     * Lets Pepe jump and plays the jump sound.
     */
    startJump() {
        this.jump(this.jumpSpeed);
        soundManager.play('jump');
        this.registerAction();
    }


    /**
     * Small jump after stomping an enemy.
     */
    bounce() {
        this.speedY = 11;
    }


    /**
     * Remembers the time of the last player action (used for the sleep animation).
     */
    registerAction() {
        this.lastActionTime = Date.now();
    }


    /**
     * Applies damage to Pepe and plays the hurt sound.
     * @param {number} damage - Amount of energy to remove.
     * @returns {boolean} True if the damage was applied.
     */
    takeDamage(damage) {
        if (!this.hit(damage)) return false;
        soundManager.play('hurt');
        this.registerAction();
        return true;
    }


    /**
     * Checks whether Pepe has been inactive long enough to fall asleep.
     * @returns {boolean} True if Pepe did nothing for longer than the sleep delay.
     */
    isSleeping() {
        return Date.now() - this.lastActionTime > this.sleepDelay;
    }


    /**
     * Checks whether the player is pressing a walking key.
     * @returns {boolean} True if a walking key is pressed.
     */
    isWalking() {
        return this.world && (this.world.keyboard.right || this.world.keyboard.left);
    }


    /**
     * Chooses and plays the animation that matches Pepe's current state.
     */
    updateAnimation() {
        if (this.isDead()) this.playDeathAnimation();
        else if (this.isHurt()) this.showState('hurt', this.imagesHurt);
        else if (this.isAboveGround()) this.playJumpAnimation();
        else if (this.isWalking()) this.showState('walk', this.imagesWalking);
        else if (this.isSleeping()) this.showState('sleep', this.imagesLongIdle, true, 2);
        else this.showState('idle', this.imagesIdle, true, 2);
        this.updateSnoreSound();
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


    /**
     * Plays the death animation once and marks it as finished afterwards.
     */
    playDeathAnimation() {
        this.showState('dead', this.imagesDead, false);
        if (this.currentImage > this.imagesDead.length + 5) {
            this.deathFinished = true;
        }
    }


    /**
     * Starts the snoring sound while Pepe sleeps and stops it otherwise.
     */
    updateSnoreSound() {
        if (this.animationState === 'sleep') soundManager.startLoop('snore');
        else soundManager.stopLoop('snore');
    }
}
