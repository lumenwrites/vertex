import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from './components/Main';

import PostList from './components/PostList';
import PostNew from './components/PostNew';
import Editor from './components/Editor';
import PostDetail from './components/PostDetail';

import About from './components/About';

import NotFound from './components/NotFound';

import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import RequireAuth from './components/auth/require_auth';

import config from '../config/config.js';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

var path = config.path; /* "/blog"; */
if (typeof window === 'undefined'){
    /* Using nginx rewrite, so client router should pick up /blog,
       but on ssr I want to use /*/
    path = "/";
}
// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
    <Route path={path} component={Main}>
	<IndexRoute component={PostList} />
	<Route path="write" component={RequireAuth(Editor)} />
	<Route path="post/:slug" component={PostDetail} />
	<Route path="category/:category" component={PostList} />
	<Route path="tag/:tag" component={PostList} />		
	<Route path="post/:slug/edit" component={RequireAuth(Editor)} />
	<Route path="about" component={About} />
	<Route path="login" component={Signin} />
	<Route path="logout" component={Signout} />
	<Route path="*" component={NotFound} />
  </Route>
);

/* 
<IndexRoute
getComponent={(n
extState, cb) => {
    require.ensure([], require => {
        cb(null, require('./modules/Post/pages/PostListPage/PostListPage').default);
    });
}}
/>
<Route
path="/posts/:slug-:cuid"
getComponent={(nextState, cb) => {
    require.ensure([], require => {
        cb(null, require('./modules/Post/pages/PostDetailPage/PostDetailPage').default);
    });
}}
/>
*/
