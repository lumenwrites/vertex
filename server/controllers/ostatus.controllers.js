var HOST_META = {
    "links": [
        {
            "rel": "lrdd",
            "type": "application/jrd+json",
            "template": "http://lumenwrites.com/.well-known/webfinger?resource=acct:{uri}"
        },
        {
            "rel": "lrdd",
            "type": "application/json",
            "template": "http://lumenwrites.com/.well-known/webfinger?resource=acct:{uri}"
        },
        {
            "rel": "lrdd",
            "type": "application/xrd+xml",
            "template": "http://lumenwrites.com/.well-known/webfinger?resource=acct:{uri}"
        }
    ]
}

var LUMEN = {
    "subject": "acct:lumen@lumenwrites.com",
    "aliases": [
        "https://lumenwrites.com",
    ],
    "links": [
        {
            "rel": "http://webfinger.net/rel/profile-page",
            "type": "text/html",
            "href": "https://lumenwrites.com"
        },
        {
            "rel": "http://activitystrea.ms/spec/1.0",
            "type": "application/atom+xml",
            "href": "https://lumenwrites.com/@lumen.atom"
        },
        {
            "rel": "http://schemas.google.com/g/2010#updates-from",
            "type": "application/atom+xml",
            "href": "https://lumenwrites.com/@lumen.atom"            
        }
    ]
}

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
    Post.find().sort('-dateAdded').exec((err, posts) => {
	if (err) {
	    res.status(500).send(err);
	}
	res.json(posts);
    });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
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

    post = new Post(post);

    post.save((err, post) => {
	if (err) {
	    res.status(500).send(err);
	}
	res.json(post);
    });
}

export function hostMeta(req, res) {
    res.send(HOST_META);    
}

export function webFingerAccount(req, res) {
    res.send(LUMEN);    
}
