class UiScene extends Phaser.Scene {
    constructor() {
        super('Ui');
    }

    init() {
        //grab a reference to the game scene
        // this.gameScene = this.scene.get('Game');
        this.levelThreeScene = this.scene.get('levelThree');
        // this.levelTwoScene = this.scene.get('levelTwo');
        
    }
    create() {
        this.setupUiElements();
        this.setupEvents();
    }

    setupUiElements() {
        this.scoreText = this.add.text(35, 8, 'Coins:0', {fontSize: '16px', fill: "#fff"});

        this.coinIcon = this.add.image(15, 15, 'items', 3);
    }

    setupEvents() {
        //listen
        this.levelThreeScene.events.on('updateScore', (score) => {
            this.scoreText.setText(`Coins: ${score}`);
        });
        // this.levelTwoScene.events.on('updateScore', (score) => {
        //     this.scoreText.setText(`Coins: ${score}`);
        // });
        // this.gameScene.events.on('updateScore', (score) => {
        //     this.scoreText.setText(`Coins: ${score}`);
        // });
    }
}