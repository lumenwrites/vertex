import Feed from 'feed';

import Post from '../models/post';

import settings from '../../config/settings';

let feed = new Feed({
    title: settings.metaTitle,
    description: settings.metaDescription,
    id: settings.domain,
    link: settings.domain+"/feed/posts.atom",
    image: settings.metaSocialImage,
    // updated: new Date(2013, 06, 14), // optional, default = today 
    
    author: {
	name: settings.metaAuthor,
	email: settings.metaEmail,
	link: settings.userurl
    }
})

export function getFeed(req, res) {
    var filter = {}
    if (req.query.tag) {
	var tag = req.query.tag;
	console.log("Posts filtered by tag: " + tag);
	filter = {tags:{$all:tag}};
    }
    filter.published = true;
    Post.find(filter).sort('-dateAdded').exec((err, posts) => {
	if (err) {
	    res.status(500).send(err);
	}

	posts.forEach(post => {
	    var link = settings.domain + "/post/" + post.slug;
	    feed.addItem({
		title: post.body,
		id: link,
		link: link,
		description: post.body,
		author: [{
		    name: settings.metaAuthor,
		    email: settings.metaEmail,
		    link: settings.userurl		    
		}],
		date: post.dateAdded,
		//image: post.image
	    })
	})
	res.type("application/xml");
	res.send(feed.atom1());
    });
}
