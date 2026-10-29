/**
 * Level 1: chickens and chicks die with one stomp, the endboss needs 10 bottle hits.
 * 6 chickens, 5 chicks and 12 bottles.
 * @returns {Level} A fresh instance of level 1.
 */
function createLevel1() {
    return buildLevel({
        number: 1,
        chickens: [850, 1300, 1750, 2200, 2650, 3000],
        chicks: [1050, 1550, 2000, 2450, 2850],
        bottles: [
            350, 620, 900, 1120, 1400, 1650, 1880, 2100, 2380, 2620,
            2900, 3150
        ]
    });
}
