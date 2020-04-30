var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    roundPixels: true,
    pixelArt: true,
    // backgroundColor: "#5f2a55",
    scene: [
        BootScene,
        TitleScene,
        GameScene,
        UiScene,
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 0,
            },
        },
    },
};

var game = new Phaser.Game(config);



