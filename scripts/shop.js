const shopPrice = 10;
const damageBonus = 0.5;


/**
 * Shows the shop after a won level.
 * @param {number} level - The level that was just finished.
 */
function showShop(level) {
    document.getElementById('shopTitle').textContent = `Level ${level} geschafft!`;
    updateShopView();
    showScreen('shop');
}


/**
 * Shows the current coins and damage and enables the buy button only if enough coins are left.
 */
function updateShopView() {
    document.getElementById('shopCoins').textContent = playerProgress.coins;
    document.getElementById('shopDamage').textContent = `${Math.round(playerProgress.damage * 100)} %`;
    document.getElementById('buyDamageButton').disabled = playerProgress.coins < shopPrice;
}


/**
 * Buys 50 % more damage for 10 coins.
 */
function buyDamageUpgrade() {
    if (playerProgress.coins < shopPrice) return;
    playerProgress.coins -= shopPrice;
    playerProgress.damage += damageBonus;
    soundManager.play('coin');
    updateShopView();
}
