DomoPiJS
========

Domotique de maison basé sur le RaspBerryPi, Arduino, NodeJS et Javascript 

Projet basé sur le Framework Johnny-five (https://github.com/rwaldron/johnny-five)

## Installation sur le Rasperry Pi

- [Télécharger Raspbian](http://www.raspberrypi.org/downloads)
- Installer la distribution sur une carte SD. ([Cliquer ici pour plus d'info](http://elinux.org/RPi_Easy_SD_Card_Setup))
- Une fois la distribution installée et configurée,  installer nodejs et GIT:

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

- (WIP) Afin de pouvoir lire des vidéos sur Youtube sur l'écran de contrôle, installer encore youtube-dl

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

- Commencer par télécharger l'ensemble du projet en utilisant la commande suivante

``` bash
git clone git://github.com/raballito/DomoPiJS.git && cd DomoPiJS

npm install


```

## Lancer le programme DomoPiJS

- Pour lancer le programme, aller dans le répertoire "DomoPiJS" et lancer l'une des deux commandes suivantes

``` bash
npm start
node app.js

```
