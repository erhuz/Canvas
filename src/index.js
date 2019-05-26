'use strict';

import Phaser from 'phaser';
import Hero from './assets/Characters/player/player.png';
import HeroAtlas from './assets/Characters/player/player.json';
import PlatformImg from './assets/World/Platforms/platform.png';
import RoofImg from './assets/World/Roofs/roof.png';
import GroundImg from './assets/World/Platforms/ground.png';
import Background5 from './assets/World/Background/parallax-mountain-bg.png';
import Star from './assets/World/Collectibles/star.png';
import Spikes from './assets/World/Obstacles/Spikes/spikeC.png'
import FullRoomSpikes from './assets/World/Obstacles/Spikes/fullRoomSpikes.png'
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
let playerDmg;
let playerHealth;
let playerPoints;
let playerBeingDamaged;
let healthText;
let pointsText;
let spikes;
let walls
let stars;


function preload() {

  /*======================
      LOAD IN RESOURCES
  ========================*/
  this.load.image('background-5', Background5);
  this.load.atlas('player', Hero, HeroAtlas);
  this.load.image('ground', GroundImg);
  this.load.image('platform', PlatformImg);
  this.load.image('star', Star);
  this.load.image('spikes', Spikes);
  this.load.image('full-room-spikes', FullRoomSpikes);
  this.load.image('wall', WallImg)
  this.load.image('roof', RoofImg)
}

