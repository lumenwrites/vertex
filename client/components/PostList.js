import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MetaTags from 'react-meta-tags';

import { fetchSettings, fetchPosts } from '../actions/index';

import Post from './Post';
import Editor from './Editor';
import Pagination from './Pagination';

import config from '../../config/config.js';

class PostList extends Component {
    fetchAndFilterPosts () {
	const page = this.props.location.query.page;
	var filter = {category: "",
		      tag: "",
		      currentPage: page };
	if (this.props.params.category) {
	    filter.category = this.props.params.category;
	}
	if (this.props.params.tag) {
	    filter.tag = this.props.params.tag;
	}	
	
	this.props.fetchPosts(filter);
    }

    componentWillMount() {
	/* console.log(">>>> src/components/post_list.js:");
	   console.log("Calling fetchPosts() action creator.");		*/
	/* Fetch posts when the app loads */
	this.fetchAndFilterPosts();
	this.props.fetchSettings();	
    }

    componentDidUpdate(nextProps) {
	if ((this.props.route.path !== nextProps.route.path) ||
	    (nextProps.params.tag !== this.props.params.tag) ||
	    (nextProps.location.query.page !== this.props.location.query.page)) {
	    /* If the route has changed - refetch the posts.
	       Gotta check if route is different with the if statement,
	       without the if statement it will fetch posts,
	       which will update props, which will fetch them again,
	       in infinite loop.
	       comparing route.path's  checks if I've switched
	       between "/" and "/category/some-category"
	       copmaring params checks if I've switched
	       between "/category/" and "/category/some-other-category"
	     */
	    this.fetchAndFilterPosts();	    
	}
    }

    renderPosts() {
	const posts = this.props.posts;
	/* console.log(">>>> src/components/post_list.js:");*/
	/* console.log("Rendering posts." + JSON.stringify(posts));*/


	/* If there are no posts in the state (haven't fetched them yet) -
	   render an empty div in their place. */
	if (!posts) { return ( <div></div> ); };
	if (posts.length == 0) { return ( <div><br/><p>No posts here yet.</p></div> ); };
	
	return posts.map((post) => {
	    if (post.published || this.props.authenticated) {
		/* Generate the list of posts. */
		/* Published posts are visible to everyone,
		   authenticated user can see both published and drafts */
		return (
		    <Post key={post.slug}
			  slug={post.slug}			  
			  body={post.body}
			  published={post.published}
			  tags={post.tags}
			  truncate={100}
			  link={`${config.domain}/post/${post.slug}`}/>
		)
	    }
	});
    }

    renderMetaInfo () {
	const settings =  this.props.settings;

	if (!settings.metaTitle ) { return null; }

	return (
            <MetaTags>
		{/* Main */}
		<title>{settings.metaTitle}</title>
		<meta name="author" content={settings.metaAuthor} />  
		<meta name="description"
		      content={settings.metaDescription} />
		<meta name="keywords"
		      content={settings.metaKeywords} />
		{/* Facebook */}
		<meta property="og:title" content={settings.metaTitle} />
		<meta property="og:image" content={settings.metaSocialImage} />
		<meta property="og:description" content={settings.metaDescription} />	
		{/* Twitter */}
		<meta property="twitter:card" content="summary_large_image" />
		<meta property="twitter:image" content={settings.metaSocialImage} />
		<meta property="twitter:description" content={settings.metaDescription}/>
            </MetaTags>
	);
    }

    render() {
	return (
	    <div>
		{ this.renderMetaInfo() }
		{ this.props.authenticated ?
		  <Editor params={this.props.params} autopublish={true}/>
		: null }
		{ this.renderPosts() }
		<Pagination next={this.props.posts.next}
			    prev={this.props.posts.previous} 
			    location={this.props.location}/>
	    </div>
	);
    }
}

// Actions required to provide data for this component to render in sever side.
PostList.need = [
    () => { return fetchSettings(); },
    () => { return fetchPosts(); },
];

function mapStateToProps(state) {
    return { posts: state.posts,
    	     settings: state.settings,
    	     authenticated: state.auth.authenticated};
}
/* First argument connects redux state to the component,
   allowing to access it with "this.props.posts" */
/* Second argument connects the actions to the component,
   allowing me to fire them like "this.props.fetchPosts()" */
export default connect(mapStateToProps, { fetchPosts, fetchSettings })(PostList);
