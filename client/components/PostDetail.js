import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchSettings, fetchPost, deletePost } from '../actions/index';
import MetaTags from 'react-meta-tags';

import Remarkable from 'remarkable';
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
	
	/* console.log("Post Detail " + this.props.params.slug);*/
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
	var description = body.substring(0, truncate_length - 3);
	if (description.length < body.length) {
	    description += "...";
	}
	description = removeMd(description);

	var firstline = post.body.split('\n')[0];
	var metaTitle = firstline.substring(0, 80);
	metaTitle = removeMd(metaTitle);

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

	var socialImage = settings.metaSocialImage;
	/* Find images in the post */
	const md = new Remarkable({html: true});
	var html = md.render(post.body);
	var regexp = /<img src\s*=\s*"(.+?)"/;
	var src = regexp.exec(html);
	if (src) {
	    /* If there's an image in a post, set it as social media image. */
	    /* console.log(src[1]);*/
	    socialImage = src[1];
	}

	return (
            <MetaTags>
		{/* Main */}
		<title>{metaTitle}</title>
		<meta name="author" content={settings.metaAuthor} />  
		<meta name="description"
		      content={description} />
		<meta name="keywords"
		      content={keywords} />		
		{/* Facebook */}
		<meta property="og:title" content={metaTitle} />
		<meta property="og:image" content={socialImage} />
		<meta property="og:description" content={description} />	
		{/* Twitter */}
		<meta property="twitter:card" content="summary_large_image" />
		<meta property="twitter:image" content={socialImage} />
		<meta property="twitter:description" content={description}/>
            </MetaTags>
	);
    }
    

    render() {
	const { post } = this.props;
	if (!post || !post.body) { return <div></div> }
	
	/* console.log("Rendering post " + post);*/

	return (
	    <div>
		{ this.renderMetaInfo() }
		{/* this.renderEditButton() */}
		<Post slug={post.slug}		      
		      body={post.body}
		      published={post.published}
		      tags={post.tags} />
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

// Actions required to provide data for this component to render in sever side.
PostDetail.need = [ 
    () => { return fetchSettings(); },
    (params) => { return fetchPost(params.slug); },
];


function mapStateToProps(state) {
    return { post:state.post,
	     settings: state.settings,
    	     authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, { fetchPost, fetchSettings })(PostDetail);
