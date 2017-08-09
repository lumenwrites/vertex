import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';

import { FormGroup, FieldGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import SimpleMDE from 'react-simplemde-editor';


class Editor extends Component {
    componentDidUpdate(prevProps){
	/* Disable tab key in the editor */
	this.editor.simplemde.codemirror.options.extraKeys['Tab'] = false;
    }

    componentWillMount() {
	/* Clean the form */
	this.props.updatePostBody("");
	this.props.updatePostTags("");	   
	/* console.log("Props " + JSON.stringify(this.props));*/

	if (this.props.autopublish) {
	    /* If I'm writing a new post from the timeline, it's published by default.*/
	    this.props.setPublished(true);
	} 

	if (this.props.params.slug) {
	    /* If there's slug - that means I'm editing a post,
	       so fetch the post and put it into the redux postForm. */
	    this.props.fetchPost(this.props.params.slug);
	}
    }

    onPublishClick() {
	var post = this.props.postForm;
	/* When I click Publish/Un-Publish button
	   - flip the "published" parameter, and save the post.*/
	post.published = !this.props.postForm.published;
	this.props.updatePost(this.props.params.slug, post);
    }
    
    render() {
	/* Grabbing the post from the redux state */
	const { postForm } = this.props;
	if (!postForm) { return (<div></div>);}
	
	/* Calculate post length for character counter */
	var postLength = postForm.body.length + postForm.tags.length;

	/* Customize toolbar for simplemde */
	var defaultToolbar = ["bold", "italic", "heading", "|",
			      "quote", "unordered-list", "ordered-list", "|",
			      "link", "image", "|",
			      "preview", "side-by-side", "fullscreen", "guide"];
	return (
	    <div className="post-editor">
		{/* Body */}
		<SimpleMDE
		    onChange={this.props.updatePostBody}
		    value={this.props.postForm.body}
		    ref={(input) => { this.editor = input; }} 
		    options={{
			spellChecker: false,
			/* If I'm on "/post/post-slug/edit", or on "/write"
			   then I want to see the toolbar.
			   Otherwise I'm on the timeline and I want to hide it.*/
			toolbar: this.props.params.slug || this.props.route ?
				 defaultToolbar : false,
			status: false,
			placeholder: "Write here... (can use markdown)",
			initialValue: this.props.postForm.body,
			indentWithTabs: false,
			tabSize: 4,
			autoDownloadFontAwesome: false			
		    }}/>
		{/* Tags.
		    If there are no categories - I'm not rendering
		    the categories selector, so I need to make the
		    width 100%. */}			
		<FormControl className={"post-tags"}
			     type="text"
			     placeholder="tag1, tag2, tag3"
			     value={this.props.postForm.tags}
			     onChange={(event)=>
				 this.props.updatePostTags(event.target.value)}/>
		<div className={"character-count form-control " +
				 (postLength > 100 ? "red" : "")}>
		    { postLength }
		</div>

	    { this.props.params.slug ?
	      <Button bsStyle="primary"
		      onClick={()=>this.props.updatePost(this.props.params.slug,
							 this.props.postForm)}>
		  {/* If there's a slug, that means I'm editing a post. */}
		  Save
	      </Button>
              :
	      <Button className="post-button" bsStyle="primary"
		      onClick={()=>this.props.createPost(this.props.postForm)}>
		  {/* If there's no slug - I am creating a new post.
		      If the post is published automatically, I call the button "Post".
		      Otherwise I "Save" an unpublished draft. */}
		  { this.props.autopublish ?
		    "Post" : "Save" }
	     </Button>
	    }

	    <div className="clearfix"></div>
	    
	    {this.props.params.slug ?
	     <div>
		 {/* If I'm editing the post,
		     I want to show Delete and Publish buttons. */}
		 <br/>
		 <Button onClick={()=>this.props.deletePost(this.props.params.slug)}>
		     Delete Post
		 </Button>

		 <Button className="right" onClick={this.onPublishClick.bind(this)}>
		     {!this.props.postForm.published ? "Publish" : "Un-Publish" }
	         </Button>
		 
		 <div className="clearfix"></div>
		 <br/>
	     </div>
	     : null}
	    </div>
	);
    }
}




function mapStateToProps(state) {
    return {
	post:state.posts,
	postForm:state.postForm,	
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Editor);
