This is a simple blog built with Node/React. Work in progress. Will be decentralized with ActivityPub.

![](https://raw.githubusercontent.com/raymestalez/vertex/master/assets/screenshot1.png)

## Installation

Installing and running this blog is very simple. Clone this repo, and then simply run:

	docker-compose up
	(use -d flag to run it in the background)

After that, the blog will be running on the localhost. Isn't Docker amazing? =)

You will also need to create a user for yourself:
	docker-compose run --rm web npm createsuperuser your@email yourpass

Now you can go to localhost/login url, login and begin blogging!

To deploy it online, go to Digital Ocean, create a Docker droplet, point your domain to it, and repeat the same commands. 
