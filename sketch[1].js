var bullet, player, house, bulletIMG, playerIMG, houseIMG, bulletGroup
var en, enGroup, enAnime, ground
var score=0
var play=0
var end=1
var gameState=play
var rod

function preload(){
 enAnime=loadAnimation("en1.png","en2.png")
 playerIMG=loadImage("army.png");
 houseIMG=loadImage("HOUSE.png");
 bulletIMG=loadImage("BULLET.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  ground=createSprite(width/2,height/4*3,width,5);
  house=createSprite(width/5,height/4*2.5,20,20);
  house.addImage(houseIMG)
  player=createSprite(house.x,height/4*2.8,20,20);
  player.addImage(playerIMG);
  player.scale=0.1;
  enGroup=createGroup();
  rod=createSprite(windowWidth,windowHeight/2,10,windowHeight);
  bulletGroup=createGroup();
}

function draw() {
  background("skyBlue");
  rod.visible=false;
  if(gameState===play){
   player.visible=true;                  
   house.visible=true;
   ground.visible=true;  
   if(keyDown("space")){
   bullet=createSprite(player.x,player.y,20,20)
   bullet.addImage(bulletIMG)
   bullet.scale=0.025
   bullet.velocityX=7
   bulletGroup.add(bullet)
  }
  if(frameCount%50===0){
  en=createSprite(width,height/4*2.8);
   en.velocityX=-5;
   en.addAnimation("walking",enAnime);
   en.scale=random(0.3,0.6);
   if(en.collide(bulletGroup)){
    en.destroy()
   }
   enGroup.add(en);
   }
  if(bulletGroup.collide(rod)){
   bulletGroup[0].destroy();
   score+=1;
  }
  if(bulletGroup.collide(enGroup)){
   enGroup[0].destroy();
   bulletGroup.destroyEach();
   score+=1;
  }
  
  }
  textSize(50);
  stroke("black")
  fill("black")
  text("Score = "+score,windowWidth/4,height/4);
  if(enGroup.collide(house)){
   gameState=end
  }
  if(gameState===end){
   enGroup.destroyEach()
   bulletGroup.destroyEach();
   player.visible=false;                  
   house.visible=false;
   ground.visible=false;
    background("black");
    stroke("grey")
    fill("white")
    textFont("elephant")
    textSize(22)
    text("Game Over",windowWidth/2,height/2)
    text ("Press Space to Restart",width/2,width/4*3)
    if(keyDown("space")){
     score=0;
     gameState=play;
    }
  }
  drawSprites()
}