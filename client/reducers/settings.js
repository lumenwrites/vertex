

export default function(state=[], action) {
    switch(action.type) {
	case 'FETCH_SETTINGS':
	    /* Action returns a list of posts */
	    /* And this adds them to the state */
	    /* (creating a new state object out of old state and fetchet settings) */
	    /* console.log("Settings added to state: " + JSON.stringify(action.payload));*/
	    return action.payload;
	default:
	    return state;
    }
}
