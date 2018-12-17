'use strict';
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

// //frapper avec la canne:
// let stickAngle = mami.stick.rotation * Math.PI / 180;
// let YplusVal = 0;
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
       dashCtx.fillStyle = "#000"; dashCtx.fillRect(0,0,dashboard.width,dashboard.height);
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

   //afficher le message "rejouer: entree" une fois le jeu fini
   function showReplayMsg() {
       if (gameisover || gameiswon) {
           dashCtx.fillStyle = "#ff0";
           dashCtx.fillText("[[Rejouer : *ENTREE*]]", 20, 410 );
       }
   }
