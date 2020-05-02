class Portal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'portalicon');
        this.scene = scene;
        // velocity(speed) to move players

        //enable physics
        this.scene.physics.world.enable(this);
        // set immovable if another object collide

        //add player to existing scene
        this.scene.add.existing(this);
        //follow player
        
    
    }
}