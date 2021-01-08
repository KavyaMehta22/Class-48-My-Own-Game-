var character1, character2, character3;
var virus, virusIMG;
var obstacle1, obstacle2, obstacle3;
var reward, injection, tablet;
var rewardIMG, injectionIMG, tabletIMG; 
var giftBox, gift, giftIMG, giftBIMG;
var clouds, back1, back2;
var staySafe;
var character1IMG, character2IMG, character3IMG;
var cloudsIMG, giftBoxIMG, injectionIMG, tabletIMG;
var obstacle1IMG, obstacle2IMG, obstacle3IMG;
var background1, background2;
var ground, groundIMG;
var staySafe, staySafeIMG;
var startIMG;

var START = 0;
var PLAY = 1;
var END = 2;

var gameState = START;

var score = 0;
var gameOver, reset;
var gameOver_IMG, resetIMG;
var lives , liveIMG;
  
var invisibleGround;
var score = 0;
var points = 0;
var gifts = 0;

var gameOver, gameOverIMG;
var reset, resetIMG;

var jump, collide, check, bgSound, giftS;


function preload(){

    character1IMG = loadAnimation("images/Character-0.png ", "images/Character-1.png", "images/Character-2.png", 
    "images/Character-3.png", "images/Character-4.png", "images/Character-5.png", "images/Character-6.png", 
    "images/Character-7.png", "images/Character-8.png", "images/Character-8.png", "images/Character-10.png",
    "images/Character-11.png ", "images/Character-12.png ", "images/Character-13.png ")
   
    back1 = loadImage("images/background...jpg");
    groundIMG = loadImage("images/ground.png");
   

    obstacle1IMG = loadImage("images/pizza.png");
    obstacle2IMG = loadImage("images/burger-1.png");

    obstacle3IMG = loadImage("images/virus main.png") 

    virusIMG = loadAnimation("images/virus-7.png", "images/virus-8.png", "images/virus-9.png", "images/virus-10.png", "images/virus-11.png", "images/virus-12.png", "images/virus-13.png",
    "images/virus-14.png", "images/virus-15.png", "images/virus-16.png", "images/virus-17.png", "images/virus-18.png", "images/virus-19.png");

    rewardIMG = loadImage("images/sanitiser.png");
    injectionIMG = loadImage("images/injection.png");
    tabletIMG = loadImage("images/medicine.png");

    giftBIMG = loadImage("images/gift.png");
    giftIMG = loadImage("images/vaccine images main.png");

    gameOverIMG = loadImage("images/gameOver.png");
    resetIMG = loadImage ("images/reset.png");

    staySafeIMG = loadImage("images/stay safe main.png");
    startIMG = loadImage("images/start.png");
    
    jump = loadSound("images/jump.mp3");
  collide = loadSound("images/die.mp3");
  check = loadSound("images/checkPoint.mp3");
  bgSound = loadSound("Super Mario.mp3")
  giftS = loadSound("giftS.mp3")
}

function setup(){
createCanvas(1020, 600);

background = createSprite(200, 200, 1500, 650);
background.addImage(back1);
background.scale = 4;



ground = createSprite(200, 590, displayWidth, 20);
ground.addImage("ground",groundIMG);
ground.scale = 4;

invisibleGround = createSprite(200, 590, displayWidth, 10);
invisibleGround.scale = 4;
invisibleGround.visible = true;


character1 = createSprite(300, 590, 30, 30);
character1.addAnimation("character1",character1IMG);
character1.scale = 1.5;
//character1.debug = true;

gameOver = createSprite(500, 300, 50, 50);
  gameOver.addImage("gameOver", gameOverIMG);
  
  restart = createSprite(500, 340, 50, 50);
  restart.addImage(resetIMG);
  
  gameOver.scale = 1.2;
  restart.scale = 0.2;

  gameOver.visible = false;
  restart.visible = false;

character1.setCollider("circle", 0, 0, 40);

virus = createSprite(60, 500, 5, 5);
virus.addAnimation("virus",virusIMG);
virus.scale = 0.3;
 
staySafe = createSprite(510, 325, 50, 50);
staySafe.addAnimation("staySafe", staySafeIMG);
staySafe.visible = false;
staySafe.scale = 1.5;

button = createSprite(510, 470, 50, 50);
button.addImage(startIMG);
button.visible = false;
button.scale = 0.3;


obstaclesGroup = new Group();
pointsGroup = new Group();
giftsGroup = new Group();
}

