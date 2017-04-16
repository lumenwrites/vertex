import React, { Component } from 'react';
import { Link } from 'react-router';
import { Panel, Label } from 'react-bootstrap';

import Remarkable from 'remarkable';

import FontAwesome from 'react-fontawesome';

export default class Post extends Component {
    renderPostHeader () {
	/* Return post header */
	if (this.props.link ) {
	    /* PostList will use this component, and pass a link to it
	       so you can click on the title and view it */
	    
	    return (
		<h1>
		    <Link to={this.props.link}>
			{this.props.title}
		    </Link>
		</h1>
	    );
	} else {
	    /* Post detail does not pass a link. */
	    return (
		<h1>
		    {this.props.title}
		</h1>		
	    );
	}
    }

    renderDraftLabel () {
	if (!this.props.published ) {
	    /* Show "Draft" label on non-published posts */
	    return (
		<Label bsStyle="default" className="label-draft">
		    Draft
		</Label>
	    );
	} else {return (null);}
    }
    

    renderBody () {
	var body = this.props.body;
	/* Truncate the post to the number of words passed as a truncate prop. */
	var truncated = body.split(" ").splice(0,this.props.truncate).join(" ");
	if (this.props.truncate && body > truncated) {
	    body = truncated;
	}

	/* Turn markdown into html */
	const md = new Remarkable({html: true});
	const markdown = md.render(body);
	return (
	    <div dangerouslySetInnerHTML={{__html:markdown}} />
	);
    }

    
    renderReadMore () {
	/* Add "read more..." link at the end of truncated posts. */
	var body = this.props.body;	
	var truncated = body.split(" ").splice(0,this.props.truncate).join(" ");
	if (this.props.truncate  && body > truncated) {
	    return (
		<div>
		    <Link to={this.props.link}
			  className="readMore"> Read more...</Link>
		</div>
	    );
	} else {
	    return (
		<div>
		</div>
	    );
	}
    }

    renderFooter () {
	const { tags, category } = this.props;

	var tagItems = "";
	var categoryItem = "";

	/* If there are some tags - generate tag labels  */
	if (tags && tags.length > 0) {
	    tagItems = tags.map((tag) => {
		return (
		    <span key={tag.slug}>
			<Link to={'/tag/' + tag.slug}>
			    <Label bsStyle="default">
				{tag.title}
			    </Label>
			    &nbsp;
			</Link>
		    </span>
		);
	    });
	}

	/* If there's a category - generate a category label */
	if (category) {
	    categoryItem = (
		<span>
		    <Link to={'/category/' + category.slug}>
			<Label bsStyle="default" className="label-category">
			    {category.title}
			</Label>
		    </Link>
		    &nbsp;
		</span>
	    );
	}

	return (
	    <div className="post-footer">
		{ categoryItem }		
		{ tagItems }
		<div className="right">
		    <Link className="black" to={'http://rayalez.com'} >
			@lumenwrites
		    </Link>
		    {/*  
		    <span className="icon">
			<i className="fa fa-retweet"></i> 3
		    </span>

		    <Link to={this.props.link} className="icon">
			<i className="fi-comment"></i> 12
		    </Link>
		    <span className="icon">
			<i className="fi-arrow-up"></i> 3
		    </span>
		      */}
		    { !this.props.published  && false ?
		      <Label bsStyle="default" className="label-draft">
			  Draft
		      </Label>
		      : null }		    
		    { this.props.authenticated && false ?
		      <Link to={"/post/"+this.props.slug+"/edit"} className="icon">
			  <i className="fa fa-pencil"></i>
		      </Link>
		      : null }
		</div>
		<div className="clearfix"></div>
	    </div>
	);
    }

    render() {
	return (
	    <div>
		<article className="post panel panel-default">
		    <div>
			{this.renderBody()}
			
			{this.renderReadMore()}			
		    </div>
		    <br/>
		    {this.renderFooter()}			
		</article>
	    </div>	    
	);
    }
}


