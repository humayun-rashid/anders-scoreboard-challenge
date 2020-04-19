# anders-scoreboard-challenge
## Table of content
* Project Description
* How to run
* List of Endpoints

## Project description
The API has been developed using nodejs, express and mongoDB. Mongo Server is running from Mongo Atlas, so no need to run it seprately to local machine.

### What has been done?
 * Backend has been developed with nodejs, express and mongoDB, Joi (input validation)
 * Code is pushed to github and exported to gitlab to create CI/CD pipeline
 * A pipeline has been created in gitlab (.gitlab-ci.yml) that has now only 1 stage. It does two things -
    - Create a docker image raahat/scoreboard:latest
    - Pushed it to docker registry 

* The image can be pull and run in local machine using docker.
* All the endpoints are listed in test.rest file, that can be also used to test the endpoints with visual studio code and rest extensions. A description of the endpoints is also given below. 

## How to run
First, clone the repository.

``` 
cd $home
git clone https://github.com/humayun-rashid/anders-scoreboard-challenge.git
cd anders-scoreboard-challenge
```

Now it can be run using:
* Node.js and NPM
* Docker Build (Requires Docker)
* Docker Image (Requires Docker)

### Node.js and NPM
It should work for linux and Mac. 
#### Install brew
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
brew -v
```
#### Install nodejs and npm
```
brew install node
node -v
npm -v
```
Go to directory, run -
```
npm install
```
Now, run the application using -
```
node server.js
````

### Using Docker 
Download and install docker desktop from here (Windows and mac supported).
```
https://www.docker.com/products/docker-desktop
```
You can build the image and run or you can directly run the image from docker registry.
Directly, run the image from docker registry:
```
docker run -it --rm --name scoreboard -p 8080:8080 raahat/scoreboard:latest
```
Upon successful execution, there should be following output:
```
Server is running in 8080
MongoDB is connected
```
If you want to build and run , then go to directory and run -
```
docker build -t scoreboard:latest .
docker run -it --rm --name scoreboard -p 8080:8080 scoreboard:latest
```

## List of Endpoint 

POST Request
Input validation module @hapi/joi has been used to validate data. The json object requires two elements "name" and "score". "name" needs to be string and "score" needs to be number and integer.

"/" > Create new player with score. If player name already exists, it updates the score only.
POST request should be Json and similar like this: 
```
POST http://localhost:8080
Content-Type: application/json
{
  "name":"player 3",
  "score": 105
}
```
If no player with name "player 3" exists, it will create a new player with score and give output like this -
```
{
  "_id": "5e9c5ebf593edf194d0ccb95",
  "name": "Player 3",
  "score": 105,
  "date": "2020-04-19T14:22:55.200Z",
  "__v": 0
}
```
If player with same name exists, it will give following output -
```
{
  "message": "Players exists and score has been updated"
}
```
GET Requests
"/" > Get all players name from MongoDB and sort them from high to low
"/des" > Get all players name from MongoDB and sort them from low to high
"/date" > Get all players name from MongoDB and sort them by date
"/name" > Get player name by name
"/:id" > Get player name by id

DELETE Requests
"/" > Delete player by name . 
Content should be json with "name" elements.
DELETE http://localhost:8080
Content-Type: application/json

{
    "name": "Player 3"
}
```
Output will be -
```
{
  "message": "Player with Name is deleted"
}
```
If the name doest exists, then the output will be -
```
{
  "message": "Name is not found"
}
```

"/:id" > Delete player request by ID
