import { FETCH_POSTS, FETCH_POST } from '../actions/index';


const INITIAL_STATE = []
export default function(state=INITIAL_STATE, action) {
    switch(action.type) {
	case 'CREATE_POST':
	    var posts = state;
	    var post = action.payload;
	    /* console.log("Created post " +  JSON.stringify(post));*/
	    var tags = post.tags.split(',');
	    post.tags = tags.map((t)=>{
		return {
		    title: t,
		    slug: t
		};
	    })
	    console.log("Add created post to the stream " + JSON.stringify(post));
	    posts.unshift(post);
	    /* console.log("Updated posts " + JSON.stringify(posts));*/
	    return [...posts];
	case 'FETCH_POSTS':
	    var posts = action.payload
	    posts.map((post)=>{
		var tags = post.tags.split(',');
		post.tags = tags.map((t)=>{
		    return {
			title: t,
			slug: t
		    };
		})
	    });
	    return posts;
	default:
	    return state;
    }
}
