let myMap; //declaration de la map et de son image
let mapImage;

let mami;//decl. mami et son image
let mamImage;

//decl. maisons
let house1;
let house2;
let house3;
let house4;
let house5;
let house6;
let house7;
let house8;
let houseTrash; //local poubelle

let houses;  //groupe de toutes les maisons pour traitement de groupe

//decl. images maison
let houseImage1;
let houseImage2;
let houseImage3;
let houseImage4;
let houseImage1rev;
let trashImage;


let myCat;

function preload() {
    //fond de la map
    mapImage = loadImage('img/map.png');
    //image de la mamie
    mamImage = loadImage('img/mami.png');
    //images des maisons
    houseImage1 = loadImage('img/maison1.png');
    houseImage2 = loadImage('img/maison2.png');
    houseImage3 = loadImage('img/maison3.png');
    houseImage4 = loadImage('img/maison4.png');
    houseImage1rev = loadImage('img/maison1rev.png');
    trashImage = loadImage('img/local-poubelle.png');
}

function setup() {
    //initialisation de la map :
    let canvas = createCanvas(800, 600);
    myMap = createSprite(800, 600);
    myMap.addImage('map', mapImage);
    houses = new Group();
    //initialisation des maisons :
    house1 = createSprite(190,120);
    house1.addImage('maison1', houseImage1);
    houses.add(house1);
    
    house2 = createSprite(850, 60);
    house2.addImage('maison3', houseImage3);
    houses.add(house2);
    
    house3 = createSprite(1400, 70);
    house3.addImage('maison2', houseImage2);
    houses.add(house3);
    
    house4 = createSprite(160, 600);
    house4.addImage('maison3', houseImage3);
    houses.add(house4);
    
    house5 = createSprite(795, 350);
    house5.addImage('maison4', houseImage4);
    houses.add(house5);
    
    house6 = createSprite(1450, 515);
    house6.addImage('maison1rev', houseImage1rev);
    houses.add(house6);
    
    house7 = createSprite(170, 1115);
    house7.addImage('maison2', houseImage2);
    houses.add(house7);
    
    house8 = createSprite(780, 1000);
    house8.addImage('maison1rev', houseImage1rev);
    houses.add(house8);
    
    houseTrash = createSprite(1415, 1020);
    houseTrash.addImage('localPoub', trashImage);
    houses.add(houseTrash);
    

    mami = createSprite(200, 300);
    mami.addImage('stand', mamImage);
    
    /*tourner le sprite pour qu'il soit tourné vers le bas*/
    mami.rotation = -90;

    myCat = createSprite(300,200,20,20);
    myCat.shapeColor = color(0,0,0, 255);
    myCat.addAnimation('normal', "img/sprites_cat/cat1_walk1.png", "img/sprites_cat/cat1_walk2.png", "img/sprites_cat/cat1_walk3.png");
    
}
function draw() {
    background(220);
    
    drawSprite(myMap);
    /*faire bouger le sprite (mamie) avec les fleches*/
      if(keyDown(LEFT_ARROW)){
          mami.position.x -= 1;
      }
      if(keyDown(RIGHT_ARROW)){
          mami.position.x += 1;
      }
      if(keyDown(UP_ARROW)){
        mami.position.y -= 1 ;
        }

        if(keyDown(DOWN_ARROW)) {
            mami.position.y += 1;
        }
    /*la caméra suit le sprite*/
    camera.position.x = mami.position.x;
    camera.position.y = mami.position.y;
    
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
    if((mami.position.x - (mami.width / 2)) < 0)
        mami.position.x = 0 + mami.width / 2;
    if((mami.position.x + (mami.width / 2)) > myMap.width)
        mami.position.x = myMap.width - mami.width / 2;
    if((mami.position.y - (mami.height / 2)) < 0)
        mami.position.y = 0 + mami.height / 2;
    if((mami.position.y + (mami.height / 2)) > myMap.height)
        mami.position.y = myMap.height - mami.height / 2;
    
    //comportement du chat
    myCat.maxSpeed = 3;
    myCat.attractionPoint(0.08, mami.position.x, mami.position.y);
    myCat.collide(houses);
    
    //collisions : 
    mami.collide(houses);
    
    
    drawSprite(mami);
    drawSprites(houses);
    drawSprite(myCat);
    
    camera.off();
    
    

    
}