function draw(){
   
  textSize(30);
  fill("red");
  
  if(gameState == START){

    button.visible = true;
    

background.visible = false;
ground.visible = false;
character1.visible = false;
gameOver.visible = false;
restart.visible = false;
virus.visible = false;
invisibleGround.visible = false;

   

    score.visible = false;
    points.visible = false;

    staySafe.visible = true;

    textSize(20);
    fill("black");
    text("1 : Press Space to make the character jump.", 20, 100);
    text("2 : Save the character from the junk food & virus.", 20, 120);
    text("3 : Take the medicine, sanitiser & injection as points.", 20, 140);
    text("4 : Super gift comes after every 1500 frames.", 20, 160);
    text("5 : Super gift will give you 10 points.", 20, 180);
    text("6 : Click on Start to play this awesome game.", 20, 200);


textSize(30);
fill("red");
text("Covid-19 Runner game" , 350, 50 );

    if(mousePressedOver(button)) {
    gameState = PLAY
    }

    

  }
    

 
character1.velocityY = character1.velocityY+0.5;
 character1.collide(invisibleGround); 
  
 if (gameState===PLAY){

  background.visible = true;
  ground.visible = true;
character1.visible = true;

button.visible = false;

virus.visible = true;
obstaclesGroup.visible = true;
pointsGroup.visible = true;

  score = score + Math.round(getFrameRate()/60);
  ground.velocityX = -(6 + 3*score/100);
 
  
  

  spawnObstacles();
  spawnPoints();
  spawngifts();
  ground.velocityX = -(6 + 3*score/100);
  
if(keyDown("space")){

  character1.velocityY = -10;
  jump.play();

}
  if((touches.length > 0 || keyDown("SPACE")) && character1.y  >= height-180) {
  
    character1.velocityY = -10;
   
    
  }
  staySafe.visible = false;

  character1.velocityY = character1.velocityY + 0.6


  if(pointsGroup.isTouching(character1)){

    points = points+2;
   pointsGroup.destroyEach();
   check.play();
  }

  if(giftsGroup.isTouching(character1)){

    points = points+10;
   giftsGroup.destroyEach();
  giftS.play();
  }

  

  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  background.velocityX = -5;
  if (background.x < 100){
    background.x = background.width/2;
  }
  
  
  character1.collide(invisibleGround);
  
  

  if(obstaclesGroup.isTouching(character1)){
      gameState = END;
      collide.play();
  }
}
else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
 
  //set velcity of each game object to 0
  ground.velocityX = 0;
  
  character1.visible = false;

  obstaclesGroup.destroyEach();
  pointsGroup.destroyEach();
  giftsGroup.destroyEach();
  virus.velocityX = 0;

 

  obstaclesGroup.setVelocityXEach(0);
  pointsGroup.setVelocityEach(0);
  giftsGroup.setVelocityEach(0);
   
  background.velocityX = 0;
  //change the trex animation
  staySafe.visible = false;
  
  //set lifetime of the game objects so that they are never destroyed
  obstaclesGroup.setLifetimeEach(-1);
  
  
  if(mousePressedOver(restart)) {
    reset();
  }
}

ground.depth = character1.depth;
character1.depth = character1.depth + 1;


    
   
   drawSprites(); 

   if(gameState == PLAY){
   fill("yellow")
   text("score: "+score, 30, 50);

   
   text("Point: "+  points, 30, 80);
   }

   if(gameState == END){

    text("score: "+score, 30, 50);
 
    
    text("Point: "+  points, 30, 80);
    }
 
}


    function spawnObstacles() {
        if(frameCount % 140 === 0) {
          var obstacle = createSprite(500,height-70,60,60);
          //obstacle.debug = true;
          
          
          //generate random obstacles
          var rand = Math.round(random(1,3));
          switch(rand) {
            case 1: obstacle.addImage("obstacle1", obstacle1IMG);
                    obstacle.scale = 0.5;
                    break;
            case 2: obstacle.addImage("obstacle2", obstacle2IMG);
                    obstacle.scale = 0.5;
                    break;
            case 3: obstacle.addImage("obstacle3", obstacle3IMG);
                    obstacle.scale = 0.5;
            default: break;
          }
          obstacle.velocityX = -5;
          //assign scale and lifetime to the obstacle           
          obstacle.scale = 0.5;
          obstacle.lifetime = 300;
          
         obstaclesGroup.add(obstacle);          
          //add each obstacle to the group

          obstacle.depth = character1.depth;
          character1.depth = character1.depth+1;

          obstacle.depth = virus.depth;
          virus.depth = virus.depth+2;

          ground.depth = obstacle.depth;
          obstacle.depth = obstacle.depth+1;
          
        }
      }
      
      function spawnPoints(){
        if(frameCount% 70 == 0){
          var point = createSprite(700,400);


        
        var rand = Math.round(random(1,3));
        switch(rand){
          case 1: point.addImage("point1", injectionIMG);
                  point.scale = 0.1;
                  break;
          case 2: point.addImage("point2", rewardIMG);
                  point.scale = 0.1;
                  break;
          case 3: point.addImage("point3", tabletIMG);
                  point.scale = 0.1;
                  break;
          default:break;
        }
        point.velocityX = -5;
        point.lifetime = 300;

        pointsGroup.add(point);
      }

      }

      function spawngifts(){
        if(frameCount% 1500 == 0){
          var gift = createSprite(900,200);


        
        var rand = Math.round(random(1,2));
        switch(rand){
          case 1: gift.addImage("gift", giftBIMG);
                  gift.scale = 0.2;
                  break;
          case 2: gift.addImage("gift2", giftIMG);
                  gift.scale = 0.2;
                  break;
          
          default:break;
        }
        gift.velocityX = -5;
        gift.lifetime = 300;
        gift.scale = 0.6;

        giftsGroup.add(gift);
      }

      }
      function reset(){
        gameState = PLAY;
        gameOver.visible = false;
        restart.visible = false;
        
        character1.visible = true;
        
        staySafe.visible = false;
        
     
        
        score = 0;
        points = 0;
        
      }
     