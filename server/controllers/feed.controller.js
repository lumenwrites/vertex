import Feed from 'feed';

import Post from '../models/post';

let feed = new Feed({
    title: 'Lumen Writes',
    description: 'New posts from Lumen Writes',
    id: 'http://lumenwrites.com/',
    link: 'http://lumenwrites.com/',
    image: 'http://example.com/image.png',
    // updated: new Date(2013, 06, 14), // optional, default = today 
    
    author: {
	name: 'Lumen Writes',
	email: 'lumenwries@gmail.com',
	link: 'http://lumenwrites.com/'
    }
})

export function getFeed(req, res) {
    var filter = {}
    if (req.query.tag) {
	var tag = req.query.tag;
	console.log("Posts filtered by tag: " + tag);
	filter = {tags:{$all:tag}};
    }

    Post.find(filter).sort('-dateAdded').exec((err, posts) => {
	if (err) {
	    res.status(500).send(err);
	}

	posts.forEach(post => {
	    var link = "http://lumenwrites.com/post" + post.slug;
	    feed.addItem({
		title: post.body,
		id: link,
		link: link,
		description: post.body,
		author: [{
		    name: 'Lumen Writes',
		    email: 'lumenwries@gmail.com',
		    link: 'http://lumenwrites.com/'
		}],
		date: post.dateAdded,
		//image: post.image
	    })
	})
	res.type("application/xml");
	res.send(feed.rss2());
    });
}
