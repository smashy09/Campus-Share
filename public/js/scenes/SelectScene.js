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
        for (let j = 0; j < 1; j += 1) {
            let x = this.scale.width / 4;
            const y = this.scale.height / 6 * (j + 2);
      
            for (let i = 0 + (8 * j); i < 4 + (8 * j); i += 1) {
                const character = this.add.image(x,y, 'student', i).setInteractive();
                character.characterId = i;
                character.setScale(2.5);
                character.setAlpha(0.4);
                character.on('pointerover', this.pointerover);
                character.on('pointerout', this.pointerout);
                character.on('pointerdown', this.pointerdown.bind(this, character));
                this.group.add(character);
                 x += 256;
            }
        }
    
    }

    pointerover(){
        this.setAlpha(1)
    }

    pointerout() {
        console.log(this);
        this.setAlpha(0.4)
    }

    pointerdown(character) {

        console.log(this);
        this.scene.start('leveltwo', { selectedCharacter: character.characterId })
    }

}