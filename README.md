DomoPiJS
========

Projet de domotique de maison basé sur le RaspBerryPi, Arduino, NodeJS et Javascript 

Copyright at CPNV - www.cpnv.ch

Projet basé sur le [Framework Johnny-five](https://github.com/rwaldron/johnny-five)

Version 0.4.0

## Installation sur le Rasperry Pi

- [Télécharger Raspbian](http://www.raspberrypi.org/downloads)
- Installer l'OS sur une carte SD. ([Cliquer ici pour plus d'info](http://elinux.org/RPi_Easy_SD_Card_Setup))
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

Une fois l'upload de la librairie réussi, l'Arduino peut être débranché de l'ordinateur et être branché au Raspberry Pi


## Installer le Projet DomoPiJS (sous linux):

# Base de donnée

Partie 1: Installation & Configuration


- Commencer par télécharger et installer l'ensemble du projet en utilisant les commandes suivantes

``` bash
git clone git://github.com/raballito/DomoPiJS.git && cd DomoPiJS

npm install


```
- Installer la base de donnée MongoDB dans le système (Version x86/x64)
``` bash
sudo apt-get install mongod-org


```
- Installer la base de donnée MongoDB dans le système (Version Raspberry Pi) (tiré de http://www.widriksson.com/install-mongodb-raspberrypi/)
``` bash
wget http://www.widriksson.com/wp-content/uploads/2014/02/mongodb-rpi_20140207.zip

adduser --firstuid 100 --ingroup nogroup --shell /etc/false --disabled-password --gecos "" --no-create-home mongodb

cp -R mongodb-rpi/mongo /opt
chmod +x /opt/mongo/bin/*

mkdir /var/log/mongodb 
chown mongodb:nogroup /var/log/mongodb
mkdir /var/lib/mongodb
chown mongodb:nogroup /var/lib/mongodb

cp mongodb-rpi/debian/init.d /etc/init.d/mongod
cp mongodb-rpi/debian/mongodb.conf /etc/

ln -s /opt/mongo/bin/mongod /usr/bin/mongod
chmod u+x /etc/init.d/mongod

update-rc.d mongod defaults
/etc/init.d/mongod start

```

- Installer la base de donnée MongoDB dans NodeJS

``` bash
npm install -g mongodb


```

- Initialiser la base de donnée MongoDB dans le répertoire par défaut

``` bash
mkdir -p /data/db


```


Partie 2: Ajouter un administrateur

- Dans un nouveau terminal (ex: CTRL + ALT + F2), lancer la base de donnée afin de pouvoir interagir avec elle

``` bash
mongod

```

- Lancer l'utilitaire de configuration avec la commande "mongo", puis lancer les commandes suivantes

``` bash


use admin
db.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [ { role: "userAdminAnyDatabase", db: "local" } ]
  }
)

```

- Retourner dans le deuxième terminal, quitter mongoDB avec CTRL + C, et le relancer avec les authorisations

``` bash
mongod --auth --config /etc/mongodb/mongodb.conf


```

Partie 2 bis: Ajouter un administrateur/utilisateur en cas d'échec de la précédente solution

Ouvrir le fichier /DomoPiJS/public/views/newIndex.jade et décommenter les lignes 267-268.  
Elles contiennent un bouton d'enregistrement, très semblable au bouton de connexion, situé peu après.

Partie 3: Ajouter un utilisateur standard 

Passer par l'interface après s'être connecté pour enregistrer un nouvel utilisateur.
Pour cela, ouvrir le menu d'aide, et cliquer sur "Ajouter un utilisateur"


Partie 4: Authorisation des utilisateurs ----- A VENIR -----

Afin de limiter les utilisateurs au contrôle de certaine pièces

``` bash
------------ A VENIR -------------

```


## Lancer le programme DomoPiJS

- Pour lancer le programme, aller dans le répertoire "DomoPiJS" et lancer l'une des deux commandes suivantes

``` bash
npm start
node app.js

```

## Se connecter à l'interface

- Depuis un navigateur récent (Chrome de préférence), taper dans la barre d'adresse, l'IP du Raspberry Pi.
Elle commence généralement par : 192.168.X.XXX  
Elle devrait aussi apparaître au démarrage du Raspberry Pi, quelques lignes au dessus de celle permettant de se logger.  
Elle est aussi disponible au travers de la commande:   
``` bash
ifconfig

```

## Automatiser le lancement de l'application à chaques démmarages de la machine

Bien que dans le cadre de la domotique, le système ne soit jamais arrêté, on ne peut exclure la présence de bug pouvant mener à un plantage général du système.
Dans ce cas, l'accès au serveur peut être compliqué surtout s'il est présent dans les combles d'une maison.

Comme dans notre cas, nous avons prévu ceci comme Preuve de Concept dans le cadre de nos études, et que nous disposons d'une maquette débranchable, il était judicieux d'automatiser le lancement dans l'ordre des différents logiciels.

Voila la procédure (utilisable aussi pour lancer d'autres programmes à l'allumage)

``` bash
------------- A VENIR ------------------

```
