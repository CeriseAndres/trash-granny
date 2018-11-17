let myMap;
let mapImage;
let mySprite;
function preload() {
    mapImage = loadImage('img/map.png');
}
function setup() {
    createCanvas(400, 300);
    myMap = createSprite(400, 300, 800, 600);
    myMap.addImage('map', mapImage);
    mySprite = createSprite(200, 100, 20, 20);
    mySprite.shapeColor = color(250, 0, 0, 255);
    mySprite.rotation = -90;
}
function draw() {
    background(220);
    drawSprite(myMap);
      if(keyDown(LEFT_ARROW))
      {
          mySprite.position.x -= 1;
      }
      if(keyDown(RIGHT_ARROW))
      {
          mySprite.position.x += 1;
      }
      if(keyDown(UP_ARROW))
        {
        mySprite.position.y -= 1 ;
        }

        if(keyDown(DOWN_ARROW)) 
        {
            mySprite.position.y += 1;
        }
    
    
      camera.position.x = mySprite.position.x;
      camera.position.y = mySprite.position.y;
    
      if(mySprite.position.x < 0)
        mySprite.position.x = 0;
      if(mySprite.position.y < 0)
        mySprite.position.y = 0;
      if(mySprite.position.x > 800)
        mySprite.position.x = 799;
      if(mySprite.position.y > 600)
        mySprite.position.y = 599;
      drawSprite(mySprite);
      camera.off();
}