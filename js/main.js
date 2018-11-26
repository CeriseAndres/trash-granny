//placement des canvas dans le dom par leur parent :
let canvasParent = document.getElementById('canvasParent');
let dashboardParent = document.getElementById('dashboard');
let dashboard = document.createElement('canvas');
dashboardParent.appendChild(dashboard);
dashboard.width = 300;
dashboard.height = 600;
let dashCtx = dashboard.getContext('2d');
dashCtx.font = "13px monospace";

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

let haieXimg;
let haieYimg;
let haieXRevimg;
let haieX1;
let haieX2;
let haieX3;
let haieX4;
let haieX5;
let haieY1;
let haieY2;
let haieY3;
let haieY4;
let obstacles;

let houses;  //groupe de toutes les maisons pour traitement de groupe

//decl. images maison
let houseImage1;
let houseImage2;
let houseImage3;
let houseImage4;
let houseImage1rev;
let trashImage;

//let myCat;
let myCat1;
let myCat2;
let myCat3;

let cats;

let cat1spawn = false;
let cat2spawn = false;
let cat3spawn = false;
let myDragonBoss;
let dragonspawn = false;


//barre de vie
let mamiLife = 500;

//comptage de points
let mamiScore = 0;

let gameover;

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
    haieXimg = loadImage('img/haieX.png');
    haieXRevimg = loadImage("img/haieXrev.png");
    haieYimg = loadImage('img/haieY.png');
    
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
    
    mamiShoot = loadAnimation('img/mami_shoot1.png', 'img/mami_shoot2.png','img/mami_shoot3.png');
    //mamiShoot.looping = false;
    mamiShoot.frameDelay = 6;
    
    mamiShootLeft = loadAnimation('img/mami_shootLeft2.png', 'img/mami_shootLeft3.png');
    //mamiShootLeft.looping = false;
    mamiShootLeft.frameDelay = 6;
    
    mamiStopShoot = loadAnimation('img/mami_shoot3.png', 'img/mami_shoot2.png', 'img/mami_shoot1.png');
    mamiStopShoot.looping = false;
    mamiStopShoot.frameDelay = 6;
    
    mamiStopShootLeft = loadAnimation('img/mami_shootLeft3.png', 'img/mami_shootLeft2.png', 'img/mami_walkLeft2.png');
    mamiStopShootLeft.looping = false;
    mamiStopShootLeft.frameDelay = 6;
    
    gameover = loadImage('img/gameover.png');

}

