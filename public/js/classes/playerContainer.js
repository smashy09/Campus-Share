//Keep for game object container for other types.
const Direction = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  UP: 'UP',
  DOWN: 'DOWN',
  
};
//todo in constructor, health, maxHealth, id, playerName, gold, defenseValue, attackValue, items
class PlayerContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key) {
        super(scene, x, y);
        this.scene = scene;
        this.velocity = 360; // velocity(speed) to move players
        this.flipX = true;
        this.key = key;
        this.currentDirection = Direction.RIGHT;
        // this.id = id;
        this.swordHit = false;
        // this.health = health;
        // this.maxHealth = maxHealth;
        // this.playerName = playerName;
        // this.gold = gold;
        // this.defenseValue = defenseValue;
        // this.attackValue = attackValue;
        // this.items = items;
        this.playerAttacking = false;
        // set a size on the container
        this.setSize(32, 32);
       // enable physics
    this.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);

        //add player to existing scene
        this.scene.add.existing(this);
        //follow player
        this.scene.cameras.main.startFollow(this);
        
        this.player = new Player(this.scene, 0, 0, key);
        this.add(this.player);

    // create the weapon game object
    this.weapon = this.scene.add.image(60, 0, 'weapon1');
    
    this.scene.add.existing(this.weapon);
    this.weapon.setScale(1.5);
    this.scene.physics.world.enable(this.weapon);
    this.add(this.weapon);
    this.weapon.alpha = 0;
    console.log(this.weapon);
    }

  
    update(cursors) {
        this.body.setVelocity(0);
    
        if (cursors.left.isDown) {
          this.body.setVelocityX(-this.velocity);
          this.currentDirection = Direction.LEFT;
          this.weapon.setPosition(-60, 0);
          this.player.anims.play('LEFT', true);
          
          
        } else if (cursors.right.isDown) {
          this.body.setVelocityX(this.velocity);
          this.currentDirection = Direction.RIGHT;
          this.weapon.setPosition(60, 0);
          this.player.anims.play('RIGHT', true);
         
        }
    
        if (cursors.up.isDown) {
          this.body.setVelocityY(-this.velocity);
          this.currentDirection = Direction.UP;
          this.weapon.setPosition(0,-60);
          this.player.anims.play('UP', true);
          
         
        } else if (cursors.down.isDown) {
          this.body.setVelocityY(this.velocity);
          this.currentDirection = Direction.DOWN;
          this.weapon.setPosition(0,60);
          this.player.anims.play('DOWN', true);
         
          
        }
        if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.playerAttacking) {
          this.weapon.alpha = 1;
          this.playerAttacking = true;
          // this.attackAudio.play();
          this.scene.time.delayedCall(150, () => {
            this.weapon.alpha = 0;
            this.playerAttacking = false;
            this.swordHit = false;
          }, [], this);
        }
    
        if (this.playerAttacking) {
          if (this.weapon.flipX) {
            this.weapon.angle -= 10;
          } else {
            this.weapon.angle += 10;
          }
        } else {
          if (this.currentDirection === Direction.DOWN) {
            this.weapon.setAngle(-270);
          } else if (this.currentDirection === Direction.UP) {
            this.weapon.setAngle(-90);
          } else {
            this.weapon.setAngle(0);
          }
    
          this.weapon.flipX = false;
          if (this.currentDirection === Direction.LEFT) {
            this.weapon.flipX = true;
          }
        }
    }
}