wh = 500;
game = new Phaser.Game(500, 500, Phaser.AUTO, '', {preload: preload, create: create, update: update});


function preload() {

  game.load.image('red', 'assets/red.png');
  game.load.image('green', 'assets/green.png');
  game.load.image('pl', 'assets/pl.png');
  game.stage.backgroundColor = '#34495e';

};
function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE)
  player = game.add.sprite(wh/2, wh/2, 'pl');
  game.physics.enable(player, Phaser.Physics.ARCADE);
  // game.physics.ninja.gravity = 0;
  player.body.collideWorldBounds = true
  // player.anchor.setTo(0.5, 0.5);
  game_score = 0;
  score = game.add.text(0,0,"Score: 0");
  score.fill = 'yellow'
  cursors = game.input.keyboard.createCursorKeys()
  // game.world.setBounds(0,0,300,300);

  enemies2 = game.add.group();
  enemies2.enableBody = true;
  enemies2.physicsBodyType = Phaser.Physics.ARCADE;
  enemies2.createMultiple(10, 'green');
  enemies2.setAll('checkWorldBounds', true);
  enemies2.setAll('outOfBoundsKill', true);


  enemies1 = game.add.group();
  enemies1.enableBody = true;
  enemies1.physicsBodyType = Phaser.Physics.ARCADE;
  enemies1.createMultiple(10, 'red');
  enemies1.setAll('checkWorldBounds', true);
  enemies1.setAll('outOfBoundsKill', true);


  // game.add.tween(player).to({x: 300, y: 300}).start();

  // testEnemy = game.add.sprite(0,0,'e1');
  // game.add.tween(testEnemy).to({x: 300,y: 300}, 2000).start();
  // createEnemy();
  // createEnemy();

  a = setInterval(createEnemy, 800);
  console.log(a);
}
function update() {
  var moveSpeed = 10;
  game_score += 1;
  if (game_score % 100 == 0 && player.exists) {
    score.text = "Score: " + game_score / 100
  }

  game.physics.arcade.overlap(player, enemies1, ouchHit)
  game.physics.arcade.overlap(player, enemies2, ouchHit)
  if(cursors.up.isDown) {
    player.body.y -= moveSpeed;
  }
  if (cursors.down.isDown) {
    player.body.y += moveSpeed;

  }
  if (cursors.left.isDown) {
    player.body.x -= moveSpeed;
  }
  if (cursors.right.isDown) {
    player.body.x += moveSpeed;
  }
    // player.body.velocity.x = 200;
    if (player.exists)
      console.log("Player Exists at " + game.time.now);
    else
      console.log("Player No longer exists")
}

createEnemy = function() {
  var which = rand(2);
  if( which === 0) {
    enemy = enemies1.getFirstExists(false);
  } else {
    enemy = enemies2.getFirstExists(false);
  }
  if(!enemy) {
    console.log("HALPHALPHALP");
    return;
  }
  var side = rand(4);
  var tox, toy;
   // side = 2; // CHENGE THIS TO GET RANDOM!!!
  var tox = rand(wh) + 20
  var toy = rand(wh) + 20
  if (side === 0) {
    enemy.reset(rand(wh),0);
    game.add.tween(enemy.body).to({y: wh + 20, x: tox}, 3500, Phaser.Easing.Sinusoidal.InOut, true);
    // enemy.body.velocity.y = 200;
  } else if (side === 1) {
    enemy.reset(wh,rand(wh));
    game.add.tween(enemy.body).to({x: -60, y: toy}, 3500, Phaser.Easing.Sinusoidal.InOut).start();
    // enemy.body.velocity.x = -200;
  } else if (side === 2) {
    enemy.reset(rand(wh),wh);
    game.add.tween(enemy.body).to({y: -60, x: tox }, 3500, Phaser.Easing.Sinusoidal.InOut).start();
    // enemy.body.velocity.y = -200;

  } else if (side === 3) {
    enemy.reset(0,rand(wh));
    game.add.tween(enemy.body).to({x: wh + 20, y: toy}, 3500, Phaser.Easing.Sinusoidal.InOut).start();
    // enemy.body.velocity.x = 200;
  }

};

rand = function(till) {
  return Math.floor(Math.random() * till);
};


function ouchHit(e1, e2) {
  e1.kill();
  e2.kill();
  enemies1.destroy(false);
  enemies2.destroy(false);
  a = game.add.text(wh/2-70,wh/2, "Game Over")
  a.fill = 'yellow'


}