function create() {

  // BACKGROUND PICTURE
  this.add.image(250, 260, 'background-5').setScale(3.5);
  
  // CREATE PLAYER
  player = this.physics.add.sprite(100, 496, 'player', 'Idle/0001.png').setScale(.7);
  // player = this.physics.add.sprite(1748, 180, 'player', 'Idle/0001.png').setScale(.7);

  player.setCollideWorldBounds(true);
  this.cameras.main.startFollow(player, true, 0.08, 0.1);

  // Set Player-related variables
  playerDmg = false;
  playerBeingDamaged = false;
  playerHealth = 100;
  playerPoints = 0;

  
  // WORLD BOUNDRIES
  this.physics.world.setBounds(-220, -60, 30392, 6000); // Bounds expand downwards, counter that by moving Y accordingly


  /*======================
        CREATE WORLD
  ========================*/
  platforms = this.physics.add.staticGroup();
  walls = this.physics.add.staticGroup();
  spikes = this.physics.add.staticGroup();
  roofs = this.physics.add.staticGroup();
  stars = this.physics.add.staticGroup();

  /*======================
          GROUND
  ========================*/
  platforms.create(1200, 695, 'ground').setScale(8, 10).refreshBody();

  /*======================
          ROOFS
  ========================*/
  roofs.create(50, 0, 'platform').setScale(1, .4).refreshBody();
  roofs.create(350, 0, 'platform').setScale(1, .4).refreshBody();
  roofs.create(650, 0, 'platform').setScale(1, .4).refreshBody();
  roofs.create(950, 0, 'platform').setScale(1, .4).refreshBody();
  roofs.create(1250, 0, 'platform').setScale(1, .4).refreshBody();
  roofs.create(1550, 0, 'platform').setScale(1, .4).refreshBody();
  roofs.create(1850, 0, 'platform').setScale(1, .4).refreshBody();
  roofs.create(2150, 0, 'platform').setScale(1, .4).refreshBody();
  roofs.create(2450, 0, 'platform').setScale(1, .4).refreshBody();
  roofs.create(2450, 0, 'platform').setScale(1, .4).refreshBody();
  roofs.create(2650, 0, 'platform').setScale(.8, .4).refreshBody();

  /*======================
          FIRST ROOM
  ========================*/
  platforms.create(150, 400, 'platform').setScale(.3).refreshBody();
  platforms.create(30, 240, 'platform').setScale(.3).refreshBody();

  walls.create(0, 385, 'wall').setScale(.4, 1).refreshBody();
  walls.create(0, 110, 'wall').setScale(.4, .8).refreshBody();
  walls.create(180, 385, 'wall').setScale(.4, 1).refreshBody();
  walls.create(180, 185, 'wall').setScale(.4, .5).refreshBody();




  /*======================
        SECOND ROOM 
  ========================*/
  platforms.create(314, 390, 'platform').setScale(1, .4).refreshBody();
  platforms.create(610, 390, 'platform').setScale(1, .4).refreshBody();
  platforms.create(500, 150, 'platform').setScale(1, .4).refreshBody();
  platforms.create(610, 150, 'platform').setScale(1, .4).refreshBody();

  walls.create(745, 385, 'wall').setScale(.4, .5).refreshBody();
  walls.create(745, 85, 'wall').setScale(.4, .5).refreshBody();

  spikes.create(220, 365, 'spikes');
  spikes.create(249, 365, 'spikes');
  spikes.create(278, 365, 'spikes');
  spikes.create(400, 365, 'spikes');
  spikes.create(429, 365, 'spikes');
  spikes.create(458, 365, 'spikes');
  spikes.create(630, 365, 'spikes');
  spikes.create(649, 365, 'spikes');
  spikes.create(678, 365, 'spikes');
  spikes.create(660, 365, 'spikes');
  spikes.create(679, 365, 'spikes');
  spikes.create(708, 365, 'spikes');

  /*======================
        THIRD ROOM
  ========================*/
  platforms.create(1080, 310, 'platform').setScale(1, .4).refreshBody();
  platforms.create(910, 150, 'platform').setScale(1, .4).refreshBody();
  platforms.create(1210, 450, 'platform').setScale(1, .4).refreshBody();
  platforms.create(1510, 310, 'platform').setScale(1, .4).refreshBody();
  platforms.create(1300, 150, 'platform').setScale(.3).refreshBody();

  walls.create(1245, 155, 'wall').setScale(.4, 1.13).refreshBody();
  walls.create(1445, 155, 'wall').setScale(.4, 1.13).refreshBody();
  walls.create(1345, 500, 'wall').setScale(.4, .25).refreshBody();


  spikes.create(899, 522, 'spikes');
  spikes.create(929, 522, 'spikes');
  spikes.create(956, 522, 'spikes');
  spikes.create(1129, 285, 'spikes');



  /*======================
        FOURTH ROOM
  ========================*/
  platforms.create(1530, 470, 'platform').setScale(.3).refreshBody();
  platforms.create(1730, 470, 'platform').setScale(.3).refreshBody();
  platforms.create(2065, 470, 'platform').setScale(.3).refreshBody();
  platforms.create(2265, 310, 'platform').setScale(.3).refreshBody();
  platforms.create(2590, 470, 'platform').setScale(.3).refreshBody();
  platforms.create(2730, 310, 'platform').setScale(.3).refreshBody();
  platforms.create(2630, 150, 'platform').setScale(.3).refreshBody();
  platforms.create(2372, 90, 'platform').setScale(1, .3).refreshBody();
  platforms.create(2072, 120, 'platform').setScale(1, .3).refreshBody();
  platforms.create(1718, 220, 'platform').setScale(.4, .3).refreshBody();

  walls.create(1650, 235, 'wall').setScale(.4, .6).refreshBody();
  walls.create(2785, 385, 'wall').setScale(.4, 1).refreshBody();
  walls.create(2785, 135, 'wall').setScale(.4, 1).refreshBody();

  spikes.create(1985, 522, 'full-room-spikes');
  spikes.create(2620, 522, 'spikes');
  spikes.create(2650, 522, 'spikes');
  spikes.create(2680, 522, 'spikes');
  spikes.create(2710, 522, 'spikes');
  spikes.create(2740, 522, 'spikes');
  spikes.create(2755, 522, 'spikes');

  /*======================
        COLLECTIBLES
  ========================*/

  stars = this.physics.add.group({
    key: 'star',
    repeat: 14,
    setXY: { x: 40, y: 200, stepX: 185 }
  });

  /*======================
        COLLIDERS
  ========================*/

  this.physics.add.collider(player, spikes, hitObstacles, null, this);
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, walls);
  this.physics.add.collider(player, roofs);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(stars, spikes);

  /*======================
        OVERLAPS
  ========================*/

  this.physics.add.overlap(player, stars, hitStar, null, this);  

  /*======================
        /CREATE WORLD
  ========================*/


  /*======================
        USER INTERFACE
  ========================*/
  
  pointsText = this.add.text(16, 16, 'Points: 0', { fontSize: '32px', fill: '#000' });
  pointsText.setScrollFactor(0);
  healthText = this.add.text(16, 48, 'Health: 0', { fontSize: '32px', fill: '#000' });
  healthText.setScrollFactor(0);

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
  /*======================
  /CREATE CHARACTER ANIMATION
  ========================*/

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
    damagePlayer(10);  
    player.setTint(0xff0000);

    if (facing === 'right') {
      player.anims.play('hurtRight', true);
    }
    else {
      player.anims.play('hurtLeft', true);
    }

  }
}

function addPointsToPlayer(points){
  playerPoints += points;
  pointsText.setText('Points: ' + playerPoints);

  console.log(`Points: ${(playerPoints - points)} => ${playerPoints}`);
}

function damagePlayer(damage){
  if(playerBeingDamaged !== true){
    playerHealth -= damage;
  

    healthText.setText('Health: ' + playerHealth);


    // Debug logging
    console.log(`Health: ${(playerHealth + damage)} => ${playerHealth}`);
    
    playerBeingDamaged = true;

    setTimeout(function ()
    {
      playerBeingDamaged = false;
    }, 500)
  }
}


function hitStar (player,  star){
  star.disableBody(true, true);
  
  addPointsToPlayer(100);

  if(stars.countActive(true) === 0){
    gameWin();
  }
}

function hitObstacles(player) {
  if (playerDmg !== true) {
    playerDmg = true;
  }
}

function gameWin(){
  // Win Game
}