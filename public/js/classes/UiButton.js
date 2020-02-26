class UiButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, hoverKey, text, targetCallback) {
        super(scene, x, y);

        this.scene = scene;// the scene this container will be added to 
        this.x = x; // the x position of our container
        this.y = y; // the y position
        this.key = key; // the background image of our button
        this.hoverKey = hoverKey; // the image that will be displayed when the player hover over the button
        this.text = text; // the text that will be displayed on the button
        this.targetCallback = targetCallback ; // the callback function that will be called when the player clicks button
    }
}

//create play game button
this.button = this.add.image(this.scale.width / 2, this.scale.height * 0.65, 'button1');

this.button.setInteractive();

this.buttonText = this.add.text(0, 0, 'Start', { fontSize: '26px', fill: "#fff" });

//to align text into objects
Phaser.Display.Align.In.Center(this.buttonText, this.button);
this.button.on('pointerdown', () => {
    this.scene.start('Game')
});

this.button.on('pointerover', () => {
    
    this.button.setTexture('button2');
});

this.button.on('pointerout', () => {
    
    this.button.setTexture('button1');
})

