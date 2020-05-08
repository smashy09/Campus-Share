var config = {
    type: Phaser.AUTO,
    scale: {
        width: '100%',
        height: '100%',
        mode: Phaser.Scale.FIT, // use the fit mode
      },
    roundPixels: true,
    pixelArt: true,
    // backgroundColor: "#5f2a55",
    scene: [
        BootScene,
        SelectScene,
        levelOneScene,
        levelTwoScene,
        levelThreeScene,
        GameScene,
        UiScene,
        TitleScene,
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



