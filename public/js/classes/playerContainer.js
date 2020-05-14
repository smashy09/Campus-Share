//Keep for game object container for other types.


class PlayerContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, frame, health, maxHealth, id, playerName, gold, defenseValue, attackValue, items) {
        super(scene, x, y);
        this.scene = scene;
        this.velocity = 360; // velocity(speed) to move players
        this.flipX = true;
        this.id = id;
        this.swordHit = false;
    this.health = health;
    this.maxHealth = maxHealth;
        this.playerName = playerName;
        this.gold = gold;
        this.defenseValue = defenseValue;
    this.attackValue = attackValue;
    this.items = items;
        this.playerAttacking = false;
        // set a size on the container
        this.setSize(32, 32);
       
        this.body.setCollideWorldBounds(true);

        //add player to existing scene
        this.scene.add.existing(this);
        //follow player
        this.scene.cameras.main.startFollow(this);
        
       
    }

  
    update(cursors) {
        this.body.setVelocity(0);
    
        if (cursors.left.isDown) {
          this.body.setVelocityX(-this.velocity);
          this.currentDirection = Direction.LEFT;
          this.player.anims.play('LEFT', true);
          
          
        } else if (cursors.right.isDown) {
          this.body.setVelocityX(this.velocity);
          this.currentDirection = Direction.RIGHT;
          this.player.anims.play('RIGHT', true);
         
        }
    
        if (cursors.up.isDown) {
          this.body.setVelocityY(-this.velocity);
          this.currentDirection = Direction.UP;
          this.player.anims.play('UP', true);
          
         
        } else if (cursors.down.isDown) {
          this.body.setVelocityY(this.velocity);
          this.currentDirection = Direction.DOWN;
          this.player.anims.play('DOWN', true);
         
          
        }
    }
}