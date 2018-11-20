let myMap;
let mapImage;
let mySprite;
let maisons;
let myCat1;
let myCat2;
let myCat3;

function preload() {
    mapImage = loadImage('img/map.png');

}

function setup() {
    let canvas = createCanvas(800, 600);
    myMap = createSprite(800, 600, 1600, 1200);
    myMap.addImage('map', mapImage);
    
    maisons = new Group();
    let maison1 = createSprite(80, 80, 100, 100);
    maison1.shapeColor = color(0,0,255);
    maisons.add(maison1);
    let maison2 = createSprite(400, 150, 100, 100);
    maison2.shapeColor = color(0,0,255);
    maisons.add(maison2);
    let maison3 = createSprite(80, 350, 100, 100);
    maison3.shapeColor = color(0,0,255);
    maisons.add(maison3);
    let maison4 = createSprite(600, 300, 100, 100);
    maison4.shapeColor = color(0,0,255);
    maisons.add(maison4);
    
    mySprite = createSprite(120, 185, 20, 20);
    mySprite.shapeColor = color(250, 0, 0, 255);
    /*tourner le sprite pour qu'il soit tourné vers le bas*/
    mySprite.rotation = -90;

    myCat1 = createSprite(500,300,20,20);
    myCat1.addAnimation('normal', "img/sprites_cat/cat1_walk1.png", "img/sprites_cat/cat1_walk2.png", "img/sprites_cat/cat1_walk3.png");
    
    myCat2 = createSprite(100,200,20,20);
    myCat2.addAnimation('normal', "img/sprites_cat/cat2_walk1.png", "img/sprites_cat/cat2_walk2.png", "img/sprites_cat/cat2_walk3.png");

    myCat3 = createSprite(50,10,20,20);
    myCat3.addAnimation('normal', "img/sprites_cat/cat3_walk1.png", "img/sprites_cat/cat3_walk2.png", "img/sprites_cat/cat3_walk3.png");
}
function draw() {
    background(220);
    mySprite.collide(maisons);
    
    drawSprite(myMap);
    /*faire bouger le sprite (mamie) avec les fleches*/
      if(keyDown(LEFT_ARROW)){
          mySprite.position.x -= 4;
      }
      if(keyDown(RIGHT_ARROW)){
          mySprite.position.x += 4;
      }
      if(keyDown(UP_ARROW)){
        mySprite.position.y -= 4 ;
        }

        if(keyDown(DOWN_ARROW)) {
            mySprite.position.y += 4;
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
      drawSprites(maisons);
    /*function spawnCats (){
        if (mySprite.position.y = 190) {
            
            myCat1.maxSpeed = 3;
            myCat1.attractionPoint(0.08, mySprite.position.x, mySprite.position.y);
            drawSprite(myCat1);
        }
    }*/
    myCat1.maxSpeed = 3;
    myCat1.attractionPoint(0.08, mySprite.position.x, mySprite.position.y);
    drawSprite(myCat1);

    myCat2.maxSpeed = 3;
    myCat2.attractionPoint(0.08, mySprite.position.x, mySprite.position.y);
    drawSprite(myCat2);

    myCat3.maxSpeed = 3;
    myCat3.attractionPoint(0.08, mySprite.position.x, mySprite.position.y);
    drawSprite(myCat3);

      camera.off();
}
