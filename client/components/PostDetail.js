import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchSettings, fetchPost, deletePost } from '../actions/index';
import MetaTags from 'react-meta-tags';

import removeMd from 'remove-markdown';

import { PageHeader, Panel, Label, Button } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import Post from './Post';
import SubscribeForm from './SubscribeForm';


class PostDetail extends Component {
    componentWillMount() {
	/* call action creator */
	/* action creator will grab the post with this id from the API   */
	/* and send it to the reducer */
	/* reducer will add it to the state */
	this.props.fetchPost(this.props.params.slug);
	this.props.fetchSettings();	
    }

    renderEditButton () {
	/* Render "Edit Post" button if user is logged in */
	if(this.props.authenticated) {
	    return (
		<LinkContainer to={{ pathname: "/post/"+this.props.params.slug+"/edit"}}>
		    <Button className="right">
			Edit Post
		    </Button>
		</LinkContainer>
	    );
	}
    }

    static contextTypes = {
	router: PropTypes.object
    };

    renderMetaInfo () {
	const settings =  this.props.settings;
	const post = this.props.post;

	if (!post) { return null; }
	/* Remove markdown from post body, and truncate it to 160 chars. */
	const body = removeMd(this.props.post.body);	
	const truncate_length = 160;
	const description = body.substring(0, truncate_length - 3) + "...";

	var firstline = post.body.split('\n')[0];
	var title = firstline.substring(0, 80);	
	
	/* Keywords */
	var post_tags = "";
	if (post.tags) {
	    post_tags = post.tags.map((tag) => {
		return tag.title;
	    }).join(",");
	}
	const keywords = settings.metaKeywords + ',' + post_tags

	/* console.log("Meta" + JSON.stringify(settings));*/

	if (!settings.metaTitle ) { return null; }


	return (
            <MetaTags>
		{/* Main */}
		<title>{title}</title>
		<meta name="author" content={settings.metaAuthor} />  
		<meta name="description"
		      content={description} />
		<meta name="keywords"
		      content={keywords} />		
		{/* Facebook */}
		<meta property="og:title" content={title} />
		<meta property="og:image" content={settings.metaSocialImage} />
		{/* Twitter */}
		<meta property="twitter:card" content="summary_large_image" />
		<meta property="twitter:image" content={settings.metaSocialImage} />
            </MetaTags>
	);
    }
    

    render() {
	const { post } = this.props;
	if (!post.body) {
	    return (
		<div></div>
	    );
	}
	/* console.log("Rendering post " + post);*/

	return (
	    <div>
		{ this.renderMetaInfo() }
		{/* this.renderEditButton() */}
		<Post title={post.title}
		      slug={post.slug}		      
		      body={post.body}
		      published={post.published}
		      authenticated={this.props.authenticated}
		      tags={post.tags}
		      category={post.category}/>
		<div className="panel subscription-box">
		    <div className="row">      
			<div className="col-xs-12 col-sm-6 subscribe-cta">
			    Liked this post?
			    Subscribe to the updates!
			</div>
			<div className="col-xs-12 col-sm-6">
			    <SubscribeForm />
			</div>
		    </div>
		</div>
		<br/>
	    </div>	    
	);
    }
}

function mapStateToProps(state) {
    return { post:state.post,
	     settings: state.settings,
    	     authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, { fetchPost, fetchSettings })(PostDetail);
