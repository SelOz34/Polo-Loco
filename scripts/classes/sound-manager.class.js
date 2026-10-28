/**
 * Loads and plays all sounds of the game.
 */
class SoundManager {
    sounds = {};

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
     * Loads all sounds.
     */
    constructor() {
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
        if (!audio.paused) return;
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
}
