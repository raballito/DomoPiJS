DomoPiJS
========

Projet de domotique de maison basé sur le RaspBerryPi, Arduino, NodeJS et Javascript 

Copyright at CPNV - www.cpnv.ch

Projet basé sur le [Framework Johnny-five](https://github.com/rwaldron/johnny-five)

## Installation sur le Rasperry Pi

- [Télécharger Raspbian](http://www.raspberrypi.org/downloads)
- Installer la distribution sur une carte SD. ([Cliquer ici pour plus d'info](http://elinux.org/RPi_Easy_SD_Card_Setup))
- Une fois la distribution installée et configurée (raspi-config, server ssh, etc... je ne m'arrête pas la-dessus),  installer nodejs et GIT:

``` bash
sudo apt-get update
sudo apt-get upgrade
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
sudo dpkg -i node_latest_armhf.deb
node -v
sudo apt-get install git

```
- Une fois NodeJS installé, il faut encore installer Chromium si le système possède un écran branché sur le Raspberry Pi

``` bash
sudo apt-get update
sudo apt-get install chromium-browser

```

- Teste le navigateur en mode kiosk avec la commande suivante

``` bash
chromium --kiosk http://www.google.com

```

- (Work In Progress - WIP) Afin de pouvoir lire des vidéos sur Youtube sur l'écran de contrôle, installer encore youtube-dl

``` bash
sudo apt-get install youtube-dl
sudo youtube-dl -U

```


- Si le protocole SSH est utilisé pour contrôler le Raspberry Pi, il tentera d'envoyer les images et vidéos sur celui-ci au lieu d'envoyer le tout sur l'écran branché au port HDMI. Pour exporter l'image sur l'écran, executer la commande suivante et verifier les variables d'environements avec la deuxième

``` bash
export DISPLAY=:0.0
env

```




## Préparation de l'Arduino

- Commencer par télécharger [Arduino IDE](http://arduino.cc/en/main/software) sur un ordinateur différents
- Brancher l'Arduino à l'ordinateur au moyen d'un cable USB
- Ouvrir le programme Arduino IDE, choisir: File > Examples > Firmata > StandardFirmata
- Cliquer sur le boutton "Upload" ou "Téléverser" en français dans le texte (... que ce terme est horrible)

Une fois l'upload réussi, l'Arduino peut être débranché de l'ordinateur et être branché au Raspberry Pi


## Installer le Projet DomoPiJS:

- Commencer par télécharger et installer l'ensemble du projet en utilisant les commandes suivantes

``` bash
git clone git://github.com/raballito/DomoPiJS.git && cd DomoPiJS

npm install


```

- Installer la base de donnée MongoDB

``` bash
npm install -g mongodb


```

- Initialiser la base de donnée MongoDB

``` bash
------------- A VENIR ------------------


```

- Dans un nouveau terminal, lancer la base de donnée avant chaques lancements de l'application DomoPiJS

``` bash
sudo mongod


```

## Lancer le programme DomoPiJS

- Pour lancer le programme, aller dans le répertoire "DomoPiJS" et lancer l'une des deux commandes suivantes

``` bash
npm start
node app.js

```

## Automatiser le lancement de l'application à chaques démmarages de la machine

Bien que dans le cadre de la domotique, le système ne soit jamais arrêté, on ne peut exclure la présence de bug pouvant mener à un plantage général du système.
Dans ce cas, l'accès au serveur peut être compliqué surtout s'il est présent dans les combles d'une maison.

Comme dans notre cas, nous avons prévu ceci comme Preuve de Concept dans le cadre de nos études, et que nous disposons d'une maquette débranchable, il était judicieux d'automatiser le lancement dans l'ordre des différents logiciels.

Voila la procédure (utilisable aussi pour lancer d'autres programmes à l'allumage)

``` bash
------------- A VENIR ------------------

```
