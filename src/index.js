'use strict';

import Phaser from 'phaser';
import Hero from './assets/Characters/player/player.png';
import HeroAtlas from './assets/Characters/player/player.json';
import PlatformImg from './assets/World/Platforms/platform.png';
import GroundImg from './assets/World/Platforms/ground.png';
import Background5 from './assets/World/Background/parallax-mountain-bg.png';
import ObstacleC from './assets/World/Obstacles/Spikes/spikeC.png';
import Stars from './assets/World/Collectibles/star.png';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};
const game = new Phaser.Game(config);

let player;
var facing = 'right';
let platforms;
let cursors;
let obstacles;
let playerDmg = false;
let stars;


function preload() {
  this.load.image('background-5', Background5);
  this.load.atlas('player', Hero, HeroAtlas);
  this.load.image('ground', GroundImg);
  this.load.image('platform', PlatformImg);
  this.load.image('obstacle', ObstacleC);
  this.load.image('star', Star);
}

function create() {

  // Create background
  this.add.image(250, 260, 'background-5').setScale(3.5);

  // Create player
  player = this.physics.add.sprite(100, 300, 'player', 'Idle/0001.png');
  player.setCollideWorldBounds(true);
  this.cameras.main.startFollow(player, true, 0.08, 0.1);
  
  // Set world Bounds
  this.physics.world.setBounds(-220, -60, 3392, 600); // Bounds expand downwards, counter that by moving Y accordingly
  
  
  /*======================
        CREATE WORLD
  ========================*/
  platforms = this.physics.add.staticGroup();
 
  platforms.create(1200, 568, 'ground').setScale(8, 2).refreshBody();

  platforms.create(250, 400, 'platform').setScale(.4, 1).refreshBody();
  platforms.create(530, 300, 'platform').setScale(.4, 1).refreshBody();
  platforms.create(800, 250, 'platform').setScale(.5, 1).refreshBody();
  platforms.create(950, 380, 'platform').setScale(.4, 1).refreshBody();
  
  this.physics.add.collider(player, platforms, obstacles);

  // Create Dangerous Obstacles
  obstacles = this.physics.add.staticGroup();

  obstacles.create(250, 390, 'obstacle').setScale(1.5);
  this.physics.add.collider(platforms, obstacles);
  this.physics.add.collider(player, obstacles, hitObstacles, null, this);

  /*======================
        /CREATE WORLD
  ========================*/

  // Create Animations
  this.anims.create({
    key: 'idleRight',
    frameRate: 4,
    repeat: -1,
    frames: this.anims.generateFrameNames('player', {
      prefix: 'Idle/',
      suffix: '.png',
      start: 1,
      end: 5,
      zeroPad: 4,
    }),
  });

  this.anims.create({
    key: 'idleLeft',
    frameRate: 4,
    repeat: -1,
    frames: this.anims.generateFrameNames('player', {
      prefix: 'Idle/',
      suffix: '.png',
      start: 6,
      end: 10,
      zeroPad: 4,
    }),
  });

  this.anims.create({
    key: 'walkRight',
    frameRate: 10,
    repeat: -1,
    frames: this.anims.generateFrameNames('player', {
      prefix: 'Walk/',
      suffix: '.png',
      start: 1,
      end: 5,
      zeroPad: 4,
    }),
  });

  this.anims.create({
    key: 'walkLeft',
    frameRate: 10,
    repeat: -1,
    frames: this.anims.generateFrameNames('player', {
      prefix: 'Walk/',
      suffix: '.png',
      start: 6,
      end: 10,
      zeroPad: 4,
    }),
  });

  this.anims.create({
    key: 'jumpRight',
    frameRate: 5,
    repeat: -1,
    frames: this.anims.generateFrameNames('player', {
      prefix: 'Jump/',
      suffix: '.png',
      start: 1,
      end: 5,
      zeroPad: 4,
    }),
  });

  this.anims.create({
    key: 'jumpLeft',
    frameRate: 5,
    repeat: -1,
    frames: this.anims.generateFrameNames('player', {
      prefix: 'Jump/',
      suffix: '.png',
      start: 6,
      end: 10,
      zeroPad: 4,
    }),
  });

  this.anims.create({
    key: 'hurtRight',
    frameRate: 10,
    repeat: -1,
    frames: this.anims.generateFrameNames('player', {
      prefix: 'Hurt/',
      suffix: '.png',
      start: 1,
      end: 5,
      zeroPad: 4,
    }),
  });

  this.anims.create({
    key: 'hurtLeft',
    frameRate: 10,
    repeat: -1,
    frames: this.anims.generateFrameNames('player', {
      prefix: 'Hurt/',
      suffix: '.png',
      start: 6,
      end: 10,
      zeroPad: 4,
    }),
  });

  this.anims.create({
    key: 'die',
    frameRate: 5,
    repeat: -1,
    frames: this.anims.generateFrameNames('player', {
      prefix: 'Die/',
      suffix: '.png',
      start: 1,
      end: 5,
      zeroPad: 4,
    }),
  });
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  player.setVelocityX(0);

  if (playerDmg !== true) {
    
    // Player movement
    if (cursors.right.isDown) 
    {
      player.setVelocityX(160);
      player.anims.play('walkRight', true);
      facing = 'right';
    }
    else if (cursors.left.isDown) 
    {
      player.setVelocityX(-160);
      
      player.anims.play('walkLeft', true);
      facing = 'left';
      
    }
    else 
    {
      if (facing == 'left') 
      {
        player.anims.play('idleLeft', true)
      }
      else 
      {
        player.anims.play('idleRight', true)
      }
    }
    if (cursors.up.isDown && player.body.touching.down) 
    {
      player.setVelocityY(-320);
      
      if (facing == 'left') 
      {
        // player.anims.play('jumpLeft', true)
      }
      else 
      {
        // player.anims.play('jumpRight', true)
      }
    }
  }
  else 
  {
    setTimeout(function () 
    {
      player.setVelocityY(-140);
      player.setTint();
      playerDmg = false;
    }, 500);
    player.setTint(0xff0000);
    if (facing === 'right') 
    {
      player.anims.play('hurtRight', true);
    }
    else
    {
      player.anims.play('hurtLeft', true);

    }

  }
}
function hitObstacles(player) 
{
  if (playerDmg !== true) 
  {
    playerDmg = true;
  }
}
  