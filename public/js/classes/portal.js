class Portal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'portalicon');
        this.scene = scene;
        // velocity(speed) to move players
        this.setScale(1);
        //enable physics
        this.scene.physics.world.enable(this);

        //add player to existing scene
        this.scene.add.existing(this);
       
    
    }
}