This is a simple blog built with Node/React/Redux. It is Dockerized, has server-side rendering and auth. It will also be federated with [ActivityPub](https://www.w3.org/TR/activitypub/)(still work in progress).

It can be useful as an example of integrating these technologies, as a starter project, or as a beautiful and simple blogging tool =)

![](https://raw.githubusercontent.com/raymestalez/vertex/master/assets/screenshot1.png)

I have tried to extensively comment the code, so you could easily understand what's going on, and apply it to your own projects.

This is my first project built with all this tech, so if you have suggestions on how to improve it - I'd really appreciate them. I will keep gradually improving this blog and adding more features. Feel free to  contribute to this project, report bugs, or fork it and use it for your purposes. I hope you will find it useful!

You can always contact me at **raymestalez@gmail.com**, and you can check out the other stuff I'm working on [over here](http://rayalez.com).



## Installation

Installing and running this blog is very simple. Clone this repo, and then simply run:

	docker-compose up
	(use -d flag to run it in the background)

After that, the blog will be running on the localhost:3000. Isn't Docker amazing? =)

You will also need to create a user for yourself:

	docker exec -i -t vertex_web_1  /bin/bash
	node ./server/admin.js createsuperuser youremail@gmail.com yourpassword


Now you can go to localhost:3000/login url, login and begin blogging!

To deploy it online, go to Digital Ocean, create a Docker droplet, point your domain to it, and repeat the same commands.

For security, it is important to enter a unique secret key into `server/config.js`.




## Backup



To deploy it online, go to Digital Ocean, create a Docker droplet, point your domain to it, and repeat the same commands. 
