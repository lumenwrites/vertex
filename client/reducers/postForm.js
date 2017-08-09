import { FETCH_POSTS, FETCH_POST } from '../actions/index';

/* List of all posts and an active post  */
const INITIAL_STATE = {
    body: "",
    tags: "",
    published: false,
};

export default function(state=INITIAL_STATE, action) {
    switch(action.type) {
	case 'UPDATE_POST_BODY':
	    /* console.log("Editing form " + JSON.stringify(state));*/
	    var body = action.payload;
	    return {...state, body: body };
	case 'UPDATE_POST_TAGS':
	    /* console.log("Editing form " + JSON.stringify(state));*/
	    var tags = action.payload;
	    return {...state, tags: tags };		
	case 'CREATE_POST':
	    var post = action.payload;
	    var cleanForm = INITIAL_STATE;
	    /* If the created post is published by default,
	       then I've submitted it from timeline, so I want to reset the form to
	       published by default. */
	    cleanForm.published = post.published;
	    return INITIAL_STATE;
	case 'SET_PUBLISHED':
	    /* console.log("Editing form " + JSON.stringify(state));*/
	    return {...state, published: action.payload };		
	case 'FETCH_POST':
	    /* console.log("Fetched post " + action.payload.body);*/
	    return action.payload;
	default:
	    return state;
    }
}
