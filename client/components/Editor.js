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
	/* Disable tab key */
	this.editor.simplemde.codemirror.options.extraKeys['Tab'] = false;
    }

    componentWillMount() {
	if (this.props.params.slug) {
	    /* If there's slug - fetch post and put it into the form. */
	    this.props.fetchPost(this.props.params.slug);
	}
    }





    renderPublishButton () {
	if (!this.props.post) {return null;}
	console.log("State: \n" + JSON.stringify(this.state));
	if (!this.props.postForm.published) {
	    return (	
		    <Button onClick={
			()=>this.props.publishPost(this.props.params.slug)}>
			Publish</Button>
	    );
	    } else {
		return (
		    <Button onClick={
			()=>this.props.publishPost(this.props.params.slug)}>
			Un-Publish</Button>
		);
	}
    }

    
    render() {
	/* Grabbing the post from the redux state
	   (connected to this component at the end of this file) */
	const { postForm } = this.props;
	var postLength = postForm.body.length + postForm.tags.length;

	var defaultToolbar = ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link", "image", "|", "preview", "side-by-side", "fullscreen", "guide"];
	return (
	    <div className="post-editor">
		{/* Body */}
		<SimpleMDE
		    onChange={this.props.updatePostBody}
		    value={this.props.postForm.body}
		    ref={(input) => { this.editor = input; }} 
		    options={{
			spellChecker: false,
			toolbar: this.props.params.slug ? defaultToolbar : false,
			status: false,
			placeholder: "Write here... (can use markdown)",
			initialValue: this.props.postForm.body,
			autosave: {
			    enabled: false,
			    delay: 1000,
			    uniqueId: "NewPost",
			    delay: 1000,
			},
			indentWithTabs: false,
			tabSize: 4
		    }}/>
		{/* Tags.
		    If there are no categories - I'm not rendering
		    the categories selector, so I need to make the
		    width 100%. */}			
		<FormControl className={"post-tags force-fullwidth"}
			     type="text"
			     placeholder="tag1, tag2, tag3"
			     value={this.props.postForm.tags}
			     onChange={(event)=>
				 this.props.updatePostTags(event.target.value)}/>
		<div className={"character-count form-control " +
				 (postLength > 100 ? "red" : "")}>
		    { postLength }
		</div>

	    {!this.props.params.slug ?
	     <Button className="post-button" bsStyle="primary"
		     onClick={()=>this.props.createPost(this.props.postForm)}>
		 Post
	     </Button>
	     :
	     <Button bsStyle="primary"
		     onClick={()=>this.props.updatePost(this.props.params.slug,
							this.props.postForm)}>
		 Save
	     </Button>
	    }

	    <div className="clearfix"></div>
	    
	    {this.props.params.slug ?
		 <div>
		     <br/>
		     <Button onClick={()=>this.props.deletePost(this.props.params.slug)}>
			 Delete Post
		     </Button>

		     {/*  
		     <div className="right">
			 <IndexLinkContainer to={{ pathname: '/'}}>
			     <Button type="submit">Cancel</Button>
			 </IndexLinkContainer> &nbsp;
			 { this.renderPublishButton() }
		     </div>
		       */}
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
