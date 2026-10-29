/**
 * Level 2: chickens and chicks need 2 stomps, the endboss needs 20 bottle hits.
 * 7 chickens, 6 chicks and 24 bottles.
 * @returns {Level} A fresh instance of level 2.
 */
function createLevel2() {
    return buildLevel({
        number: 2,
        chickens: [840, 1190, 1600, 1920, 2320, 2670, 3010],
        chicks: [1000, 1350, 1770, 2140, 2530, 2940],
        bottles: [
            340, 450, 580, 720, 860, 980, 1100, 1250, 1350, 1500,
            1610, 1740, 1870, 2000, 2150, 2260, 2400, 2530, 2650, 2780,
            2900, 3030, 3160, 3310
        ]
    });
}
