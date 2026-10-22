/**
 * A status bar for health, coins, bottles or the endboss.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    width = 200;
    height = 53;
    percentage = 0;
    images = [];

    static imagePaths = {
        health: StatusBar.createPaths('assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/'),
        coin: StatusBar.createPaths('assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/'),
        bottle: StatusBar.createPaths('assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/'),
        endboss: StatusBar.createPaths('assets/img/7_statusbars/2_statusbar_endboss/orange/orange')
    };


    /**
     * Builds the six image paths (0, 20, 40, 60, 80, 100) of a status bar.
     * @param {string} basePath - Path prefix of the images.
     * @returns {string[]} The six image paths.
     */
    static createPaths(basePath) {
        return [0, 20, 40, 60, 80, 100].map((value) => `${basePath}${value}.png`);
    }


    /**
     * Creates a status bar.
     * @param {'health'|'coin'|'bottle'|'endboss'} type - Kind of status bar.
     * @param {number} x - Horizontal position on the screen.
     * @param {number} y - Vertical position on the screen.
     * @param {number} percentage - Start value in percent.
     */
    constructor(type, x, y, percentage) {
        super();
        this.images = StatusBar.imagePaths[type];
        this.loadImages(this.images);
        this.x = x;
        this.y = y;
        this.setPercentage(percentage);
    }


    /**
     * Updates the value of the status bar and shows the matching image.
     * @param {number} percentage - New value between 0 and 100.
     */
    setPercentage(percentage) {
        this.percentage = Math.max(0, Math.min(100, percentage));
        const index = Math.ceil(this.percentage / 20);
        this.img = this.imageCache[this.images[index]];
    }
}
