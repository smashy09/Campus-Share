class TitleScene extends Phaser.Scene {
    constructor() {
        super('Title');
    }

    preload() {

    }

    create() {
        //create title text
        this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'thirteen mmo', { fontSize: '64px', fill: '#fff'});
        this.titleText.setOrigin(0.5);
        this.button = this.add.image(100,100, 'button1');
    }
}