var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.4;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlocksGroup = new Group();
}

function draw() {
  background(200);
  
  if(gameState == "play")
  {

    if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("space"))
    {
      ghost.velocityY=-13;
    }
    ghost.velocityY = ghost.velocityY+0.5;

    if(keyDown(RIGHT_ARROW))
    {
      ghost.x = ghost.x+5;
    }
    if(keyDown(LEFT_ARROW))
    {
      ghost.x = ghost.x-5;
    }

    if(climbersGroup.isTouching(ghost))
    {
      ghost.velocityY=0;
    }

    spawnDoors();
    drawSprites();

    if(ghost.y > 600 || invisibleBlocksGroup.isTouching(ghost))
    {
      gameState =   "end";
    }
    
  }
  if(gameState === "end")
  {
    ghost.destroy();
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",150,300);


  }

  

    
    
}

function spawnDoors()
{
  if(frameCount%60 == 0)
  {
    door = createSprite(200,-50);
    door.velocityY=6;
    door.addImage("door",doorImg);
    door.lifetime=800;
    doorsGroup.add(door);

    climber = createSprite(200,10);
    climber.velocityY=6;
    climber.addImage("climber",climberImg);
    climber.lifetime=800;
    climbersGroup.add(climber);

    invisibleBlock = createSprite(200,15);
    invisibleBlock.velocityY=6;
    invisibleBlock.visible=true;
    invisibleBlock.width = climber.width;
    invisibleBlock.height=2;
    invisibleBlock.debug=true;
    invisibleBlock.lifetime=800;
    invisibleBlocksGroup.add(invisibleBlock);

    door.x = Math.round(random(120,400));
    climber.x = door.x;

    invisibleBlock.x = door.x;

    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;



  }
}
