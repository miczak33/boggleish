# Boggleish
A simplified boggle-like game

## Requirements to Run

* Docker

OR

* Ruby
* Rails
* Npm

##How to Run (local)
Check this repo out and navigate to its root.

1) Go to the api folder and install gems/rake db

  ```
	cd api && bundle install && rake db:migrate
  ```
	
2) Start the rails server, should start on port 3000

  ```
	rails s
  ```

3) Open a new terminal, then go to the ui folder and npm install.

  ```
	cd ui & npm install
  ```

4) Now start the react app

  ```
	npm run start
  ```

##How to Run (Docker)
Check this repo out and navigate to its root.

1) Open a terminal session and build the docker images:

  ```
	docker-compose build
  ```

2) Now create the apps from the images

  ```
	docker-compose up
  ```

3) Go to http://localhost:8080
	

