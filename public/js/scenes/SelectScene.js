class SelectScene extends Phaser.Scene {
    constructor() {
        super('Select');
    }

    create() {
        this.add.image(400,300, 'selection');
        console.log('selection')
        this.input.on('pointerdown', () => {
            
            this.scene.start('Game')
        })
    }
}