'use strict';

import Phaser from 'phaser';
import Hero from './assets/Characters/player/player.png';
import HeroAtlas from './assets/Characters/player/player.json';
import PlatformImg from './assets/World/Platforms/platform.png';
import RoofImg from './assets/World/Roofs/roof.png';
import GroundImg from './assets/World/Platforms/ground.png';
import Background5 from './assets/World/Background/parallax-mountain-bg.png';
import ObstacleC from './assets/World/Obstacles/Spikes/spikeC.png'
import WallImg from './assets/World/Walls/wall.png'

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
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
let facing = 'right';
let platforms;
let roofs
let cursors;
let obstacles;
let walls
let playerDmg = false;


function preload() {
  this.load.image('background-5', Background5);
  this.load.atlas('player', Hero, HeroAtlas);
  this.load.image('ground', GroundImg);
  this.load.image('platform', PlatformImg);
  this.load.image('obstacle', ObstacleC);
  this.load.image('wall', WallImg)
  this.load.image('roof', RoofImg)
}

function create() {

  // Create background
  this.add.image(250, 260, 'background-5').setScale(3.5);

  // Create player
  // player = this.physics.add.sprite(100, 496, 'player', 'Idle/0001.png').setScale(.7);
  player = this.physics.add.sprite(700, 96, 'player', 'Idle/0001.png').setScale(.7);
  player.setCollideWorldBounds(true);
  this.cameras.main.startFollow(player, true, 0.08, 0.1);

  // Set world Bounds
  this.physics.world.setBounds(-220, -60, 30392, 6000); // Bounds expand downwards, counter that by moving Y accordingly


  /*======================
        CREATE WORLD
  ========================*/
  platforms = this.physics.add.staticGroup();
  walls = this.physics.add.staticGroup();
  obstacles = this.physics.add.staticGroup();
  roofs = this.physics.add.staticGroup();

  /*======================
          GROUND
  ========================*/
  platforms.create(1200, 568, 'ground').setScale(8, 2).refreshBody();

  /*======================
          ROOFS
  ========================*/
  roofs.create(50, 0, 'platform').setScale(1, .4).refreshBody();
  roofs.create(350, 0, 'platform').setScale(1, .4).refreshBody();
  roofs.create(650, 0, 'platform').setScale(1, .4).refreshBody();
  roofs.create(950, 0, 'platform').setScale(1, .4).refreshBody();

  /*======================
      WALLS
  ========================*/
  walls.create(0, 385, 'wall').setScale(.4, 1).refreshBody();
  walls.create(0, 110, 'wall').setScale(.4, .8).refreshBody();
  walls.create(180, 385, 'wall').setScale(.4, 1).refreshBody();
  walls.create(180, 185, 'wall').setScale(.4, .5).refreshBody();
  walls.create(745, 385, 'wall').setScale(.4, .5).refreshBody();
  walls.create(745, 85, 'wall').setScale(.4, .5).refreshBody();

  /*======================
      PLATFORMS
  ========================*/
  platforms.create(150, 400, 'platform').setScale(.3).refreshBody();
  platforms.create(30, 240, 'platform').setScale(.3).refreshBody();
  platforms.create(314, 390, 'platform').setScale(1, .4).refreshBody();
  platforms.create(610, 390, 'platform').setScale(1, .4).refreshBody();
  platforms.create(500, 150, 'platform').setScale(1, .4).refreshBody();
  platforms.create(610, 150, 'platform').setScale(1, .4).refreshBody();

  /*======================
      DANGEROUS OBSTACLES
  ========================*/

  // FIRST PLATFORM
  obstacles.create(220, 365, 'obstacle');
  obstacles.create(249, 365, 'obstacle');
  obstacles.create(278, 365, 'obstacle');
  obstacles.create(400, 365, 'obstacle');
  obstacles.create(429, 365, 'obstacle');
  obstacles.create(458, 365, 'obstacle');
  obstacles.create(630, 365, 'obstacle');
  obstacles.create(649, 365, 'obstacle');
  obstacles.create(678, 365, 'obstacle');
  obstacles.create(660, 365, 'obstacle');
  obstacles.create(679, 365, 'obstacle');
  obstacles.create(708, 365, 'obstacle');


  /*======================
        COLLIDERS
  ========================*/
  this.physics.add.collider(player, obstacles, hitObstacles, null, this);
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, walls);
  this.physics.add.collider(player, roofs);

  /*======================
        /CREATE WORLD
  ========================*/

  /*======================
  CREATE CHARACTER ANIMATION
  ========================*/
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
  // CREATE CONTROLL KEYS
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {

  /*======================
      PLAYER MOVEMENT
  ========================*/
  player.setVelocityX(0);

  if (playerDmg !== true) {

    if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play('walkRight', true);
      facing = 'right';
    }
    else if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play('walkLeft', true);
      facing = 'left';

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
      player.setVelocityY(-520);

      if (facing == 'left') {
        // player.anims.play('jumpLeft', true)
      }
      else {
        // player.anims.play('jumpRight', true)
      }
    }
  }
  else {
    setTimeout(function () {

      player.setVelocityY(-240);
      player.setTint();
      playerDmg = false;

    }, 500);

    player.setTint(0xff0000);

    if (facing === 'right') {
      player.anims.play('hurtRight', true);
    }
    else {
      player.anims.play('hurtLeft', true);
    }

  }
}

function hitObstacles(player) {
  if (playerDmg !== true) {
    playerDmg = true;
  }
}
