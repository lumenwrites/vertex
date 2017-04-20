import Post from '../models/post';
import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';

/* Get all posts */
export function getPosts(req, res) {
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
	res.json(posts.slice(0,12));
    });
}

/* Get a single post */
export function getPost(req, res) {
    Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
	if (err) {
	    res.status(500).send(err);
	}
	res.json({ post });
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
	res.json(post);
    });
}

/* Delete a post  */
export function deletePost(req, res) {
    Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
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
