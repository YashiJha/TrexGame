var trex, collidedtrex, trex1, ground, ground1, invisibleground, o1, o2, o3, o4, o5, o6, cloud, ObstaclesGroup, CloudsGroup, score, gameState, restart1, gameover1, gameover, restart, highscore;

function preload() {
  trex1 = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  collidedtrex = loadImage("trex_collided.png");

  ground1 = loadImage("ground2.png");

  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");

  clouds = loadImage("cloud.png");

  restart1 = loadImage("restart.png");
  gameover1 = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 300);

  trex = createSprite(50, 230, 20, 50);
  trex.addAnimation("y", trex1);
  trex.addAnimation("s", collidedtrex);
  trex.scale = 0.5;

  ground = createSprite(200, 280, 400, 20);
  ground.addAnimation("a", ground1);
  ground.x = ground.width / 2;

  //trex.debug=true;
  trex.setCollider("rectangle", 0, -5, 100, 80);

  ground.velocityX = -6;

  score = 0;

  ObstaclesGroup = new Group();
  CloudsGroup = new Group();

  gameState = 1;

  gameover = createSprite(300, 200, 20, 20);
  gameover.addImage(gameover1);
  gameover.scale = 0.5;

  restart = createSprite(300, 240, 20, 20);
  restart.addImage(restart1);
  restart.scale = 0.5;

  gameover.visible = false;
  restart.visible = false;
  
  highscore=0;
}

function draw() {
  background("lightblue");

  //console.log(trex.y);

  if (gameState === 1) {

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //jump when the space key is pressed
    if (keyDown("space") && trex.y >= 256.5) {
      trex.velocityY = -12;
    }

    //add gravity
    trex.velocityY = trex.velocityY + 0.8;

    spawnObstacles();
    spawnClouds();

    score = score + Math.round(getFrameRate()/60);

    if (trex.isTouching(ObstaclesGroup)) {
      gameState = 2;
    }

  } else {
    ground.velocityX = 0;
    trex.changeAnimation("s", collidedtrex);
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);

    //change the trex animation
    //trex.setAnimation("trex_collided");

    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);

    gameover.visible = true;
    restart.visible = true;
    
    if (mousePressedOver(restart)) {
      reset();
    }
    if(highscore<score){
      highscore=score;
    }
    
  }
  

  
  trex.collide(ground);

  text("Score: " + score, 500, 100);
  
  if(highscore>0){
    text("High Score: " + highscore, 300, 100);
  }

  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 265, 10, 40);

    obstacle.velocityX = -6;

    //generate random obstacles
    var rand = Math.round(random(1, 6));

    switch (rand) {
      case 1:
        obstacle.addImage(o1);
        //obstacle.scale=0.5;
        break;
      case 2:
        obstacle.addImage(o2);
        //obstacle.scale=0.5;
        break;
      case 3:
        obstacle.addImage(o3);
        //obstacle.scale=0.5;
        break;
      case 4:
        obstacle.addImage(o4);
        //obstacle.scale=0.4;
        break;
      case 5:
        obstacle.addImage(o5);
        //obstacle.scale=0.4;
        break;
      case 6:
        obstacle.addImage(o6);
        //obstacle.scale=0.4;
        break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;

    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, Math.round(random(180, 220)), 40, 10);
    cloud.addImage(clouds);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
}

function reset() {
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  score = 0;
  gameState = 1;
  trex.changeAnimation("y", trex1);
  
  gameover.visible = false;
  restart.visible = false;
}