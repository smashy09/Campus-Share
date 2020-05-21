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
        levelFourScene,
        levelFiveScene,
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

// class Game extends Phaser.Game {
//     constructor() {
//       super(config);
//       const socket = io("http://localhost:5000");
//       this.globals = { socket };
//       this.scene.start('BootScene');
//     }
//   }
  
//   window.onload = () => {
//     window.game = new Game();
//   };
var game = new Phaser.Game(config);



