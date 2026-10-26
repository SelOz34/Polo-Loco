/**
 * The giant hen at the end of the level.
 * @extends Enemy
 */
class Endboss extends Enemy {
    width = 260;
    height = 303;
    x = 3500;
    y = 141;
    groundY = 141;
    damage = 35;
    canBeStomped = false;
    offset = { top: 110, right: 30, bottom: 25, left: 35 };

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


    /**
     * Creates the endboss and starts its animation.
     */
    constructor() {
        super();
        this.loadImage(this.imagesAlert[0]);
        this.loadImages(this.imagesAlert);
        setStoppableInterval(() => this.playAnimation(this.imagesAlert), 150);
    }


    /**
     * The boss is never removed from the level.
     * @returns {boolean} Always false.
     */
    isRemovable() {
        return false;
    }
}
