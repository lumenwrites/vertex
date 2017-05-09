This is a simple blog built with Node/React/Redux. It is Dockerized, has server-side rendering and auth. It will also be federated with [ActivityPub](https://www.w3.org/TR/activitypub/)(still work in progress).

It can be useful as an example of integrating these technologies, as a starter project, or as a beautiful and simple blogging tool =)

![](https://raw.githubusercontent.com/raymestalez/vertex/master/assets/digitalmind-screenshot1.png)
![](https://raw.githubusercontent.com/raymestalez/vertex/master/assets/digitalmind-screenshot2.png)
![](https://raw.githubusercontent.com/raymestalez/vertex/master/assets/digitalmind-screenshot3.png)

I have tried to extensively comment the code, so you could easily understand what's going on, and apply it to your own projects.

This is my first project built with all this tech, so if you have suggestions on how to improve it - I'd really appreciate them. I will keep gradually improving this blog and adding more features. Feel free to  contribute to this project, report bugs, or fork it and use it for your purposes. I hope you will find it useful!

You can always contact me at raymestalez@gmail.com, and you can check out the other stuff I'm working on [over here](http://rayalez.com).



## Installation

Installing and running this blog is very simple. Clone this repo, and then simply run:

	docker-compose up
	(use -d flag to run it in the background)

After that, the blog will be running on the localhost:3000. Isn't Docker amazing? =)

You will also need to create a user for yourself:

	docker-compose run --rm web node ./server/admin.js createsuperuser youremail@gmail.com yourpassword


Now you can go to `localhost:3000/login`, login and begin blogging!

To deploy it online, go to Digital Ocean, create a Docker droplet, point your domain to it, and repeat the same commands.

For security, you will need to enter a unique secret key into `config/config.js`.

You can modify the file `config/settings.js` to enter the information about your site - title, description, about page, etc.

To serve the blog on the port 80, I recommend setting up nginx to proxy all the requests to port 3000. You can see an example of nginx config [here](https://github.com/raymestalez/vertex/blob/master/config/vertex_nginx.conf). This config is setup to serve the blog over https, so you will also need to follow [this simple tutorial](http://digitalmind.io/post/setting-up-ssl-aa14b) to configure SSL for your domain.


## Backup

The database data is configured as a volume, so you can see it in the folder `/data/db/`.

You can also run these commands to export things from db:

	docker exec -i -t vertex_db_1  /bin/bash
	mongoexport --db vertex --collection posts --out /data/db/posts_backup.json --host=127.0.0.1:27017

That will generate the file `data/db/posts_backup.json` containing all of your posts.

## Modifying posts

To modify posts or edit db, you can sh into the db container:

	docker exec -i -t vertex_db_1  /bin/bash

then open mongo shell:

	mongo

switch to our db:

	use vertex

And execute [mongo shell](https://docs.mongodb.com/manual/tutorial/update-documents/) commands. For example this one will find a post by slug and modify it:

	db.posts.updateOne(
		{slug:"old-ugly-slug-sadfopij"},
		{ $set: { "slug": "new-handsome-sexy-slug"},
	)


# Todo

# Basic features
- [X] Basic Node/React blog. Auth, Create/Update/Delete posts, About page. Pagination.
- [X] Email/RSS subscriptions.
- [X] Filter by tags. Main categories dropdown in the header.
- [X] Configure about page, meta info, etc. with settings.js
- [X] Drafts.
- [X] Dockerize.
- [X] Server-side rendering.

# Upcoming features

## Small
- [X] Awesome Nginx settings. Compression, caching, etc.
- [X] Conveniently modify slugs
- [X] readmore... for longer posts
- [X] Google Analytics config
- [X] author username and url
- [X] Post title should be a link.(firstline)
- [X] If post has an image, use it as social media image.
- [ ] Proper nice 404 pages, error messages, etc.
- [ ] Save email subscribers source(?source=hackernews).
- [ ] Remove unused dependencies.

## Bugs
- [X] Sets the new posts to draft for some reason sometimes?
- [X] combined all the tags into one after editing. But not always?
- [X] Tags should be stripped of spaces.
- [X] Tab title should not be markdown.
- [X] Remove link from About page.
- [ ] Used to get errors on submitting posts sometimes. Can't replicate?

## Clean up
- [X] Pass all the speed tests.  
  https://developers.google.com/speed/pagespeed/insights/  
  https://tools.pingdom.com/  
  https://gtmetrix.com/  
- [X] Pass all mobile tests  
  https://search.google.com/search-console/mobile-friendly
- [X] Pass all SEO tests  
  https://seositecheckup.com
- [X] Test social media cards.
  https://cards-dev.twitter.com/validator
  https://developers.facebook.com/tools/debug/
- Write tests


# Decentralization

## MVP
- [X] ActivityPub prototype.  
      Person, inbox, outbox.  
      Save followers, notify them of new posts.
- [ ] Clean AP utility functions.  
      Like lookup info about person, send a message, generate activity, all that.  
- [ ] ActivityPub [checklist](https://github.com/tootsuite/mastodon/issues/1557), and [test](https://activitypub.rocks/test/) that it works. 
- [ ] Federate with Mastodon.  
      People can find me by my url, follow me, see my posts in their home feed.

## Future
Basic:
- [ ] Receive likes and reposts info.
- [ ] Receive comments. ++ threaded

Advanced:
- [ ] Home feed. I can subscribe to other blogs and see them in my home feed.  
      ++ Rankable by likes.
- [ ] Follow me by clicking a button on my site(“Remote follow”).
- [ ] Favorite, reblog, my posts by using buttons on my site.
- [ ] Comment on my site, federated(?). I can reply to comments.
- [ ] Many users may have a common publicInbox(hub). You post to it once, and it notifies all the users that follow it.
	  

Small/Maybe:
- [ ] Client endpoints. Use AP format for client-server.
- [ ] README link to demo-video as an image.


# Future/Maybe
- Proper form validation.
- Auto Saving.
- Code syntax highlighting? IPython? MathJax?  
- Create page that allows you to just send emails to subscribers?  
  Or just automatically notify them of new posts. SendGrid settings in config.js
- Themes
- Add nested comments?
- Image upload.  
  Upload image, automatically insert markdown link, periodically remove unused images.
- Custom easily editable style for themes.
- Export/Import data.
- Dropbox sync/backup?