function setup() {
    //initialisation de la map :
    let canvas = createCanvas(800, 600);
    canvas.parentElement = canvasParent;
    
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
    
    obstacles = new Group();
    //haies horizontales
    haieX1 = createSprite(380, 215);
    haieX1.addImage('haieX', haieXimg);
    obstacles.add(haieX1);
    haieX2 = createSprite(340, 475);
    haieX2.addImage('haieX', haieXimg);
    obstacles.add(haieX2);
    haieX3 = createSprite(440, 475);
    haieX3.addImage('haieX', haieXimg);
    obstacles.add(haieX3);
    haieX4 = createSprite(550, 1040);
    haieX4.addImage('haieX', haieXRevimg);
    obstacles.add(haieX4);
    haieX5 = createSprite(1170, 980);
    haieX5.addImage('haieX', haieXRevimg);
    obstacles.add(haieX5);
    //haies verticales
    haieY1 = createSprite(240, 775);
    haieY1.addImage('haieY', haieYimg);
    obstacles.add(haieY1);
    
    haieY2 = createSprite(660, 550);
    haieY2.addImage('haieY', haieYimg);
    obstacles.add(haieY2);
    
    haieY3 = createSprite(1320, 680);
    haieY3.addImage('haieY', haieYimg);
    obstacles.add(haieY3);
    
    //sprite mami
    mami = createSprite(150, 350);
    mami.addAnimation('stand', mamImage);
    mami.addAnimation('walkDown', mamiWalk);
    mami.addAnimation('walkUp', mamiWalkUp);
    mami.addAnimation('walkRight', mamiWalkRight);
    mami.addAnimation('walkLeft', mamiWalkLeft);
    mami.addAnimation('shooting', mamiShoot);
    mami.addAnimation('shootLeft', mamiShootLeft);
    mami.addAnimation('stopShoot', mamiStopShoot);
    mami.addAnimation('stopShootLeft', mamiStopShootLeft);
    mami.addAnimation('standMad', mamiMad);
    mami.setCollider('rectangle', 0, 25, 25, 49);
    stickOffsetX = 22;
    stickOffsetY = 23;
    stickPosX = mami.position.x + stickOffsetX;
    stickPosY = mami.position.y + stickOffsetY;
    //sprite pour la canne
    mami.stick = createSprite(stickPosX, stickPosY, 35, 2);
    mami.stick.shapeColor = color(0,0,0,0);
    //mami.stick.addImage('stick', stickImage);
    
    /*tourner le sprite mami pour que sa direction corresponde à celle des flèches du clavier*/
    mami.rotation = -90;
    mami.stick.rotation = -90;
    //pour que la canne soit plus puissante que le chat
    mami.stick.mass = 100000;

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

    cats = new Group();
    
    myCat1 = createSprite(500,300,20,20);
    myCat1.addAnimation('normal', "img/sprites_cat/cat1_walk1.png", "img/sprites_cat/cat1_walk2.png", "img/sprites_cat/cat1_walk3.png");
    cats.add(myCat1);
    
    myCat2 = createSprite(50,10,20,20);
    myCat2.addAnimation('normal', "img/sprites_cat/cat2_walk1.png", "img/sprites_cat/cat2_walk2.png", "img/sprites_cat/cat2_walk3.png");
    cats.add(myCat2);

    myCat3 = createSprite(800,500,20,20);
    myCat3.addAnimation('normal', "img/sprites_cat/cat3_walk1.png", "img/sprites_cat/cat3_walk2.png", "img/sprites_cat/cat3_walk3.png");
    cats.add(myCat3)

    myDragonBoss = createSprite(800,600,100,100);
    myDragonBoss.addAnimation('normal',"img/sprites_boss/dragon_fly1.png","img/sprites_boss/dragon_fly2.png","img/sprites_boss/dragon_fly3.png");
    myDragonBoss.animation.frameDelay = 8;
}

