'use strict';
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

//screens
let winscreen;

//decl. mami et son image
let mami;
let mamImage;
let mamiMad;
let mamiWalk;
let mamiWalkLeft;
let mamiWalkUp;
let mamiWalkRight;
let mamiShoot;
let mamiShootLeft;
let mamiStopShoot;
let mamiStopShootLeft;
let mamiWalkDownArmor;
let mamiShootArmor;
let mamiStopShootArmor;
let mamiWalkRightArmor;
let mamiWalkLeftArmor;
let mamiShootLeftArmor;
let mamiStopShootLeftArmor;
let mamiScreaming = false;

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

//haies
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
let myCat4;
let cat1Image;
let cat2Image;
let cat3Image;
let cat4Image;
let cats;//groupe chats

//booléens pour savoir si les chats ont déjà spawné ou pas
let cat1spawn = false;
let cat2spawn = false;
let cat3spawn = false;
let cat4spawn = false;
let cat1spawnPlayed = false;
let cat2spawnPlayed = false;
let cat3spawnPlayed = false;
let cat4spawnPlayed = false;

//BOSS !
let myDragonBoss;
let dragonBossImage;
let dragonDeadImage;
let dragonspawn = false;
let dragonDead = false;
let myDragonDead;
let dragonSpawnPlayed = false;
let dragonDeadPlayed = false;

//barre de vie
let mamiLife = 500;

//comptage de points
let mamiScore = 0;
//compteur pour fixer limite score dans killBoss
let bigUpCount = 0;

//vie du boss(dragon)
let dragonLife = 250;

let gameoverScreen;//screen gameover
let gameisover = false;

let gameiswon = false;

//jeu en pause ou non
let gamePaused = false;
let pauseScreen = document.getElementById("pauseScreen");

//Items
let items;

let myCake;
let cakeImage;

let myWine;
let wineImage;

let myChicken;
let chickenImage;

let myArmor;
let armorImage;

let myCup;
let cupImage;

let mamiHasArmor = false;
let armorLife = 125;

//SOUNDS
let introSnd = document.createElement("audio");
introSnd.src = 'sons/intro.mp3';
introSnd.loop = false;
introSnd.preload = "auto";
let gameSong = document.createElement("audio");
gameSong.src = "sons/gameSong.mp3";
gameSong.loop = true;
gameSong.preload = "auto";
gameSong.volume = 0.8;
let bossSong = document.createElement("audio");
bossSong.src = "sons/bossSong.mp3";
bossSong.loop = true;
bossSong.preload = "auto";
let gameoverSong = document.createElement("audio");
gameoverSong.src = "sons/gameover.mp3";
gameoverSong.loop = false;
gameoverSong.preload = "auto";
let youwinSong = document.createElement("audio");
youwinSong.src = 'sons/youwin.mp3';
youwinSong.loop = false;
youwinSong.preload = "auto";
let songCat;

let songSpawnCat = document.createElement("audio");
songSpawnCat.src ='sons/chat/Miaulement.mp3';
songSpawnCat.loop = false;
songSpawnCat.preload = "auto";
songSpawnCat.volume = 0.6;
let songFightCat = document.createElement("audio");
songFightCat.src ='sons/chat/attack_cat.mp3';
songFightCat.loop = false;
songFightCat.preload = "auto";
let hittedCatSnd = document.createElement('audio');
hittedCatSnd.src = "sons/chat/hitted_cat.mp3";
hittedCatSnd.loop = false;
hittedCatSnd.preload = "auto";

let stickshotSnd = document.createElement("audio");
stickshotSnd.src = 'sons/coups/stickshot.mp3'; //coup de canne
stickshotSnd.loop = false;
stickshotSnd.preload = "auto";

let missShotSnd = document.createElement("audio");
missShotSnd.src = 'sons/coups/missShot.mp3'; //coup de canne dans le vent
missShotSnd.loop = false;
missShotSnd.volume = 0.3;
missShotSnd.preload = "auto";

let mamiCroc = document.createElement("audio");
mamiCroc.src = 'sons/mamie/croque.mp3';
mamiCroc.loop = false;
mamiCroc.preload = "auto";

let mamiPain = document.createElement("audio");
mamiPain.src = "sons/mamie/mamiPain.mp3";
mamiPain.loop = false;
mamiPain.preload = "auto";

