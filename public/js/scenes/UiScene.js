class UiScene extends Phaser.Scene {
    constructor() {
        super('Ui');
    }

    create() {
        this.setupUiElements();
        this.setupEvents();
    }

    setupUiElements() {
        this.scoreText = this.add.text(35, 8, 'Coins:0', {fontSize: '20px', fill: "#fff"});

        this.coinIcon = this.add.image(15, 15, 'items', 3);
    }

    setupEvents() {

    }
}