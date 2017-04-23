import Post from '../models/post';
import Follower from '../models/follower';
import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';
import request from 'request';

/* Get all posts */
export function getPosts(req, res) {
    /* Filter by tag */
    var filter = {}
    if (req.query.tag) {
	var tag = req.query.tag;
	console.log("Posts filtered by tag: " + tag);
	filter = {tags:{$all:tag}};
    }

    /* Pagination */
    var perPage = 12;
    var page = 0;
    if (req.query.page) {
	page = req.query.page - 1;
    }
    
    Post.find(filter)
	.limit(perPage)
	.skip(perPage*page)
	.sort('-dateAdded').exec((err, posts) => {
	    if (err) { res.status(500).send(err); }
	    res.json(posts);
	});
}

/* Get a single post */
export function getPost(req, res) {
    console.log("Fetching post by slug " + req.params.slug);
    Post.findOne({ slug: req.params.slug }).exec((err, post) => {
	if (err) {
	    res.status(500).send(err);
	}
	res.json(post);
    });
}

/* Save a post */
export function createPost(req, res) {
    console.log("Receiving post " + JSON.stringify(req.body));
    var post = req.body;
    if (!post.body) {
	res.status(403).end();
    }

    // Sanitize inputs
    post.body = sanitizeHtml(post.body);

    var firstline = post.body.split('\n')[0];
    post.slug = slug(firstline)+"-"+cuid.slug();
    post.tags = post.tags.replace(/\s/g, '').split(",");

    post = new Post(post);

    post.save((err, post) => {
	if (err) {
	    res.status(500).send(err);
	}
	console.log("Post created " + JSON.stringify(post));
	/* Send post to followers */
	Follower.find().exec((err, followers) => {
	    if (err) { res.status(500).send(err); }
	    console.log("Followers " + JSON.stringify(followers));
	    followers.map((follower)=>{
		var postActivity = {
			"@context": "https://www.w3.org/ns/activitystreams",
			"type": "Create",
			"id": "https://lumenwrites.com/post/"+post.slug,
			"to": [follower.id],
			"author": "https://lumenwrites.com/lumen/",
			"object": {
			    "type": "Post",
			    "id": "https://lumenwrites.com/post/"+post.slug,    
			    "attributedTo": "https://lumenwrites.com/lumen/",
			    "to": [follower.id],
			    "content": post.body
			}
		}
		
		var inbox = follower.inbox;
		console.log("Sending post " + JSON.stringify(postActivity) + " to follower " + inbox);
		var options = {
		    uri: inbox,
		    method: 'POST',
		    json: postActivity
		};
		request(options, (err, res, body)=>{
		    if (err) { console.log("Couldn't send post") }
		    console.log("Post successfully sent! " + body);
		});
		
	    });
	});

	res.json(post);

    });
}

/* Update post  */
export function updatePost(req, res) {
    var post = req.body;
    Post.findOneAndUpdate({ slug: req.params.slug }, post, (err, post) => {
	if (err) { return next(err); }
	console.log("Updated post! " + JSON.stringify(post));
	return res.json(post);
    });
}

/* Delete a post  */
export function deletePost(req, res) {
    Post.findOne({ slug: req.params.slug }).exec((err, post) => {
	if (err) {
	    res.status(500).send(err);
	}

	post.remove(() => {
	    res.status(200).end();
	});
    });
}

export function test(req, res) {
    res.json({hi:"hello"});
}
