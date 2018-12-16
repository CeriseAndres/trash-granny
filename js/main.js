'use strict';

if (introPlaying === true) {
    launchIntro();
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
    const canvas = createCanvas(800, 600);
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

        if (isShooting) {
            if (coef === 1) shootStick();
            if (coef === -1) shootStickLeft();

        }
        if (!isShooting) {
            if (coef === 1) stopStick();
            if (coef === -1) stopStickLeft();
        }

        //frapper avec la canne:
        stickAngle = mami.stick.rotation * Math.PI / 180;
        YplusVal = 0;

        //déclencher coup de canne
        window.onkeydown = function(e) {
            if (e.keyCode == 32) {
                isShooting = true;
            }
        };


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

        drawSprite(myMap);//dessiner la map de base

        showDashboard();//dessiner le tableau de bord

        //dessiner le items
        drawSprite(myCake);
        drawSprite(myWine);
        drawSprite(myChicken);
        drawSprite(myCup);

        drawSprite(myArmor);//armure

        //dessiner les obstacles : maisons, haies
        drawSprites(houses);
        drawSprites(obstacles);

        //dessiner le dragon mort avant la mamie
        //(pour qu'elle apparraisse par dessus lui)
        if(dragonLife <= 0) {
            killBoss();
        }

        //dessiner la mamie
        drawSprite(mami);
        drawSprite(mami.stick);

        //dessiner les chats
        spawnCat();
        updateCats();

        //le dragon n'est affiché que si sa vie est sup à 0.
        //dessiner le dragon après tous les autres sprites pour
        //qu'ils soit au dessus d'eux tout le temps
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
