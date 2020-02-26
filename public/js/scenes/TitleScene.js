class TitleScene extends Phaser.Scene {
    constructor() {
        super('Title');
    }

    

    create() {
        //create title text
        this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Thirteen mmo', { fontSize: '64px', fill: '#fff' });
        this.titleText.setOrigin(0.5);

    }
}