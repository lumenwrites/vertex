import { FETCH_POSTS, FETCH_POST } from '../actions/index';


const INITIAL_STATE = []
export default function(state=INITIAL_STATE, action) {
    switch(action.type) {
	case 'FETCH_POST':
	    return action.payload;
	default:
	    return state;
    }
}
