class musicPlayer {
    constructor() {
        this.backgroundMusic = new Audio('./assets/soundtrack/musicas/menuTheme.mp3');
        this.backgroundMusic.preload = 'auto';
    }

    changeMusic({ local, name }) {
        let directory = './assets/soundtrack/musicas/'

        if (local != '') {
            directory += local + '/'
        }

        this.backgroundMusic.src = directory + name + '.mp3';
        this.backgroundMusic.load();
        this.playMusic();
    }

    playMusic() {
        this.backgroundMusic.play()
    }

    pauseMusic() {
        this.backgroundMusic.pause();
    }

    setVolume(volumeLevel) {
        this.backgroundMusic.volume = volumeLevel;
    }

    toggleMute() {
        this.backgroundMusic.muted = !this.backgroundMusic.muted;
    }
}

let musicControl = new musicPlayer()

musicControl.playMusic()

musicControl.changeMusic({ local: 'swamp', name: 'Swampy Darkness' })