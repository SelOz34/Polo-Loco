/**
 * Creates a fresh instance of level 1.
 * A new level is created on every (re)start, so no old state is kept.
 * The empty lists are filled step by step in the next stages.
 * @returns {Level} The new level.
 */
function createLevel1() {
    return new Level([], [], [], [], []);
}