let dragonSpawnSnd = document.createElement("audio");
dragonSpawnSnd.src = "sons/dragonSpawn.mp3";
dragonSpawnSnd.loop = false;
dragonSpawnSnd.preload = "auto";

let dragonDeadSnd = document.createElement("audio");
dragonDeadSnd.src = "sons/dragonDead.mp3";
dragonDeadSnd.loop = false;
dragonDeadSnd.preload = "auto";

let dragonPainSnd = document.createElement("audio");
dragonPainSnd.src = "sons/dragonPain.mp3";
dragonPainSnd.loop = false;
dragonPainSnd.preload = "auto";

//variables en lien avec l'intro
let introPlaying = true;
let canvasIntro = document.createElement('canvas');
let introParent = document.getElementById('introParent');
introParent.appendChild(canvasIntro);
canvasIntro.width = 1200;
canvasIntro.height = 800;
let introCtx = canvasIntro.getContext('2d');
let introImg = new Image();
introImg.src = 'img/introframe1.png';
let introImg2 = new Image();
introImg2.src = 'img/introframe2.png';
let introImg3 = new Image();
introImg3.src = 'img/introframe3.png';

//fonction lancement de l'intro
let startButton = document.getElementById('startButton');
let startScreen = document.getElementById('startScreen');
function launchIntro() {
    startButton.onclick = function() {
        startScreen.style.display = "none";
        introSnd.play();
        introCtx.clearRect(0,0, 1100,600);
        introCtx.drawImage(introImg, 0, 0, 1100, 600);
        let i = 1;
        let factor = 1;
            setInterval(function() {
                introImg.src = 'img/introframe'+i+'.png';
                introCtx.clearRect(0,0, 1100,600);
                introCtx.drawImage(introImg, 0, 0, 1100, 600);
                i = i+factor;
                if (i == 1 || i == 3 ) {
                    factor *= -1;
                }
            }, 200);

        setTimeout(function() {
            introParent.removeChild(canvasIntro);
            introPlaying = false;
        }, 11000);

    }
}
if (introPlaying === true) {
    launchIntro();
}

//fonctions de déclenchement des sons
function playStickSnd() {
    stickshotSnd.play();
}
function playMissSnd() {
    missShotSnd.play();
}
function playFightCat() {
    songFightCat.play();
}
function playSpawnCat() {
    songSpawnCat.play();
}
function playHittedCat() {
    hittedCatSnd.play();
}
function playMamiCroc() {
    mamiCroc.play();
}
let counterMamiPain = 0;//pour ne jouer le sons qu'un fois de tps en tps
function playMamiPain() {
    counterMamiPain ++;
    if (counterMamiPain === 100) {
        mamiPain.play();
        mamiScream();
        counterMamiPain = 0;
    } 
}
function playDragonSpawn() {
    setTimeout(function() {
        dragonSpawnSnd.play();
        dragonSpawnPlayed = true;
    }, 2000);
    
}
function playDragonDead() {
    dragonDeadSnd.play();
}
let counterDragonPain = 0;//pour ne jouer le son qu'une fois de temps en temps
function playDragonPain() {
    counterDragonPain++;
    if (counterDragonPain === 18) {
        dragonPainSnd.play();
        counterDragonPain = 0;
    }
}

