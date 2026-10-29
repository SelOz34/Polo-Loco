/**
 * Returns the HTML for the title and statistics on the end screen.
 * @param {{level: number, coins: number, totalCoins: number, defeatedEnemies: number}} stats - The game statistics.
 * @param {'next'|'won'|'lost'} result - How the level ended.
 * @returns {string} The HTML string.
 */
function generateEndStatsHtml(stats, result) {
    return /*html*/ `
        <p class="end-title">${generateEndTitle(stats.level, result)}</p>
        <p>Gesammelte Münzen: <strong>${stats.coins}</strong></p>
        <p>Besiegte Hühner: <strong>${stats.defeatedEnemies}</strong></p>
    `;
}


/**
 * Returns the title text for the end screen.
 * @param {number} level - The level that was played.
 * @param {'next'|'won'|'lost'} result - How the level ended.
 * @returns {string} The title text.
 */
function generateEndTitle(level, result) {
    if (result === 'next') return `Level ${level} geschafft!`;
    if (result === 'won') return `Alle ${maxLevel} Level geschafft!`;
    return `Level ${level} verloren – zurück zu Level 1`;
}
