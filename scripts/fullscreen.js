/**
 * Prepares the fullscreen button: hides it if the browser has no fullscreen support
 * and keeps the icon in sync when fullscreen is entered or left.
 */
function setupFullscreen() {
    if (!isFullscreenSupported()) {
        document.getElementById('fullscreenButton').classList.add('is-unsupported');
        return;
    }
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
    document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
}


/**
 * Checks whether the browser can show the page in fullscreen.
 * @returns {boolean} True if the Fullscreen API is available.
 */
function isFullscreenSupported() {
    const page = document.documentElement;
    return Boolean(page.requestFullscreen || page.webkitRequestFullscreen);
}


/**
 * Returns the element that is currently shown in fullscreen.
 * @returns {Element|null} The fullscreen element, or null if fullscreen is off.
 */
function getFullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || null;
}


/**
 * Switches fullscreen on or off.
 */
function toggleFullscreen() {
    if (getFullscreenElement()) exitFullscreen();
    else enterFullscreen();
}


/**
 * Shows the whole page in fullscreen and tries to keep the device in landscape mode.
 */
function enterFullscreen() {
    const page = document.documentElement;
    const request = page.requestFullscreen || page.webkitRequestFullscreen;
    Promise.resolve(request.call(page))
        .then(lockLandscape)
        .catch(() => { });
}


/**
 * Leaves fullscreen mode.
 */
function exitFullscreen() {
    const exit = document.exitFullscreen || document.webkitExitFullscreen;
    Promise.resolve(exit.call(document)).catch(() => { });
}


/**
 * Locks the screen in landscape mode where the browser allows it (mainly Android).
 */
function lockLandscape() {
    if (!screen.orientation || !screen.orientation.lock) return;
    screen.orientation.lock('landscape').catch(() => { });
}


/**
 * Shows the icon that matches the current fullscreen state.
 */
function updateFullscreenIcon() {
    const icon = getFullscreenElement() ? 'fullscreen-exit' : 'fullscreen';
    document.getElementById('fullscreenIcon').src = `./assets/img/icons/${icon}.svg`;
}
