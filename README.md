This is a basic MQ example, incorporating Docker and IronWorker as a message queue schedule example on the Iron.io platform.

Before you begin

Before starting, you will need to setup a couple of things. You only need to do this once.

Get your app keys through Twitter
Install Iron’s CLI tool
Setup your Iron.io credentials
Clone the repo or create your own files with the same structure.

git clone https://github.com/jacotri77/iron_worker_node_twitter_bot

Install Docker
Install node. For this bot I used ```node 8.3 ```. You can check if it is installed with either of these commands:
node -v or
node --version
If it is not installed run the following command to install it locally:

brew install node

This will also install npm which will enable you to add yarn, which I prefer for installing dependendcies as it is deterministic so this project isn't broken a year from now :).

npm install -g yarn
Make sure you have the following dependencies installed:

"dependencies": {
    "iron_mq": "^0.9.2",
    "iron_worker": "^0.1.6",
  }
These can be installed using the following:

yarn add iron_mq iron_worker twit
Make sure you have your Iron.io credentials either referenced in your project or in a separate iron.json file (best practice). You can set your credentials up and download the Iron CLI here:

This github assumes you have some familiarity with Docker and have a Docker Hub account. If not, plese create one here:

https://hub.docker.com/

You will need to create a Docker repository here:

https://cloud.docker.com/

***Note: you can also create a repo through the terminal***

docker create [OPTIONS] IMAGE [COMMAND] [ARG...]



*** Don't forget to setup your Iron.io credentials!! ***

Let's get the code uploaded and running in IronWorker!

1. Package your Worker

Let’s package it up inside a Docker image and upload it to a Docker Registry. Copy the Dockerfile from appropriate directory (depending on used programming language) of this repository and modify the ENTRYPOINT (in this case we are using bot.js) line to run your script. Build your docker image:

docker build -t USERNAME/IMAGENAME:TAG . 
Replace USERNAME/IMAGENAME with your own Docker info or you can also build off of the lightwieght images iron has for each language (iron/node, iron/go, etc.). Those can be accessed here

You should see the following output(with a few semantic differences based on your naming scheme and image size) in your terminal

Sending build context to Docker daemon  9.867MB 
Step 1/4 : FROM iron/node
 ---> 9ca501065d18
Step 2/4 : WORKDIR /app
 ---> Using cache
 ---> ad54579d14b1
Step 3/4 : ADD . /app
 ---> 23ca3c7f7d4e
Removing intermediate container 88bd966abbb8
Step 4/4 : ENTRYPOINT node bot.js
 ---> Running in cfce360ecfdd
 ---> de954b4b140b
`Removing intermediate container cfce360ecfdd
Successfully built de954b4b140b
Successfully tagged USERNAME/IMAGENAME:TAG
2. Push it to Docker Hub

Push it to Docker Hub:

docker push USERNAME/IMAGENAME:TAG

The push refers to a repository [docker.io/USERNAME/IMAGENAME]
a13329eaedc1: Layer already exists
2f159679b3bf: Layer already exists
0c9a3c45e098: Layer already exists
d578f3150db2: Layer already exists
d532ebb4a10d: Layer already exists
5b5d58ee6404: Layer already exists
0.0.3: digest: sha256:df41d5c718823eea7e06c2a49c676e5c6ef01cfadcc9e3f6cb2f17bf1

3. Register your image with Iron

Ok, we’re ready to run this on Iron now, but first we have to let Iron know about the image you just pushed to Docker Hub.

iron register USERNAME/IMAGENAME:TAG

Configuring client
        Project 'Iron Test' with id='59b8769be92bfa000c182d8d'
----->  Registering worker 'USERNAME/IMAGENAME'
        Registered code package with id='59baf777a74b24000a7240fa'
        Check https://hud-e.iron.io/worker/projects/59b8769be92bfa000c182d8d/code/59baf77a74b24000a7240fa for more info
4. Upload the worker code package to IronWorker

This uplaods the code package you are going to use in your worker to IronWorker.

iron worker upload -name nodemq USERNAME/IMAGENAME:TAG

        Project 'Iron Test' with id='59b8769be92bfa000c182d8d'
----->  Uploading worker 'nodemq'
        Uploaded code package with id='59bafb21c5abcd000bafcd21'
        Check https://hud-e.iron.io/worker/projects/59b8769be92bfa000c182d8d/code/59bafb21c5abcd000bafcd21 for more info
5. Queue / Schedule jobs for your image

Now you can start queuing jobs or schedule recurring jobs for your image.

iron worker queue nodemq for an instant queue
You can schedule your task iron worker queue bot --start-at "12:30" --run-times 5 --run-every 70

        Project 'Iron Test' with id='59b8769be92bfa000c182d8d'
----->  Uploading worker 'nodemq'
        Uploaded code package with id='59bafb21c5abcd000bafcd21'
        Check
        https://hud-e.iron.io/worker/projects/59b8769be92bfa000c182d8d/code/59bafb21c5abcd000bafcd21 for more info
6. Check on your running or finished tasks

Look at HUD to view your scheduled tasks, running or completed tasks, check logs, etc.
