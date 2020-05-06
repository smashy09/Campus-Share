class SelectScene extends Phaser.Scene {
    constructor() {
        super('Select');
    }

    create() {
        

        this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Please Select your Avatar', { fontSize: '64px', fill: '#fff' });
        this.titleText.setOrigin(0.5);
        
        //create sprite
        this.createCharacters();
        
        console.log('selection')
       
        // this.input.on('pointerdown', () => {
            
        //     this.scene.start('Game')

        // })
    }

    createCharacters() {
        this.group = this.add.group();
        let x = this.scale.width /3.5;
        const y = this.scale.height / 6;
        
            const character1 = this.add.sprite(x,y, 'selection', 0).setInteractive();
            const character2 = this.add.sprite(x,y, 'selection', 1).setInteractive();
            const character3 = this.add.sprite(x,y, 'selection', 2).setInteractive();
            const character4 = this.add.sprite(x,y, 'selection', 3).setInteractive();
            this.group.add(character1);
            this.group.add(character2);
            this.group.add(character3);
            this.group.add(character4);
            
            character1.setAlpha(0.4);
            character2.setAlpha(0.4);
            character3.setAlpha(0.4);
            character4.setAlpha(0.4);
            x += 96;
              
            character1.on('pointerout', this.pointerout);
            character1.on('pointerover', this.pointerover);
            character1.on('pointerdown', this.pointerdown.bind(this, character1));

            character2.on('pointerover', this.pointerover);
            character2.on('pointerout', this.pointerout);
            character2.on('pointerdown', this.pointerdown);

            character3.on('pointerover', this.pointerover);
            character3.on('pointerout', this.pointerout);
            character3.on('pointerdown', this.pointerdown);

            character4.on('pointerover', this.pointerover);
            character4.on('pointerout', this.pointerout);
            character4.on('pointerdown', this.pointerdown);
        
            
        
    }

    pointerover(){
        this.setAlpha(1)
    }

    pointerout() {
        console.log(this);
        this.setAlpha(0.4)
    }

    pointerdown() {

        console.log(this);
    }

}