let myMap;
let mapImage;
let mySprite;
function preload() {
    mapImage = loadImage('img/map.png');
}
function setup() {
    
    let canvas = createCanvas(400, 300);
    myMap = createSprite(400, 300, 800, 600);
    myMap.addImage('map', mapImage);
    mySprite = createSprite(canvas.width/2, canvas.height/2, 20, 20);
    mySprite.shapeColor = color(250, 0, 0, 255);
    /*tourner le sprite pour qu'il soit tourné vers le bas*/
    mySprite.rotation = -90;
}
function draw() {
    background(220);
    drawSprite(myMap);
    /*faire bouger le sprite (mamie) avec les fleches*/
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
    /*la caméra suit le sprite*/
    camera.position.x = mySprite.position.x;
    camera.position.y = mySprite.position.y;
    
    /*limiter le mouvement de la caméra au bord de la map*/
    if (camera.position.x < canvas.width /2) {
        camera.position.x = canvas.width / 2;
    }
    if (camera.position.x > (myMap.width - (canvas.width / 2))) {
        camera.position.x = myMap.width - (canvas.width / 2);
    }
    if (camera.position.y < canvas.height / 2 ) {
        camera.position.y = canvas.height / 2;
    }
    if (camera.position.y > (myMap.height - (canvas.height / 2))) {
        camera.position.y = myMap.height - (canvas.height / 2);
    }
    
    /*limiter le mouvement du sprite aux limites de la map. (calcul un peu bizarre car les coordonnées de la classe sprite sont données pour son centre)*/
    if((mySprite.position.x - (mySprite.width / 2)) < 0)
        mySprite.position.x = 0 + mySprite.width / 2;
    if((mySprite.position.x + (mySprite.width / 2)) > myMap.width)
        mySprite.position.x = myMap.width - mySprite.width / 2;
    if((mySprite.position.y - (mySprite.height / 2)) < 0)
        mySprite.position.y = 0 + mySprite.height / 2;

    if((mySprite.position.y + (mySprite.height / 2)) > myMap.height)
        mySprite.position.y = myMap.height - mySprite.height / 2;
    
      drawSprite(mySprite);
      camera.off();
}