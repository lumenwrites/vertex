import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Panel, Label } from 'react-bootstrap';


import Remarkable from 'remarkable';
/* import FontAwesome from 'react-fontawesome';*/

import { deletePost, fetchSettings } from '../actions/index';
import {  } from '../actions/index';

import config from '../../config/config.js';

class Post extends Component {
    componentWillMount() {
        /* Fetch settings if there aren't any.
           Not sure if this does anything, maybe Im just fetching them from header.*/
        if (!this.props.settings.metaTitle){
	    this.props.fetchSettings();		   
        }
    }

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
	if (!this.props.published) {
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
	const html = md.render(body);

        /* If the first line is header, turn it into a link to the post */
        if (this.props.link) {
            var firstline = html.split('\n')[0];
            var rest = html.split('\n').slice(1).join("");
            /* console.log("rest " + rest);*/
            if (firstline.indexOf('<h1>') > -1) {
                return (
                    <div>
                        <Link to={this.props.link}
                              dangerouslySetInnerHTML={{__html:firstline}} 
                        ></Link>
	                <div dangerouslySetInnerHTML={{__html:rest}} />   
                    </div>
                );
            }
        }

	return (
	    <div dangerouslySetInnerHTML={{__html:html}} />
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
	} 
    }

    renderFooter () {
	const { tags, settings } = this.props;

	var tagItems = "";

	/* If there are some tags - generate tag labels  */
	if (tags && tags.length > 0) {
	    tagItems = tags.map((tag) => {
		return (
		    <span key={tag}>
			<Link to={`${config.domain}/tag/` + tag}>
			    <Label bsStyle="default">
				{tag}
			    </Label>
			    &nbsp;
			</Link>
		    </span>
		);
	    });
	}




	return (
	    <div className="post-footer">
		{ tagItems }
		<div className="right">
		    <Link className="black" to={settings.userurl} >
			@{ settings.username }
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
		    { !this.props.published ?
		      <Label bsStyle="default" className="label-draft">
			  Draft
		      </Label>
		      : null }		    
		    { this.props.authenticated ?
		      <Link to={`${config.domain}/post/`+this.props.slug+"/edit"} className="icon">
			  <i className="fa fa-pencil"></i>
		      </Link>
		      : null }
                    { this.props.authenticated ?
		      <a onClick={()=>this.props.deletePost(this.props.slug)}
			 className="icon">
			  <i className="fa fa-trash"></i>
		      </a>
        	    : null }
                    { this.props.link ?
        	      <Link to={this.props.link} className="icon">
        		  <i className="fa fa-link"></i>
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

// Actions required to provide data for this component to render in sever side.
Post.need = [() => { return fetchSettings(); }];


function mapStateToProps(state) {
    return {
        settings: state.settings,
        authenticated: state.auth.authenticated
    };
}


export default connect(mapStateToProps, { deletePost, fetchSettings })(Post);
