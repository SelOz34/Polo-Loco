/**
 * Level 3: chickens and chicks need 3 stomps, the endboss needs 30 bottle hits.
 * 8 chickens, 7 chicks and 36 bottles.
 * @returns {Level} A fresh instance of level 3.
 */
function createLevel3() {
    return buildLevel({
        number: 3,
        chickens: [840, 1150, 1490, 1790, 2090, 2440, 2750, 3030],
        chicks: [1010, 1330, 1680, 1990, 2280, 2660, 2920],
        bottles: [
            330, 420, 490, 580, 660, 760, 850, 930, 1020, 1090,
            1180, 1270, 1350, 1430, 1530, 1620, 1690, 1780, 1840, 1950,
            2030, 2130, 2210, 2280, 2360, 2460, 2520, 2620, 2700, 2780,
            2860, 2970, 3030, 3120, 3210, 3310
        ]
    });
}
