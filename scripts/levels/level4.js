/**
 * Level 4: chickens and chicks need 4 stomps, the endboss needs 40 bottle hits.
 * 9 chickens, 8 chicks and 48 bottles.
 * @returns {Level} A fresh instance of level 4.
 */
function createLevel4() {
    return buildLevel({
        number: 4,
        chickens: [820, 1120, 1400, 1710, 1980, 2250, 2480, 2770, 3040],
        chicks: [1030, 1320, 1530, 1810, 2090, 2370, 2670, 2960],
        bottles: [
            320, 380, 450, 520, 580, 660, 710, 770, 840, 900,
            950, 1040, 1100, 1160, 1220, 1270, 1340, 1390, 1470, 1520,
            1580, 1650, 1710, 1780, 1830, 1890, 1960, 2020, 2100, 2150,
            2240, 2290, 2340, 2410, 2470, 2540, 2590, 2680, 2750, 2790,
            2860, 2910, 2970, 3040, 3100, 3180, 3230, 3290
        ]
    });
}
