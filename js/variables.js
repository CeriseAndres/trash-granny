'use strict';
//placement des canvas dans le DOM par leur parent :
const canvasParent = document.getElementById('canvasParent');
const dashboardParent = document.getElementById('dashboard');
const dashboard = document.createElement('canvas');
dashboardParent.appendChild(dashboard);
dashboard.width = 300;
dashboard.height = 600;
const dashCtx = dashboard.getContext('2d');
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
const mamiFaceImg = new Image();

let stickImage;//canne de mami
let isShooting = false;//vrai si un coup de canne est donné.
let stickPosX;
let stickPosY;
let stickOffsetX;
let stickOffsetY;
let coef; //1 ou -1 selon rotation canne a droite ou a gauche
let stickAngle;
let YplusVal;

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
const pauseScreen = document.getElementById("pauseScreen");

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
const introSnd = document.createElement("audio");
introSnd.src = 'sons/intro.mp3';
introSnd.loop = false;
introSnd.preload = "auto";
const gameSong = document.createElement("audio");
gameSong.src = "sons/gameSong.mp3";
gameSong.loop = true;
gameSong.preload = "auto";
gameSong.volume = 0.8;
const bossSong = document.createElement("audio");
bossSong.src = "sons/bossSong.mp3";
bossSong.loop = true;
bossSong.preload = "auto";
const gameoverSong = document.createElement("audio");
gameoverSong.src = "sons/gameover.mp3";
gameoverSong.loop = false;
gameoverSong.preload = "auto";
const youwinSong = document.createElement("audio");
youwinSong.src = 'sons/youwin.mp3';
youwinSong.loop = false;
youwinSong.preload = "auto";

const songSpawnCat = document.createElement("audio");
songSpawnCat.src ='sons/chat/Miaulement.mp3';
songSpawnCat.loop = false;
songSpawnCat.preload = "auto";
songSpawnCat.volume = 0.6;
const songFightCat = document.createElement("audio");
songFightCat.src ='sons/chat/attack_cat.mp3';
songFightCat.loop = false;
songFightCat.preload = "auto";
const hittedCatSnd = document.createElement('audio');
hittedCatSnd.src = "sons/chat/hitted_cat.mp3";
hittedCatSnd.loop = false;
hittedCatSnd.preload = "auto";

const stickshotSnd = document.createElement("audio");
stickshotSnd.src = 'sons/coups/stickshot.mp3'; //coup de canne
stickshotSnd.loop = false;
stickshotSnd.preload = "auto";

const missShotSnd = document.createElement("audio");
missShotSnd.src = 'sons/coups/missShot.mp3'; //coup de canne dans le vent
missShotSnd.loop = false;
missShotSnd.volume = 0.3;
missShotSnd.preload = "auto";

const mamiCroc = document.createElement("audio");
mamiCroc.src = 'sons/mamie/croque.mp3';
mamiCroc.loop = false;
mamiCroc.preload = "auto";

const mamiPain = document.createElement("audio");
mamiPain.src = "sons/mamie/mamiPain.mp3";
mamiPain.loop = false;
mamiPain.preload = "auto";

const dragonSpawnSnd = document.createElement("audio");
dragonSpawnSnd.src = "sons/dragonSpawn.mp3";
dragonSpawnSnd.loop = false;
dragonSpawnSnd.preload = "auto";

const dragonDeadSnd = document.createElement("audio");
dragonDeadSnd.src = "sons/dragonDead.mp3";
dragonDeadSnd.loop = false;
dragonDeadSnd.preload = "auto";

const dragonPainSnd = document.createElement("audio");
dragonPainSnd.src = "sons/dragonPain.mp3";
dragonPainSnd.loop = false;
dragonPainSnd.preload = "auto";

//variables en lien avec l'intro
let introPlaying = true;
const canvasIntro = document.createElement('canvas');
const introParent = document.getElementById('introParent');
introParent.appendChild(canvasIntro);
canvasIntro.width = 1200;
canvasIntro.height = 800;
const introCtx = canvasIntro.getContext('2d');
const introImg = new Image();
introImg.src = 'img/introframe1.png';
const introImg2 = new Image();
introImg2.src = 'img/introframe2.png';
const introImg3 = new Image();
introImg3.src = 'img/introframe3.png';


const startButton = document.getElementById('startButton');
const startScreen = document.getElementById('startScreen');
