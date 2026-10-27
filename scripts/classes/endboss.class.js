/**
 * The giant hen at the end of the level.
 * Waits until Pepe comes close, then alerts and chases him.
 * @extends Enemy
 */
class Endboss extends Enemy {
    width = 260;
    height = 303;
    x = 3500;
    y = 141;
    groundY = 141;
    speed = 1.6;
    damage = 35;
    canBeStomped = false;
    offset = { top: 110, right: 30, bottom: 25, left: 35 };
    isActivated = false;
    alertStartTime = 0;

    imagesWalking = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    imagesAlert = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    imagesAttack = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];


    /**
     * Creates the endboss and starts its loops.
     */
    constructor() {
        super();
        this.loadImage(this.imagesAlert[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesAttack);
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
     * Activates the boss when Pepe comes close, afterwards chases him.
     */
    move() {
        if (!this.world) return;
        if (!this.isActivated) this.checkActivation();
        else if (this.isChasing()) this.moveTowardsCharacter();
    }


    /**
     * Activates the boss once Pepe is within 500 pixels.
     */
    checkActivation() {
        if (this.x - this.world.character.x < 500) {
            this.isActivated = true;
            this.alertStartTime = Date.now();
        }
    }


    /**
     * @returns {boolean} True during the alert phase right after activation.
     */
    isAlerting() {
        return Date.now() - this.alertStartTime < 1600;
    }


    /**
     * @returns {boolean} True if the boss is allowed to walk towards Pepe.
     */
    isChasing() {
        return !this.isAlerting() && !this.world.character.isDead();
    }


    /**
     * Returns the horizontal distance between Pepe's center and the boss's center.
     * @returns {number} Positive if Pepe is right of the boss.
     */
    getDistanceToCharacter() {
        const character = this.world.character;
        return (character.x + character.width / 2) - (this.x + this.width / 2);
    }


    /**
     * Walks towards Pepe. Gets faster while attacking.
     */
    moveTowardsCharacter() {
        const distance = this.getDistanceToCharacter();
        const currentSpeed = this.isAttacking() ? this.speed * 1.8 : this.speed;
        this.otherDirection = distance > 0;
        if (Math.abs(distance) > 30) this.x += distance > 0 ? currentSpeed : -currentSpeed;
    }


    /**
     * @returns {boolean} True if Pepe is close enough to be attacked.
     */
    isAttacking() {
        return this.isActivated && Math.abs(this.getDistanceToCharacter()) < 220;
    }


    /**
     * Chooses and plays the animation that matches the current state.
     */
    updateAnimation() {
        if (!this.isActivated || this.isAlerting()) this.showState('alert', this.imagesAlert);
        else if (this.isAttacking()) this.showState('attack', this.imagesAttack);
        else this.showState('walk', this.imagesWalking);
    }


    /**
     * The boss is never removed from the level.
     * @returns {boolean} Always false.
     */
    isRemovable() {
        return false;
    }
}
