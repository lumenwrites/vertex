import Post from '../models/post';
import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';


var LUMEN = {
    "@context": "https://www.w3.org/ns/activitystreams",
    "type": "Person",
    "id": "https://lumenwrites.com/lumen/",
    "name": "Lumen",
    "preferredUsername": "lumen",
    "summary": "I make dumb jokes",
    "inbox": "https://lumenwrites.com/lumen/inbox/",
    "outbox": "https://lumenwrites.com/lumen/outbox/",
    "followers": "https://lumenwrites.com/lumen/followers/",
    "following": "https://lumenwrites.com/lumen/following/",
    "likes": "https://lumenwrites.com/lumen/likes/"
}

export function person(req, res) {
    res.json(LUMEN);    
}



/* Post stream example */
var POST_STREAM = [
    {
	"@context": "https://www.w3.org/ns/activitystreams",
	"type": "Post",
	"attributedTo": "https://lumenwrites.com/lumen/",
	"content": "Hello world!"
    }    
]

/* Outbox of my activities */
export function outbox(req, res) {
    Post.find().sort('-dateAdded').exec((err, posts) => {
	if (err) {
	    res.status(500).send(err);
	}
	var activitystream = posts.map((post)=>{
	    var activity = {
		"@context": "https://www.w3.org/ns/activitystreams",
		"type": "Post",
		"attributedTo": "https://lumenwrites.com/lumen/",
		"content": post.body
	    }
	    return activity;
	});
	res.json(activitystream);
    });
}


/* Inbox */
/* Receive objects like this:
{
   "@context": "https://www.w3.org/ns/activitystreams",
   "type": "Create",
   "id": "https://social.example/alyssa/posts/a29a6843-9feb-4c74-a7f7-081b9c9201d3",
   "to": ["https://chatty.example/ben/"],
   "author": "https://social.example/alyssa/",
   "object": {
     "type": "Note",
     "id": "https://social.example/alyssa/posts/49e2d03d-b53a-4c4c-a95c-94a6abf45a19",
     "attributedTo": "https://social.example/alyssa/",
     "to": ["https://chatty.example/ben/"],
     "content": "Say, did you finish reading that book I lent you?"
   }
}
*/
/* Grab posts out of them and create them. */
export function inbox(req, res) {
    console.log("Receiving post " + JSON.stringify(req.body));
    var activity = req.body;
    if (activity.type == "Create") {
	var post = activity.object;
	// Sanitize inputs
	post.body = sanitizeHtml(post.content);
	
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
}

