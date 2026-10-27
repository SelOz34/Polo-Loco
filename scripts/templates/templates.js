/**
 * Returns the HTML for the statistics on the end screen.
 * @param {{coins: number, totalCoins: number, defeatedEnemies: number}} stats - The game statistics.
 * @returns {string} The HTML string.
 */
function generateEndStatsHtml(stats) {
    return /*html*/ `
        <p>Münzen: <strong>${stats.coins}</strong> / ${stats.totalCoins}</p>
        <p>Besiegte Hühner: <strong>${stats.defeatedEnemies}</strong></p>
    `;
}