function draw() {
    background(220);
    //en cas de défaite : (life < 0)
    if (mamiLife <= 0) {
        background(0);
        image(gameover, width/2, height/2);
    }
    //sinon, on execute le jeu
    else {
        
        stickPosX = mami.position.x + stickOffsetX;
        stickPosY = mami.position.y + stickOffsetY;

        drawSprite(myMap);

        /*faire bouger le sprite (mamie) avec les fleches*/
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

        //collisions : 
        mami.collide(houses);
        cats.collide(houses);
        mami.collide(obstacles);
        cats.collide(obstacles);

        //frapper avec la canne:
        let stickAngle = mami.stick.rotation * Math.PI / 180;
        let YplusVal = 0;
        function shootStick() {
            mami.changeAnimation('shooting');
            mami.animation.play();
            mami.stick.rotation -= 10;
            YplusVal += 10;
            mami.stick.position.x = stickPosX - (Math.cos(stickAngle) * 15);
            mami.stick.position.y = (stickPosY - 30) - Math.sin(stickAngle) * (30+YplusVal);
            if (mami.stick.rotation < -190 ) {
                isShooting =  false;
                mami.changeAnimation('stopShoot');
                mami.animation.play();
            }
        }
        //frapper à gauche
        function shootStickLeft() {
            mami.changeAnimation('shootLeft');
            mami.animation.play();
            mami.stick.rotation += 10;
            YplusVal += 10;
            mami.stick.position.x = stickPosX - (Math.cos(stickAngle) * 15);
            mami.stick.position.y = (stickPosY - 30) - Math.sin(stickAngle) * (30+YplusVal);
            if (mami.stick.rotation > 10) {
                isShooting =  false;
                mami.changeAnimation('stopShootLeft');
                mami.animation.play();
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
        //ramener la canne quand frappé à gauche
        function stopStickLeft() {
            if (mami.stick.rotation >= -90) {
                mami.stick.rotation -= 10;
                YplusVal = 0;
                mami.stick.position.x = (stickPosX) - Math.cos(stickAngle) * 30;
                mami.stick.position.y = (stickPosY - 30) - Math.sin(stickAngle) * (30);
            }

        }

        if (isShooting) {
            if (coef === 1) shootStick();
            if (coef === -1) shootStickLeft();

        }
        if (!isShooting) {
            if (coef === 1) stopStick();
            if (coef === -1) stopStickLeft();
        }


        //déclencher coup de canne
        window.onkeydown = function(e) {
            if (e.keyCode == 32) {
                isShooting = true;
            }
        };

        /*Apparition des chats à une ordonnée précise de la mamie*/
        function drawCat(cat) {
            drawSprite(cat);
        }

        function drawBoss(dragon) {
          drawSprite(dragon);
        }

       function spawnCat() {
            if ((mami.position.x == 200)) {
                drawCat(myCat1);
                cat1spawn = true;

            }
            if (mami.position.x == 300) {
                drawCat(myCat2);
                cat2spawn = true;
            }
            if (mami.position.x == 500) {
                drawCat(myCat3);
                cat3spawn = true;
            }

        }

        function spawnBoss() {
          if (mami.position.x == 500) {
            drawBoss(myDragonBoss);
            dragonspawn = true;
          }
        }

        function updateBoss() {
          if (dragonspawn) {
            myDragonBoss.maxSpeed = 3;
            myDragonBoss.attractionPoint(0.04, mami.position.x, mami.position.y);
            drawSprite(myDragonBoss);
          }
        }

        function updateCats() {
            if (cat1spawn) {
                myCat1.maxSpeed = 2;
                myCat1.attractionPoint(0.01, mami.position.x, mami.position.y);
                drawSprite(myCat1);
            }

            if (cat2spawn) {
                myCat2.maxSpeed = 2;
                myCat2.attractionPoint(0.01, mami.position.x, mami.position.y);
                drawSprite(myCat2);
            }

            if (cat3spawn) {
            myCat3.maxSpeed = 2;
            myCat3.attractionPoint(0.01, mami.position.x, mami.position.y);
            drawSprite(myCat3);
            }

        }

        //interactions mamie/chats :
        myCat1.overlap(mami.stick, function() {
            if (isShooting) {
                myCat1.maxSpeed = 100;
                myCat1.setVelocity(50*coef, 50*coef);
                mamiScore ++;
            }
            else {
                mamiLife --;
            }
        });
        myCat2.overlap(mami.stick, function() {
            if (isShooting) {
                myCat2.maxSpeed = 100;
                myCat2.setVelocity(50*coef, 50*coef);
                mamiScore ++;
            }
            else {
                mamiLife --;
            }
        });
        myCat3.overlap(mami.stick, function() {
            if (isShooting) {
                myCat3.maxSpeed = 100;
                myCat3.setVelocity(50*coef, 50*coef);
                mamiScore ++;
            }
            else {
                mamiLife --;
            }
        });
        //éloigner le boss en frappant
        myDragonBoss.overlap(mami.stick, function() {
            if (isShooting) {
                myDragonBoss.maxSpeed = 50;
                myDragonBoss.setVelocity(50*coef, 50*coef);
                mamiScore += 5;
            }
            else {
                mamiLife -= 2;
            }
        });
        //afficher la barre de vie :
        function showDashboard() {
            let mamiFaceImg = new Image();
            if (((mamiLife / 500) *100) < 70 &&((mamiLife / 500) *100)>=50) mamiFaceImg.src ='img/mamiface-70.png';
            else if (((mamiLife / 500) *100) < 50 && ((mamiLife / 500) *100) >= 20) {
                mamiFaceImg.src ='img/mamiface-50.png';
            }
            else if (((mamiLife / 500) *100) < 20) {
                mamiFaceImg.src ='img/mamiface-20.png';
            }
            else {
                mamiFaceImg.src ='img/mamiface-normal.png';
            }
            dashCtx.fillStyle = "#000";
            dashCtx.fillRect(0,0,dashboard.width,dashboard.height);
            dashCtx.fillStyle = "#0f0";
            dashCtx.fillText("Vie mamie :  " + parseInt((mamiLife / 500) *100)+"%", 20, 45);
            dashCtx.fillText("Score :  " + mamiScore + " points", 20, 270);
            dashCtx.fillRect(20,60, mamiLife /2, 30);
            dashCtx.strokeStyle = "#090";
            dashCtx.strokeRect(20, 60, 250, 30);
            dashCtx.drawImage(mamiFaceImg, 20, 120);
        }
        showDashboard();

        drawSprites(houses);
        drawSprites(obstacles);
        drawSprite(mami);
        drawSprite(mami.stick);

        spawnCat();
        spawnBoss();
        updateCats();
        updateBoss();

        camera.off();
    }//fin du else de départ 
}
