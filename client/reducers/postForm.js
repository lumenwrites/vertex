import { FETCH_POSTS, FETCH_POST } from '../actions/index';

/* List of all posts and an active post  */
const INITIAL_STATE = {
    body: "",
    published: true,
    tags: "",
    category: ""
};

export default function(state=INITIAL_STATE, action) {
    switch(action.type) {
	case 'UPDATE_POST_BODY':
	    console.log("Editing form " + JSON.stringify(state));
	    var body = action.payload;
	    return {...state, body: body };
	case 'UPDATE_POST_TAGS':
	    /* console.log("Editing form " + JSON.stringify(state));*/
	    var tags = action.payload;
	    return {...state, tags: tags };		
	case 'CREATE_POST':
	    return INITIAL_STATE;
	default:
	    return state;
    }
}