function mamiScream() {
    mamiScreaming = true;
    setTimeout(function() {
        mamiScreaming = false;
    }, 550);
}
//fonction preload - P5JS
function preload() {
    //fond de la map
    mapImage = loadImage('img/map.png');


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

    //mamie
    
    mamImage = loadAnimation('img/mami_walk2.png');
    mamiMad = loadAnimation('img/mami_stand_mad.png');
    
    mamiWalk = loadAnimation('img/mami_walk1.png', 'img/mami_walk2.png', 'img/mami_walk3.png', 'img/mami_walk2.png');
    mamiWalk.frameDelay = 8;

    mamiWalkUp = loadAnimation("img/mami_walkUp1.png", "img/mami_walkUp2.png", "img/mami_walkUp3.png", "img/mami_walkUp2.png");
    mamiWalkUp.frameDelay = 8;

    mamiWalkRight = loadAnimation("img/mami_walkRight1.png", "img/mami_walkRight2.png", "img/mami_walkRight3.png", "img/mami_walkRight2.png");
    mamiWalkRight.frameDelay = 8;

    mamiWalkLeft = loadAnimation("img/mami_walkLeft1.png", "img/mami_walkLeft2.png", "img/mami_walkLeft3.png", "img/mami_walkLeft2.png");
    mamiWalkLeft.frameDelay = 8;

    mamiShoot = loadAnimation('img/mami_shoot1.png', 'img/mami_shoot2.png','img/mami_shoot3.png');
    mamiShoot.frameDelay = 6;

    mamiShootLeft = loadAnimation('img/mami_shootLeft2.png', 'img/mami_shootLeft3.png');
    mamiShootLeft.frameDelay = 6;

    mamiStopShoot = loadAnimation('img/mami_shoot3.png', 'img/mami_shoot2.png', 'img/mami_shoot1.png');
    mamiStopShoot.looping = false;
    mamiStopShoot.frameDelay = 6;

    mamiStopShootLeft = loadAnimation('img/mami_shootLeft3.png', 'img/mami_shootLeft2.png', 'img/mami_walkLeft2.png');
    mamiStopShootLeft.looping = false;
    mamiStopShootLeft.frameDelay = 6;
    
    mamiWalkDownArmor = loadAnimation('img/mami_walk1-armor.png', 'img/mami_walk2-armor.png', 'img/mami_walk3-armor.png', 'img/mami_walk2-armor.png');
    mamiWalkDownArmor.frameDelay = 8;
    
    mamiShootArmor = loadAnimation('img/mami_shoot1-armor.png', 'img/mami_shoot2-armor.png', 'img/mami_shoot3-armor.png');
    mamiShootArmor.frameDelay = 6;
    
    mamiStopShootArmor = loadAnimation('img/mami_shoot3-armor.png', 'img/mami_shoot2-armor.png', 'img/mami_shoot1-armor.png');
    mamiStopShootArmor.looping = false;
    mamiStopShootArmor.frameDelay = 6;
    
    mamiWalkLeftArmor = loadAnimation("img/mami_walkLeft1-armor.png", "img/mami_walkLeft2-armor.png", "img/mami_walkLeft3-armor.png", "img/mami_walkLeft2-armor.png");
    mamiWalkLeftArmor.frameDelay = 8;
    
    mamiWalkRightArmor = loadAnimation("img/mami_walkRight1-armor.png", "img/mami_walkRight2-armor.png", "img/mami_walkRight3-armor.png", "img/mami_walkRight2-armor.png");
    mamiWalkRightArmor.frameDelay = 8;
    
    mamiShootLeftArmor = loadAnimation('img/mami_shootLeft2-armor.png', 'img/mami_shootLeft3-armor.png');
    mamiShootLeftArmor.frameDelay = 6;
    
    mamiStopShootLeftArmor = loadAnimation('img/mami_shootLeft3-armor.png', 'img/mami_shootLeft2-armor.png', 'img/mami_walkLeft2-armor.png');
    mamiStopShootLeftArmor.frameDelay = 6;

    gameoverScreen = loadImage('img/gameover.png');
    winscreen = loadImage('img/winscreen.png');

    //cats
    cat1Image = loadAnimation("img/sprites_cat/cat1_walk1.png", "img/sprites_cat/cat1_walk2.png", "img/sprites_cat/cat1_walk3.png");
    cat2Image = loadAnimation("img/sprites_cat/cat2_walk1.png", "img/sprites_cat/cat2_walk2.png", "img/sprites_cat/cat2_walk3.png");
    cat3Image = loadAnimation("img/sprites_cat/cat3_walk1.png", "img/sprites_cat/cat3_walk2.png", "img/sprites_cat/cat3_walk3.png");
    cat4Image = loadAnimation("img/sprites_cat/cat4_walk1.png", "img/sprites_cat/cat4_walk2.png", "img/sprites_cat/cat4_walk3.png");

    //BOSS
    dragonBossImage = loadAnimation("img/sprites_boss/dragon_fly1.png","img/sprites_boss/dragon_fly2.png","img/sprites_boss/dragon_fly3.png");
    dragonBossImage.frameDelay = 8;
    dragonDeadImage = loadImage("img/sprites_boss/dragon_dead.png");

    //Items
    cakeImage = loadImage('img/sprites_items/cake.png');
    wineImage = loadImage('img/sprites_items/wine.png');
    chickenImage = loadImage('img/sprites_items/chicken.png');
    armorImage = loadImage('img/sprites_items/armor.png');
    cupImage = loadImage('img/sprites_items/cup.png');

}
//fonction setup - P5JS
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
    mami = createSprite(150, 350);//150 350
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
    mami.addAnimation('walkDownArmor', mamiWalkDownArmor);
    mami.addAnimation('shootingArmor', mamiShootArmor);
    mami.addAnimation('stopShootArmor', mamiStopShootArmor);
    mami.addAnimation('walkLeftArmor', mamiWalkLeftArmor);
    mami.addAnimation('walkRightArmor', mamiWalkRightArmor);
    mami.addAnimation('stopShootLeftArmor', mamiStopShootLeftArmor);
    mami.addAnimation('shootLeftArmor', mamiShootLeftArmor);
    mami.setCollider('rectangle', 0, 25, 25, 49);
    stickOffsetX = 22;
    stickOffsetY = 23;
    stickPosX = mami.position.x + stickOffsetX;
    stickPosY = mami.position.y + stickOffsetY;
    //sprite pour la canne
    mami.stick = createSprite(stickPosX, stickPosY, 35, 2);
    mami.stick.shapeColor = color(0,0,0,0);

    /*tourner le sprite mami pour que sa direction corresponde à celle des flèches du clavier*/
    mami.rotation = -90;
    mami.stick.rotation = -90;
    //pour que la canne soit plus puissante que les chats
    mami.stick.mass = 100000;

    //cats
    cats = new Group();

    myCat1 = createSprite(1280,480,20,20);
    myCat1.addAnimation('walk', cat1Image);
    cats.add(myCat1);

    myCat2 = createSprite(0,400,20,20);
    myCat2.addAnimation('walk', cat2Image);
    cats.add(myCat2);

    myCat3 = createSprite(700,580,20,20);
    myCat3.addAnimation('walk', cat3Image);
    cats.add(myCat3);

    myCat4 = createSprite(300,1200,20,20);
    myCat4.addAnimation('walk', cat4Image);
    cats.add(myCat4);

    //boss
    myDragonBoss = createSprite(1600,1200,100,100);
    myDragonBoss.addAnimation('fly', dragonBossImage);
    myDragonBoss.animation.frameDelay = 8;

    //Items
    items = new Group();

    myCake = createSprite(400,550);
    myCake.addImage('life', cakeImage);
    items.add(myCake);

    myWine = createSprite(1000,1000);
    myWine.addImage('life', wineImage);
    items.add(myWine);

    myChicken = createSprite(550,900);
    myChicken.addImage('life', chickenImage);
    items.add(myChicken);

    myCup = createSprite(1050,590);
    myCup.addImage('life', cupImage);
    items.add(myCup);

    myArmor = createSprite(1050,350);
    myArmor.addImage('armor', armorImage);
}
//fonction draw - P5JS
function draw() {
    background(220);
    //en cas de défaite : (life < 0)
    if (mamiLife <= 0) {
        gameisover = true;
        gameSong.pause();
        bossSong.pause();
        gameoverSong.play();
        image(gameoverScreen, camera.position.x - canvas.width/2, camera.position.y - canvas.height/2 , 800, 600);
        showReplayMsg();
        noLoop();
        //animation(gameover...)
    }
    //en cas de victoire:
    else if (mami.position.x > 1250 && mami.position.y > 1020 && dragonDead === true) {
        gameiswon = true;
        gameSong.pause();
        bossSong.pause();
        youwinSong.play();
        image(winscreen, camera.position.x - canvas.width/2, camera.position.y - canvas.height/2, 800, 600);
        showReplayMsg();
        noLoop();
        //animation(winscreen...);
    }
    //lancer l'intro au début
    else if(introPlaying === true) {
        //ne rien faire, la fonction intro s'excute à l'extérieur de la boucle
    }
    //sinon, on execute le jeu normalement
    else {
        gameSong.play();
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
            if (mamiHasArmor) {
                mami.changeAnimation('walkLeftArmor');
                mami.animation.play();
            }
          }
        if(keyDown(RIGHT_ARROW)){
              stickOffsetX = 22;
              coef = 1;
              mami.position.x += 0.5;
              mami.stick.position.x = mami.position.x + stickOffsetX;
              mami.changeAnimation('walkRight');
              mami.animation.play();
            if (mamiHasArmor) {
                mami.changeAnimation('walkRightArmor');
                mami.animation.play();
            }
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
            if (mamiHasArmor) {
                mami.changeAnimation('walkDownArmor');
                mami.animation.play();
            }
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
        //cats.collide(mami); //(?)

        //frapper avec la canne:
        let stickAngle = mami.stick.rotation * Math.PI / 180;
        let YplusVal = 0;
        function shootStick() {
            mami.changeAnimation('shooting');
            mami.animation.play();
            if (mamiHasArmor) {
                mami.changeAnimation('shootingArmor');
                mami.animation.play();
            }
            mami.stick.rotation -= 10;
            YplusVal += 10;
            mami.stick.position.x = stickPosX - (Math.cos(stickAngle) * 15);
            mami.stick.position.y = (stickPosY - 30) - Math.sin(stickAngle) * (30+YplusVal);
            if (mami.stick.rotation < -190 ) {
                isShooting =  false;
                mami.changeAnimation('stopShoot');
                mami.animation.play();
                if (mamiHasArmor) {
                    mami.changeAnimation('stopShootArmor');
                    mami.animation.play();
                }
            }
        }
        //frapper à gauche
        function shootStickLeft() {
            mami.changeAnimation('shootLeft');
            mami.animation.play();
            if (mamiHasArmor) {
                mami.changeAnimation('shootLeftArmor');
                mami.animation.play();
            }
            mami.stick.rotation += 10;
            YplusVal += 10;
            mami.stick.position.x = stickPosX - (Math.cos(stickAngle) * 15);
            mami.stick.position.y = (stickPosY - 30) - Math.sin(stickAngle) * (30+YplusVal);
            if (mami.stick.rotation > 10) {
                isShooting =  false;
                mami.changeAnimation('stopShootLeft');
                mami.animation.play();
                if (mamiHasArmor) {
                    mami.changeAnimation('stopShootLeftArmor');
                    mami.animation.play();
                }
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
        //apparition du boss
        function drawBoss(dragon) {
          drawSprite(dragon);
        }

       function spawnCat() {
            if (mami.position.x > 980 && mami.position.y < 600) {
                drawCat(myCat1);
                cat1spawn = true;
                if (cat1spawnPlayed === false) {
                    playSpawnCat();
                    cat1spawnPlayed = true;
                }
            }
            if (mami.position.x > 300) {
                drawCat(myCat2);
                cat2spawn = true;
                if (cat2spawnPlayed === false) {
                    playSpawnCat();
                    cat2spawnPlayed = true;
                }
            }
            if (mami.position.x > 600) {
                drawCat(myCat3);
                cat3spawn = true;
                if (cat3spawnPlayed === false) {
                    playSpawnCat();
                    cat3spawnPlayed = true;
                }

            }
            if (mami.position.y > 600) {
                drawCat(myCat4);
                cat4spawn = true;
                if (cat4spawnPlayed === false) {
                    playSpawnCat();
                    cat4spawnPlayed = true;
                }
            }

          }

        function spawnBoss() {
          if (mami.position.x >= 920 && mami.position.y >= 550 && mami.position.x <= 1250 && mami.position.y <= 850) {
            drawBoss(myDragonBoss);
            dragonspawn = true;
              if (dragonSpawnPlayed === false) {
                    playDragonSpawn();
//                    dragonSpawnPlayed = true;
                }
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

        if (cat4spawn) {
            myCat4.maxSpeed = 2;
            myCat4.attractionPoint(0.01, mami.position.x, mami.position.y);
            drawSprite(myCat4);
        }
    }

        //interactions mamie/chats :
        //(réécriture interactions chats dans une boucle)
        for (let cat of cats) {
           cat.overlap(mami.stick, function() {
                if (isShooting) {
                    cat.maxSpeed = 100;
                    cat.setVelocity(50*coef, 50*coef);
                    mamiScore ++;
                }
                else {
                    if(mamiHasArmor === true) {
                        armorLife -=1;
                    }
                    else mamiLife -= 1;
                }
            });
        }

        //éloigner le boss en frappant
        myDragonBoss.overlap(mami.stick, function() {
            if (isShooting) {
                myDragonBoss.maxSpeed = 50;
                myDragonBoss.setVelocity(50*coef, 50*coef);
                mamiScore += 5;
                dragonLife -= 2;
            }
            else {
                if(mamiHasArmor === true) {
                    armorLife -=1;
                }
                else mamiLife -= 2;
            }
        });

        //mort du dragon
        function killBoss() {
            myDragonDead = createSprite(myDragonBoss.position.x, myDragonBoss.position.y);
            myDragonDead.immovable = true;
            myDragonDead.addImage('dead', dragonDeadImage);
            dragonDead = true;
            drawSprite(myDragonDead);
            myDragonBoss.remove();

            //augmenter le score
            bigUpCount++;
            if (bigUpCount < 100) {
                mamiScore +=10;
            }
        }

        //Items disparaissent et remettent de la vie quand mami les mange

        for (let item of items) {
            mami.overlap(item,
                function() {
                    mamiLife +=100;
                    item.remove();
                    playMamiCroc();//son mamiCroc
                });
        }
        //traitement à part pour l'armure
        mami.overlap(myArmor, function() {
            mamiHasArmor = true;
            myArmor.remove();
        });
        if (armorLife <= 0) {
            mamiHasArmor = false;
        }
        //limiter l'augmentation de la vie à son max normal 100%
        if (mamiLife >= 500) {
            mamiLife = 500;
        }

        //afficher le tableau de bord :
        function showDashboard() {
            let mamiFaceImg = new Image();
            //changer l'affichage du visage de la mamie en fonction
            //de sa santé :
            if (((mamiLife / 500) *100) < 70 &&((mamiLife / 500) *100)>=50) {
                mamiFaceImg.src ='img/mamiface-70.png';
                if (isShooting === true && (((mamiLife / 500) *100) < 70 &&((mamiLife / 500) *100)>=50)) {
                    mamiFaceImg.src = "img/mamiface-mad70.png";
                }
                if (mamiScreaming) {
                    mamiFaceImg.src = "img/mamiface-scream70.png";
                }
            }
            else if (((mamiLife / 500) *100) < 50 && ((mamiLife / 500) *100) >= 20) {
                mamiFaceImg.src ='img/mamiface-50.png';
                if (isShooting === true && (((mamiLife / 500) *100) < 50 && ((mamiLife / 500) *100) >= 20)) {
                    mamiFaceImg.src = "img/mamiface-mad50.png";
                }
                if (mamiScreaming) {
                    mamiFaceImg.src = "img/mamiface-scream50.png";
                }
            }
            else if (((mamiLife / 500) *100) < 20) {
                mamiFaceImg.src ='img/mamiface-20.png';
                if (isShooting === true && (((mamiLife / 500) *100) < 20)) {
                    mamiFaceImg.src = "img/mamiface-mad20.png";
                }
                if (mamiScreaming) {
                    mamiFaceImg.src = "img/mamiface-scream20.png";
                }
            }
            else {
                mamiFaceImg.src ='img/mamiface-normal.png';
                if (isShooting === true) {
                    mamiFaceImg.src = "img/mamiface-mad.png";
                }
                if (mamiScreaming) {
                    mamiFaceImg.src = "img/mamiface-scream.png";
                }
            }
            //afficher un fond noir
            dashCtx.fillStyle = "#000";
            dashCtx.fillRect(0,0,dashboard.width,dashboard.height);
            //afficher la lifebar de mamie
            dashCtx.fillStyle = "#0f0";
            dashCtx.fillText("Vie mamie :  " + parseInt((mamiLife / 500) *100)+"%", 20, 45);
            //afficher le score de mamie:
            dashCtx.fillText("Score :  " + mamiScore + " points", 20, 570);
            dashCtx.fillRect(20,60, mamiLife /2, 30);
            dashCtx.strokeStyle = "#090";
            dashCtx.strokeRect(20, 60, 250, 30);
            dashCtx.drawImage(mamiFaceImg, 20, 120);
            //indications controles
            dashCtx.fillStyle = "#ddd";
            dashCtx.fillText("Contrôles clavier :", 20, 510);
            dashCtx.fillText("Frapper: *ESPACE* | Pause: *ECHAP*", 20, 530);
            dashCtx.fillText("Se déplacer: *FLECHES*", 20, 550);
            //afficher la lifebar du dragon quand il apparait
            if (dragonspawn && dragonLife > 0) {
                let dragonFaceImg = new Image();
                dragonFaceImg.src = 'img/sprites_boss/dragon_face.png';
                dashCtx.fillStyle = "#f00";
                dashCtx.fillText("Dragon :  " + parseInt((dragonLife / 250) *100)+"%", 20, 285);
                dashCtx.fillRect(20, 300, dragonLife, 30);
                dashCtx.strokeStyle = "#900";
                dashCtx.strokeRect(20, 300, 250, 30);
                dashCtx.drawImage(dragonFaceImg, 200, 218);
            }
            //afficher l'état de l'armure quand elle est là
            if (mamiHasArmor === true) {
                dashCtx.fillStyle = "#00f";
                dashCtx.fillText("Armure : " + parseInt((armorLife / 125) * 100) + "%", 20, 375);
                dashCtx.fillRect(20, 390, armorLife, 30);
                dashCtx.strokeStyle = "#009";
                dashCtx.strokeRect(20, 390, 125, 30);
            }
        }

        //DÉCLENCHEMENT DES SONS :
        //coup de canne mamie
        for (let cat of cats) {
            if (mami.stick.overlap(cat) === true && isShooting === true) {
                playStickSnd();
            }
            else if (mami.stick.overlap(cat) === false && isShooting === true) {
                playMissSnd();
            }
        }
        if (mami.stick.overlap(myDragonBoss) === true && isShooting === true) {
            playStickSnd();
        }

        //sons chats attaquent mamie
        for (let cat of cats) {
            if (mami.overlap(cat) === true) {
                playFightCat();
                playMamiPain();
          }
            else if(mami.stick.overlap(cat) === true && isShooting === true) {
                playHittedCat();
            }
        }
        
        if (mami.stick.overlap(myDragonBoss) === true && isShooting === true && dragonDead === false) {
            playDragonPain();
        }

        //Musique du boss
        if (dragonspawn === true) {
            gameSong.pause();
            bossSong.play();
        }
        //musique normale quand dragon mort
        if (dragonDead === true) {
            if (dragonDeadPlayed === false) {
                playDragonDead();//+bruit du dragon qui meurt
                dragonDeadPlayed = true;
            }
            
            bossSong.pause();
            gameSong.play();
        }


        showDashboard();

        drawSprite(myCake);
        drawSprite(myWine);
        drawSprite(myChicken);
        drawSprite(myCup);

        drawSprite(myArmor);

        drawSprites(houses);
        drawSprites(obstacles);

        if(dragonLife <= 0) {
            killBoss();
        }

        drawSprite(mami);
        drawSprite(mami.stick);

        spawnCat();
        updateCats();

        //le dragon n'est affiché que si sa vie est sup à 0.
        if (dragonLife > 0) {
            spawnBoss();
            updateBoss();
        }
        //pour mettre le jeu en pause (touche echap)
        if (keyDown(ESCAPE)) {
            if (gamePaused === false) {
                noLoop();
                gamePaused = true;
                pauseScreen.style.display = "block";
            }
        }

        camera.off();
    }//fin du else de départ

}//fin de draw()

//afficher le message "rejouer: entree" une fois le jeu fini 
// (donc hors loop)
function showReplayMsg() {
    if (gameisover || gameiswon) {
        dashCtx.fillStyle = "#ff0";
        dashCtx.fillText("[[Rejouer : *ENTREE*]]", 20, 410 );
    }
}

//fonction keyPressed - P5JS
function keyPressed() {
    //remettre le jeu en marche si il était sur pause
    if (keyCode === ENTER && gamePaused === true) {
        loop();
        gamePaused = false;
        pauseScreen.style.display = "none";
    }
    //réinitialiser le jeu sans recharger la page en appuyant sur entrée :
    else if(keyCode === ENTER && (gameiswon === true || gameisover === true)) {
        //remettre tout les booléens à l'état de départ
        gameiswon = false;
        gameisover = false;
        dragonDead = false;
        introPlaying = false;//ne pas repasser par le screen d'intro
        gamePaused = false;
        dragonspawn = false;
        cat1spawn = false;
        cat2spawn = false;
        cat3spawn = false;
        cat4spawn = false;
        cat1spawnPlayed = false;
        cat2spawnPlayed = false;
        cat3spawnPlayed = false;
        cat4spawnPlayed = false;
        dragonSpawnPlayed = false;
        dragonLife = 250;
        armorLife = 125;
        mami.changeAnimation("walkDown");
        gameoverSong.pause();
        youwinSong.pause();
        //ramener toutes les tracks au début
        gameSong.currentTime = 0;
        bossSong.currentTime = 0;
        gameoverSong.currentTime = 0;
        youwinSong.currentTime = 0;
        gameSong.play();
        mamiLife = 500;
        mamiScore = 0;
        if (dragonDead) {
            myDragonDead.remove();
        }

        setup();
        draw();
        loop();
    }
}