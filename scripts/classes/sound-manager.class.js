/**
 * Loads, plays and mutes all sounds of the game.
 * The mute state is stored in the local storage.
 */
class SoundManager {
    sounds = {};
    isMuted = false;

    static storageKey = 'polloLocoMuted';

    static files = {
        music: 'assets/audio/music.mp3',
        jump: 'assets/audio/jump.mp3',
        hurt: 'assets/audio/hurt.mp3',
        snore: 'assets/audio/snore.mp3',
        coin: 'assets/audio/coin.mp3',
        'bottle-collect': 'assets/audio/bottle-collect.mp3',
        throw: 'assets/audio/throw.mp3',
        'bottle-break': 'assets/audio/bottle-break.mp3',
        'chicken-dead': 'assets/audio/chicken-dead.mp3',
        'chick-dead': 'assets/audio/chick-dead.mp3',
        'boss-alert': 'assets/audio/boss-alert.mp3',
        'boss-hurt': 'assets/audio/boss-hurt.mp3',
        'boss-dead': 'assets/audio/boss-dead.mp3',
        win: 'assets/audio/win.mp3',
        lose: 'assets/audio/lose.mp3'
    };

    static volumes = {
        music: 0.3,
        snore: 0.7,
        coin: 0.3,
        jump: 0.35,
        throw: 0.8,
        'chicken-dead': 0.5,
        'chick-dead': 0.4,
        'boss-alert': 0.7,
        'boss-hurt': 0.7,
        'boss-dead': 0.8
    };


    /**
     * Reads the saved mute state and loads all sounds.
     */
    constructor() {
        this.isMuted = this.loadMuteState();
        this.loadSounds();
    }


    /**
     * Creates an audio element for every sound file.
     */
    loadSounds() {
        Object.entries(SoundManager.files).forEach(([name, path]) => {
            const audio = new Audio(path);
            audio.volume = SoundManager.volumes[name] ?? 0.5;
            audio.loop = name === 'music' || name === 'snore';
            this.sounds[name] = audio;
        });
    }


    /**
     * Plays a sound effect from the beginning.
     * @param {string} name - Name of the sound.
     */
    play(name) {
        if (this.isMuted) return;
        const audio = this.sounds[name];
        audio.currentTime = 0;
        audio.play().catch(() => { });
    }


    /**
     * Starts a looping sound if it is not already playing.
     * @param {string} name - Name of the sound.
     */
    startLoop(name) {
        const audio = this.sounds[name];
        if (this.isMuted || !audio.paused) return;
        audio.play().catch(() => { });
    }


    /**
     * Pauses a looping sound.
     * @param {string} name - Name of the sound.
     */
    stopLoop(name) {
        const audio = this.sounds[name];
        if (!audio.paused) audio.pause();
    }


    /**
     * Stops all sounds and rewinds them.
     */
    stopAll() {
        Object.values(this.sounds).forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
        });
    }


    /**
     * Switches between muted and unmuted and saves the new state.
     * @returns {boolean} The new mute state.
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        this.saveMuteState();
        if (this.isMuted) this.stopAll();
        return this.isMuted;
    }


    /**
     * Reads the mute state from the local storage.
     * @returns {boolean} True if the game was muted last time.
     */
    loadMuteState() {
        try {
            return localStorage.getItem(SoundManager.storageKey) === 'true';
        } catch (error) {
            return false;
        }
    }


    /**
     * Saves the mute state in the local storage.
     */
    saveMuteState() {
        try {
            localStorage.setItem(SoundManager.storageKey, String(this.isMuted));
        } catch (error) {
            return;
        }
    }
}
