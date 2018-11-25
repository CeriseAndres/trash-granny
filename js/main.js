let myMap; //declaration de la map et de son image
let mapImage;

let mami;//decl. mami et son image
let mamImage;
let stickImage;//canne de mami
let isShooting = false;//vrai si un coup de canne est donné.
let stickPosX;
let stickPosY;
let stickOffsetX;
let stickOffsetY;
let coef; //1 ou -1 selon rotation canne a droite ou a gauche
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
    mamImage = loadAnimation('img/mami_walk2.png');
    mamiMad = loadAnimation('img/mami_stand_mad.png');
    //images des maisons
    houseImage1 = loadImage('img/maison1.png');
    houseImage2 = loadImage('img/maison2.png');
    houseImage3 = loadImage('img/maison3.png');
    houseImage4 = loadImage('img/maison4.png');
    houseImage1rev = loadImage('img/maison1rev.png');
    trashImage = loadImage('img/local-poubelle.png');
    
    //mamie et canne
    stickImage = loadImage('img/stick.png');
    mamiWalk = loadAnimation('img/mami_walk1.png', 'img/mami_walk2.png', 'img/mami_walk3.png', 'img/mami_walk2.png');
    mamiWalk.frameDelay = 8;
    
    mamiWalkUp = loadAnimation("img/mami_walkUp1.png", "img/mami_walkUp2.png", "img/mami_walkUp3.png", "img/mami_walkUp2.png");
    mamiWalkUp.frameDelay = 8;
    
    mamiWalkRight = loadAnimation("img/mami_walkRight1.png", "img/mami_walkRight2.png", "img/mami_walkRight3.png", "img/mami_walkRight2.png");
    mamiWalkRight.frameDelay = 8;
    
    mamiWalkLeft = loadAnimation("img/mami_walkLeft1.png", "img/mami_walkLeft2.png", "img/mami_walkLeft3.png", "img/mami_walkLeft2.png");
    mamiWalkLeft.frameDelay = 8;
    
    mamiShoot = loadAnimation('img/mami_shoot2.png', 'img/mami_shoot2.png','img/mami_shoot3.png', 'img/mami_shoot3.png','img/mami_shoot3.png', 'img/mami_shoot2.png');
    //mamiShoot.looping = false;
    mamiShoot.frameDelay = 2;
    
    //chats
    catWalk = loadAnimation("img/sprites_cat/cat1_walk1.png", "img/sprites_cat/cat1_walk2.png", "img/sprites_cat/cat1_walk3.png");
    catWalk.frameDelay = 5;
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
    
    //sprite mami
    mami = createSprite(200, 300);
    mami.addAnimation('stand', mamImage);
    mami.addAnimation('walkDown', mamiWalk);
    mami.addAnimation('walkUp', mamiWalkUp);
    mami.addAnimation('walkRight', mamiWalkRight);
    mami.addAnimation('walkLeft', mamiWalkLeft);
    mami.addAnimation('shooting', mamiShoot);
    mami.addAnimation('standMad', mamiMad);
    mami.setCollider('rectangle', 0, 25, 25, 49);
    stickOffsetX = 22;
    stickOffsetY = 23;
    stickPosX = mami.position.x + stickOffsetX;
    stickPosY = mami.position.y + stickOffsetY;
    //sprite pour la canne
    mami.stick = createSprite(stickPosX, stickPosY);
    mami.stick.addImage('stick', stickImage);
    
    /*tourner le sprite mami pour que sa direction corresponde à celle des flèches du clavier*/
    mami.rotation = -90;
    mami.stick.rotation = -90;
    //pour que la canne soit plus puissante que le chat
    mami.stick.mass = 100000;

    myCat = createSprite(300,200,20,20);
    myCat.shapeColor = color(0,0,0, 255);
    myCat.addAnimation('normal', catWalk);
    myCat.mass = 0;
    
}

function draw() {
    background(220);
    
    stickPosX = mami.position.x + stickOffsetX;
    stickPosY = mami.position.y + stickOffsetY;
    
    
    drawSprite(myMap);
    /*faire bouger le sprite (mamie) avec les fleches*/
    mamiWalk.stop();
    if(keyDown(LEFT_ARROW)){
          stickOffsetX = -22;
          coef = -1;
          mami.position.x -= 0.5;
          mami.stick.position.x = mami.position.x + stickOffsetX;
          mami.changeAnimation('walkLeft');
          mami.animation.play();
      }
    if(keyDown(RIGHT_ARROW)){
          stickOffsetX = 22;
          coef = 1;
          mami.position.x += 0.5;
          mami.stick.position.x = mami.position.x + stickOffsetX;
          mami.changeAnimation('walkRight');
          mami.animation.play();
      }
    if(keyDown(UP_ARROW)){
        coef = -1;
        stickOffsetX = -22;
        mami.position.y -= 0.5;
        mami.stick.position.x = mami.position.x + stickOffsetX;
        mami.stick.position.y = mami.position.y + stickOffsetY;
        mami.changeAnimation('walkUp');
        mami.animation.play();
        }
    if(keyDown(DOWN_ARROW)) {
            coef = 1;
            stickOffsetX = 22;
            mami.position.y += 0.5;
            mami.stick.position.x = mami.position.x + stickOffsetX;
            mami.stick.position.y = mami.position.y + stickOffsetY;
            mami.changeAnimation('walkDown');
            mami.animation.play();
        }
    if (keyWentUp(LEFT_ARROW) || keyWentUp(RIGHT_ARROW) || keyWentUp(UP_ARROW) || keyWentUp(DOWN_ARROW)) {
        mami.animation.stop();
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
    myCat.maxSpeed = 2.5;
    myCat.attractionPoint(0.02, mami.position.x, mami.position.y);
    
    
    //collisions : 
    mami.collide(houses);
    myCat.collide(houses);
    
    //frapper avec la canne:
    let stickAngle = mami.stick.rotation * Math.PI / 180;
    let YplusVal = 0;
    function shootStick() {
        mami.changeAnimation('shooting');
        mami.animation.play();
        mami.stick.rotation -= 12;
        YplusVal += 10;
        mami.stick.position.x = (stickPosX) - Math.cos(stickAngle) * 5;
        mami.stick.position.y = (stickPosY - 30) - Math.sin(stickAngle) * (30+YplusVal);
        if (mami.stick.rotation < -160) {
            isShooting =  false;
            mami.changeAnimation('standMad');
        }
    }
    
    //ramener la canne:
    function stopStick() {
        if (mami.stick.rotation <= -90) {
            mami.stick.rotation += 10;
            YplusVal = 0;
            mami.stick.position.x = (stickPosX) - Math.cos(stickAngle) * 30;
            mami.stick.position.y = (stickPosY - 30) - Math.sin(stickAngle) * (30);
        }
        
    }
    
    if (isShooting) {
        shootStick();
    }
    if (!isShooting) {
        stopStick();
    }
    

    
    //déclencher coup de canne
    window.onkeydown = function(e) {
        if (e.keyCode == 32) {
            isShooting = true;
        }
    };
    
    //eloigner le chat en frappant
    let ejectCat = function() {
        if (isShooting) {
            myCat.maxSpeed = 50;
            myCat.setVelocity(50, 50);
        }
    }
    myCat.overlap(mami.stick, ejectCat);
    
    drawSprites(houses);
    drawSprite(mami);
    drawSprite(mami.stick);
    drawSprite(myCat);
    
    camera.off();

}
