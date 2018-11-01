# MOEI Console

## Prereqs
- have docker installed

## Setup
```
$ git clone https://github.com/schmidtp0740/MOEI_Console
$ cd ./MOEI_Console
$ docker build -t react .
$ docker run -d -p 3000:3000 --name react --restart always react
```
- wait until you see a message saying that the message is service at localhost:8082
- go to localhost:8082 if you deployed locally
- if you deployed in cloud vm go to <public ip address>:8082 in your favorite browser


### Setting up Spoofed IOT device


#### Setup
```
$ git clone https://github.com/schmidtp0740/MOEI_Generator
$ cd MOEI_Generator
$ docker build -t goiotapp .
$ docker run -it --name goiotapp goiotapp
```