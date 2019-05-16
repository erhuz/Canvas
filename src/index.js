'use strict';

import Phaser from "phaser";
import Hero from "./assets/Characters/player/player.png";
import Atlas from "./assets/Characters/player/player.json";
import PlatformImg from "./assets/World/Platforms/platform.png";
import GroundImg from "./assets/World/Platforms/ground.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
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
let platforms;
let cursors;


function preload() {
  this.load.atlas("player", Hero, Atlas);
  this.load.image("ground", GroundImg);
  this.load.image("platform", PlatformImg);
}

function create() {

  // Create player
  player = this.add.sprite(100, 300, "player", "Idle/0001.png" );
  
  // Create Platforms
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  platforms.create(250, 400, 'platform');

  // Create Animations
  this.anims.create({
    key: "idle",
    frameRate: 4,
    repeat: -1,
    frames: this.anims.generateFrameNames('player', {
      prefix: "Idle/",
      suffix: ".png",
      start: 1,
      end: 5,
      zeroPad: 4,
    }),
  });

  this.anims.create({
    key: "right",
    frameRate: 10,
    repeat: -1,
    frames: this.anims.generateFrameNames('player', {
      prefix: "Walk/",
      suffix: ".png",
      start: 1,
      end: 5,
      zeroPad: 4,
    }),
  });

  this.anims.create({
    key: "jump",
    frameRate: 5,
    repeat: -1,
    frames: this.anims.generateFrameNames('player', {
      prefix: "Jump/",
      suffix: ".png",
      start: 1,
      end: 5,
      zeroPad: 4,
    }),
  });

  this.anims.create({
    key: "hurt",
    frameRate: 10,
    repeat: -1,
    frames: this.anims.generateFrameNames('player', {
      prefix: "Hurt/",
      suffix: ".png",
      start: 1,
      end: 5,
      zeroPad: 4,
    }),
  });

  this.anims.create({
    key: "die",
    frameRate: 5,
    repeat: -1,
    frames: this.anims.generateFrameNames('player', {
      prefix: "Die/",
      suffix: ".png",
      start: 1,
      end: 5,
      zeroPad: 4,
    }),
  });
cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.right.isDown) {
    player.anims.play("right", true);
  }
  else if (cursors.left.isDown) {
    player.anims.play("left", true);
  }
  else if (cursors.up.isDown) {
    player.anims.play("jump", true)
  }
  else {
    player.anims.play("idle", true)
  }
  
}
