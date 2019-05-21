'use strict';

import Phaser from 'phaser';
import Hero from './assets/Characters/player/player.png';
import Atlas from './assets/Characters/player/player.json';
import PlatformImg from './assets/World/Platforms/platform.png';
import GroundImg from './assets/World/Platforms/ground.png';
import Background5 from './assets/World/Background/parallax-mountain-bg.png';

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


function preload() {
  this.load.image('background-5', Background5);
  this.load.atlas('player', Hero, Atlas);
  this.load.image('ground', GroundImg);
  this.load.image('platform', PlatformImg);
}

function create() {



  // Create background
  this.add.image(250, 260, 'background-5').setScale(3.5);

  // Create player
  player = this.physics.add.sprite(100, 300, 'player', 'Idle/0001.png');
  player.setCollideWorldBounds(true);

  // Create Platforms
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  platforms.create(250, 400, 'platform');
  this.physics.add.collider(player, platforms);

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
    key: 'hurt',
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

  if (cursors.right.isDown) {
    player.setVelocityX(60);
    if (facing != 'right') {
      player.anims.play('walkRight', true);
      facing = 'right';
    }

  }
  else if (cursors.left.isDown) {
    player.setVelocityX(-60);
    if (facing != 'left') {
      player.anims.play('walkLeft', true);
      facing = 'left';
    }

  }
  else {
      if (facing == 'left') {
        player.anims.play('idleLeft', true)
      }
      else {
        player.anims.play('idleRight', true)
      }
  }
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-220);
    if (facing == 'left') {
      player.anims.play('jumpLeft', true)
    }
    else {
      player.anims.play('jumpRight', true)
    }
  }

}
