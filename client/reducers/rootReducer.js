import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import posts from './posts';
import postForm from './postForm';

import categories from './categories';
import settings from './settings';
import profiles from './profiles';
import auth from './auth';

const rootReducer = combineReducers({
    form: formReducer,    
    posts: posts,
    postForm: postForm,    
    categories: categories,
    settings: settings,
    profiles: profiles,
    auth: auth
});

export default rootReducer;
