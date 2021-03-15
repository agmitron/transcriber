# transcriber

## Requirements
1. Node.js v12 or later. You can download it [here](https://github.com/nodesource/distributions#installation-instructions)
2. Docker to run the MongoDB image (or just MongoDB installed)

## Installation
All the guide had written for Ubuntu Server Linux 

```bash
  # Install Docker
  sudo apt install docker.io

  # Install Node.js
  curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
  sudo apt-get install -y nodejs

  # Clone this repo
  git clone https://github.com/nortimg/transcriber.git
  cd transcriber

  # Install project's dependencies
  npm i

```
  ### Run MongoDB with Docker
  **For the first time:**
  ```
    sudo docker run -p 27017:27017 --name mongodb -d mongo
  ```
  It creates a container and runs it in background.
  **That's you need to do later (to save your data, because it stores in container. Don't create new containers: use the old one).**
  ```
    sudo docker start mongodb
  ```
  
  ### Start app
```
  npm start
```
